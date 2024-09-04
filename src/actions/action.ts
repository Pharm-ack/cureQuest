"use server";

import { auth, signIn, signOut } from "@/auth";
import prisma from "@/lib/db";
import {
  DonationSchema,
  LoginSchema,
  PostSchema,
  RegisterSchema,
} from "@/schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { stripe } from "@/lib/stripe";

type FormState = {
  status: "success" | "error" | undefined;
  message: string;
};

export async function register(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: RegisterSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { name, email, password } = submission.value;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return {
        status: "error",
        message: "Email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        image: "",
      },
    });

    return {
      status: "success",
      message: "User created successfully",
    };
  } catch (error) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}

export async function login(
  prevState: unknown,
  formData: FormData
): Promise<FormState> {
  const submission = parseWithZod(formData, {
    schema: LoginSchema,
  });

  if (submission.status !== "success") {
    return {
      status: "error",
      message: "Validation failed. Please check your inputs.",
    };
  }

  const { email, password } = submission.value;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return {
      status: "success",
      message: "User logged in successfully",
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            message: "Invalid email or password",
          };
        default:
          return {
            status: "error",
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export async function createPost(formData: FormData) {
  const session = await auth();

  if (!session) {
    return { error: "Unauthorized" };
  }
  const data = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    image: formData.get("image"),
    authorId: formData.get("authorId"),
  };
  const validatedPost = PostSchema.safeParse(data);
  if (!validatedPost.success) {
    return { error: "Invalid fields!" };
  }

  const { title, slug, content, image, authorId } = validatedPost.data;

  const uniqueSlug = slug.replace(/\s+/g, "-");

  try {
    await prisma.post.create({
      data: {
        title,
        slug: uniqueSlug,
        content,
        image,
        authorId,
      },
    });
    revalidatePath("/", "layout");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create post." };
  } finally {
    redirect("/dashboard/posts");
  }
}

export async function fetchPost(postId: string) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        id: true,
        title: true,
        slug: true,
        content: true,
        image: true,
        authorId: true,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw new Error("Failed to fetch post");
  }
}

export async function updatePost(postId: string, formData: FormData) {
  const data = {
    title: formData.get("title"),
    slug: formData.get("slug"),
    content: formData.get("content"),
    image: formData.get("image"),
    authorId: formData.get("authorId"),
  };

  const validatedPost = PostSchema.safeParse(data);

  if (!validatedPost.success) {
    return { error: "Invalid fields!" };
  }

  const { title, slug, content, image, authorId } = validatedPost.data;

  const uniqueSlug = slug.replace(/\s+/g, "-");

  try {
    await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        slug: uniqueSlug,
        content,
        image,
        authorId,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to update post." };
  } finally {
    redirect("/dashboard/posts");
  }
}

export async function deletePost(postId: string) {
  try {
    await prisma.post.delete({
      where: {
        id: postId,
      },
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete post." };
  } finally {
    revalidatePath("/dashboard/posts");
  }
}

export async function deleteUser(userId: string) {
  const session = await auth();
  try {
    // If the user is an admin, prevent deletion
    if (
      !session ||
      !session.user ||
      session.user.email !== "Pharm@outlook.com"
    ) {
      return { error: "Only admin can perform this action." };
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { success: true };
  } catch (error) {
    return { error: "Failed to delete user." };
  } finally {
    revalidatePath("/dashboard/users");
  }
}

export async function createDonation(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: DonationSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { name, email, amount, comments } = submission.value;

  const amountInCents = Math.round(parseFloat(String(amount)) * 100);

  // Create a Stripe Checkout Session for one-time payment
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation",
            description: "One-time donation to support our research",
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/payment/success"
        : "https://cure-quest-ph.vercel.app/payment/success",
    cancel_url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/payment/cancel"
        : "https://cure-quest-ph.vercel.app/payment/cancel",
    metadata: {
      name: name,
      comments: comments,
    },
  } as any);

  return redirect(session.url!);
}

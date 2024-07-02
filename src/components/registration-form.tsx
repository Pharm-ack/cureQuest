"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RiGoogleFill } from "react-icons/ri";
import Image from "next/image";
import { z } from "zod";
import { googleLogin, signup } from "@/actions/action";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./ui/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SiginBtn from "./sigin-btn";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const response = await signup(formData);

    if (response?.error) {
      toast.error("Error", {
        description: "Could not create user. Please try again.",
      });
      return;
    }

    if (!response?.error) {
      router.push("/login");
    }

    toast.success("User created!");
  }

  return (
    <div className="w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow-md ">
      <Link href="/" className="flex justify-center mx-auto">
        <Image
          src="/logo-black.png"
          alt="logo"
          width={60}
          height={60}
          className="object-cover w-12"
        />
        <span className="text-gray-900 font-semibold flex items-center justify-center">
          CureQuest
        </span>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-3">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            {...register("name")}
            id="name"
            type="name"
            name="name"
            placeholder="John Doe"
          />
          {errors.name && <FormError>{String(errors.name.message)}</FormError>}
        </div>

        <div className="mt-3">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            name="email"
            placeholder="johndoe@gmail.com"
          />
          {errors.email && (
            <FormError>{String(errors.email.message)}</FormError>
          )}
        </div>

        <div className="mt-3">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            name="password"
            placeholder="******"
          />
          {errors.password && (
            <FormError>{String(errors.password.message)}</FormError>
          )}
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>

      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b  lg:w-1/5" />

        <span className="text-xs text-center text-gray-500 uppercase  hover:underline">
          or login with Social Media
        </span>

        <span className="w-1/5 border-b  lg:w-1/5" />
      </div>

      <div className="flex items-center mt-6 -mx-2">
        <SiginBtn onClick={() => googleLogin()}>
          <RiGoogleFill className="h-5 w-5" />

          <span className="hidden mx-2 sm:inline">Sign in with Google</span>
        </SiginBtn>
      </div>

      <p className="mt-8 text-xs font-light text-center text-gray-900">
        {" "}
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-sm text-gray-900  hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

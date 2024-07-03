"use client";
import Link from "next/link";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RiChromeLine } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { googleLogin, signup } from "@/actions/action";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./ui/form-error";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SiginBtn from "./sigin-btn";
import { Button } from "./ui/button";

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


    if(response?.error) {
      toast.error(response.error);
    } else {
      toast.success("User created!");
      router.push("/login");
    }
  }

  return (
    <div className="mx-auto px-2 max-w-[450px] space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Sign Up</h1>
        <p className="text-muted-foreground">
          Create your account to get started.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              id="name"
              type="name"
              name="name"
              placeholder="John Doe"
            />
            {errors.name && (
              <FormError>{String(errors.name.message)}</FormError>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              type="email"
              name="email"
              placeholder="Johndoe@mail.com"
            />
            {errors.email && (
              <FormError>{String(errors.email.message)}</FormError>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              type="password"
              name="password"
              placeholder="********"
            />
            {errors.password && (
              <FormError>{String(errors.password.message)}</FormError>
            )}
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
        <Separator className="my-5" />

        <SiginBtn onClick={() => googleLogin()}>
          <RiChromeLine className="mr-2 h-4 w-4" />
          Sign up with Google
        </SiginBtn>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

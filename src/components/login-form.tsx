"use client";

import Link from "next/link";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Image from "next/image";
import { googleLogin, login } from "@/actions/action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema";
import { z } from "zod";
import FormError from "./ui/form-error";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SiginBtn from "./sigin-btn";
import { RiChromeLine, RiGoogleFill } from "react-icons/ri";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is already registered with another account"
      : "";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    const response = (await login(values.email, values.password)) as any;

    if (response?.error) {
      toast.error("Error", {
        description: "Invalid credentials, please try again",
      });
      return;
    }

    if (!response?.error) {
      router.push("/");
    }

    toast.success("You are now signed in!");
  }

  return (
    <div className="mx-auto px-2 max-w-[450px] space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground">Login with your account.</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
            Login
          </Button>
        </form>
        <Separator className="my-5" />

        <SiginBtn onClick={() => googleLogin()}>
          <RiChromeLine className="mr-2 h-4 w-4" />
          Login with Google
        </SiginBtn>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

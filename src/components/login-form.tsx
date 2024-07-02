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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SiginBtn from "./sigin-btn";
import { RiGoogleFill } from "react-icons/ri";

export default function LoginForm() {
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
    <div className="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
      <Link href="/" className="flex justify-center mx-auto">
        <Image src="/logo-black.png" alt="logo" width={60} height={60} />
        <span className="text-gray-900 font-semibold flex items-center justify-center">
          CureQuest
        </span>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div>
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

        <div className="mt-4">
          <div className="flex mb-2 items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-gray-600  hover:underline">
              Forget Password?
            </Link>
          </div>

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

        <div className="mt-6">
          <button
            type="submit"
            className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
          >
            Sign In
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
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-semibold text-gray-900  hover:underline"
        >
          Create One
        </Link>
      </p>
    </div>
  );
}

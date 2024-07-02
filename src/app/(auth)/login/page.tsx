import { auth } from "@/auth";
import LoginForm from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <LoginForm />;
    </main>
  );
}

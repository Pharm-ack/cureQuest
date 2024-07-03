import { auth } from "@/auth";
import RegistrationForm from "@/components/registration-form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();

  if (session) {
    redirect("/login");
  }
  return (
    <main className="pt-4">
      <RegistrationForm />
    </main>
  );
}

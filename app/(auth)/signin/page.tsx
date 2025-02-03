import { getServerSession } from "next-auth";
import SignInForm from "./components/signin-form";
import { redirect } from "next/navigation";

export default async function SigninPage() {
  const session = await getServerSession();

  if (session?.user) return redirect("/");

  return (
    <main>
      <SignInForm />
    </main>
  );
}

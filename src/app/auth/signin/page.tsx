// app/auth/signin/page.tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session"; // iron-session 기반 세션
import LoginForm from '@/components/LoginForm';

export default async function SigninPage() {
  const session = await getSession();

  if (session.user) {
    redirect("/");
  }

  return (
      <LoginForm />
  );
}

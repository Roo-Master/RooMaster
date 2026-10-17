import type { Metadata } from "next";
import { LoginForm } from "./loginform";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: { error?: string };
};

export default function LoginPage({ searchParams }: LoginPageProps) {
  return (
    <main className="admin-login">
      <LoginForm hasError={Boolean(searchParams.error)} />
    </main>
  );
}

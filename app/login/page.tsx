import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import { safeNext } from "@/lib/next-path";

export const metadata = { title: "Log in | Maison Aura" };

async function Form({ searchParams }: { searchParams: PageProps<"/login">["searchParams"] }) {
  const { next } = await searchParams;
  return <AuthForm mode="login" next={safeNext(next)} />;
}

export default function Login(props: PageProps<"/login">) {
  return (
    <Suspense>
      <Form searchParams={props.searchParams} />
    </Suspense>
  );
}

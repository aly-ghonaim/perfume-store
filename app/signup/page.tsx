import { Suspense } from "react";
import AuthForm from "@/components/AuthForm";
import { safeNext } from "@/lib/next-path";

export const metadata = { title: "Sign up | Maison Aura" };

async function Form({ searchParams }: { searchParams: PageProps<"/signup">["searchParams"] }) {
  const { next } = await searchParams;
  return <AuthForm mode="signup" next={safeNext(next)} />;
}

export default function Signup(props: PageProps<"/signup">) {
  return (
    <Suspense>
      <Form searchParams={props.searchParams} />
    </Suspense>
  );
}

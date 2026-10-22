"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useStore } from "@/lib/store";

const MIN_PASSWORD = 8;

export default function AuthForm({ mode, next }: { mode: "login" | "signup"; next: string }) {
  const { login, signup } = useStore();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const isSignup = mode === "signup";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email"));
    const password = String(f.get("password"));
    if (isSignup && password.length < MIN_PASSWORD) {
      setError(`Password must be at least ${MIN_PASSWORD} characters.`);
      return;
    }
    setBusy(true);
    const err = isSignup ? await signup(String(f.get("name")), email, password) : await login(email, password);
    setBusy(false);
    if (err) setError(err);
    else router.push(next);
  }

  const other = isSignup ? "login" : "signup";
  const query = next === "/" ? "" : `?next=${encodeURIComponent(next)}`;

  return (
    <div className="mx-auto max-w-md border border-line bg-surface p-8">
      <h1 className="font-serif text-4xl">{isSignup ? "Create account" : "Welcome back"}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {isSignup && (
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-muted">Full name</label>
            <input id="name" name="name" required autoComplete="name" className="input" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1 block text-sm text-muted">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" className="input" />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm text-muted">
            Password{isSignup && ` (min ${MIN_PASSWORD} characters)`}
          </label>
          <input
            id="password" name="password" type="password" required
            autoComplete={isSignup ? "new-password" : "current-password"} className="input"
          />
        </div>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <button className="btn w-full" disabled={busy}>{isSignup ? "Sign up" : "Log in"}</button>
      </form>
      <p className="mt-6 text-sm text-muted">
        {isSignup ? "Already have an account?" : "New here?"}{" "}
        <Link href={`/${other}${query}`} className="text-gold underline">
          {isSignup ? "Log in" : "Create an account"}
        </Link>
      </p>
    </div>
  );
}

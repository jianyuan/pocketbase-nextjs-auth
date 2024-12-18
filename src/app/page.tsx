import { login, logout } from "@/lib/actions/auth";
import { createServerClient } from "@/lib/pocketbase/server";
import { Suspense } from "react";
import { HomeClient } from "./page-client";

export default async function Home() {
  const client = await createServerClient();

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <pre>{JSON.stringify(client.authStore.record, null, 2)}</pre>
      <form className="flex gap-4">
        <button formAction={login}>Login (server)</button>
        <button formAction={logout}>Logout (server)</button>
      </form>
      <Suspense fallback={<>Loading...</>}>
        <HomeClient />
      </Suspense>
    </div>
  );
}

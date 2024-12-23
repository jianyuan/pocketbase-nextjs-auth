import { cookies } from "next/headers";
import PocketBase, { AsyncAuthStore } from "pocketbase";
import "server-only";
import { TypedPocketBase } from "./types";

export const COOKIE_NAME = "pb_auth";

export async function createServerClient() {
  const cookieStore = await cookies();

  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
    new AsyncAuthStore({
      save: async (serializedPayload) => {
        try {
          cookieStore.set(COOKIE_NAME, serializedPayload);
        } catch {
          // This method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      clear: async () => {
        try {
          cookieStore.delete(COOKIE_NAME);
        } catch {
          // This method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
      initial: cookieStore.get(COOKIE_NAME)?.value,
    }),
  ) as TypedPocketBase;

  return client;
}

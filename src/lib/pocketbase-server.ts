import { cookies } from "next/headers";
import PocketBase, { AsyncAuthStore, BaseAuthStore } from "pocketbase";
import "server-only";
import { TypedPocketBase } from "./pocketbase-types";

export const COOKIE_NAME = "pb_auth";

export async function getServerClient({
  store,
}: { store?: BaseAuthStore } = {}) {
  if (!store) {
    const cookieStore = await cookies();

    store = new AsyncAuthStore({
      save: async (serialized) => {
        try {
          cookieStore.set(COOKIE_NAME, serialized);
        } catch {
          // ignore
        }
      },
      clear: async () => {
        try {
          cookieStore.delete(COOKIE_NAME);
        } catch {
          // ignore
        }
      },
      initial: cookieStore.get(COOKIE_NAME)?.value,
    });
  }

  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
    store
  ) as TypedPocketBase;

  if (client.authStore.isValid) {
    try {
      await client.collection("users").authRefresh();
    } catch {
      client.authStore.clear();
    }
  }

  return client;
}

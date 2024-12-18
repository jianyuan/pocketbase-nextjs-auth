import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";

export async function getBrowserClient() {
  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL
  ) as TypedPocketBase;

  client.authStore.loadFromCookie(document.cookie);
  client.authStore.onChange(() => {
    document.cookie = client.authStore.exportToCookie({ httpOnly: false });
  });

  if (client.authStore.isValid) {
    try {
      await client.collection("users").authRefresh();
    } catch {
      client.authStore.clear();
    }
  }

  return client;
}

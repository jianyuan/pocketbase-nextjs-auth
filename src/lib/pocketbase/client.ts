import PocketBase from "pocketbase";
import { TypedPocketBase } from "./types";

export function createBrowserClient() {
  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
  ) as TypedPocketBase;

  if (typeof document !== "undefined") {
    client.authStore.loadFromCookie(document.cookie);
    client.authStore.onChange(() => {
      document.cookie = client.authStore.exportToCookie({ httpOnly: false });
    });
  }

  return client;
}

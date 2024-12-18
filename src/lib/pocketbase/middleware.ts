import { NextRequest, NextResponse } from "next/server";
import PocketBase, { AuthRecord, BaseAuthStore } from "pocketbase";
import { COOKIE_NAME } from "./server";
import { TypedPocketBase } from "./types";

class SyncAuthStore extends BaseAuthStore {
  private saveFunc: (serializedPayload: string) => void;
  private clearFunc?: () => void;

  constructor(config: {
    save: (serializedPayload: string) => void;
    clear?: () => void;
    initial?: string;
  }) {
    super();

    this.saveFunc = config.save;
    this.clearFunc = config.clear;

    if (config.initial) {
      try {
        let parsed;
        if (typeof config.initial === "string") {
          parsed = JSON.parse(config.initial) || {};
        } else if (typeof config.initial === "object") {
          parsed = config.initial;
        }

        this.save(parsed.token || "", parsed.record || parsed.model || null);
      } catch {}
    }
  }

  save(token: string, record?: AuthRecord) {
    super.save(token, record);

    let value = "";
    try {
      value = JSON.stringify({ token, record });
    } catch {
      console.warn("SyncAuthStore: failed to stringify the new state");
    }

    this.saveFunc(value);
  }

  clear() {
    super.clear();

    if (this.clearFunc) {
      this.clearFunc();
    } else {
      this.saveFunc("");
    }
  }
}

export async function updateSession<T extends PocketBase = TypedPocketBase>(
  request: NextRequest
) {
  let response = NextResponse.next();

  const client = new PocketBase(
    process.env.NEXT_PUBLIC_POCKETBASE_URL,
    new SyncAuthStore({
      save: async (serializedPayload) => {
        request.cookies.set(COOKIE_NAME, serializedPayload);
        response = NextResponse.next({
          request,
        });
        response.cookies.set(COOKIE_NAME, serializedPayload);
      },
      clear: async () => {
        request.cookies.delete(COOKIE_NAME);
        response = NextResponse.next({
          request,
        });
        response.cookies.delete(COOKIE_NAME);
      },
      initial: request.cookies.get(COOKIE_NAME)?.value,
    })
  ) as T;

  // Check if the session is still valid
  if (client.authStore.isValid) {
    try {
      await client.collection("users").authRefresh();
    } catch {
      client.authStore.clear();
    }
  }

  if (
    !client.authStore.isValid &&
    !request.nextUrl.pathname.startsWith("/login")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    response = NextResponse.redirect(url);
  }

  return response;
}

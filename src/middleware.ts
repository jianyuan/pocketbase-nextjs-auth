import { COOKIE_NAME, getServerClient } from "@/lib/pocketbase-server";
import { NextRequest, NextResponse } from "next/server";
import { AsyncAuthStore } from "pocketbase";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  await getServerClient({
    store: new AsyncAuthStore({
      save: async (serialized) => {
        request.cookies.set(COOKIE_NAME, serialized);
        response.cookies.set(COOKIE_NAME, serialized);
      },
      clear: async () => {
        request.cookies.delete(COOKIE_NAME);
        response.cookies.delete(COOKIE_NAME);
      },
      initial: request.cookies.get(COOKIE_NAME)?.value,
    }),
  });

  return response;
}

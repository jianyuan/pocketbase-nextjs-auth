"use client";

import { createBrowserClient } from "@/lib/pocketbase/client";
import { TypedPocketBase } from "@/lib/pocketbase/types";
import { AuthRecord } from "pocketbase";
import { createContext, useContext, useEffect, useRef } from "react";

const PocketBaseContext = createContext<TypedPocketBase | null>(null);

export function usePocketBase() {
  return useContext(PocketBaseContext)!;
}

export function useUser() {
  const client = usePocketBase();
  return client.authStore.record;
}

export function PocketBaseProvider({
  initialToken,
  initialUser,
  children,
}: {
  initialToken: string;
  initialUser: AuthRecord;
  children?: React.ReactNode;
}) {
  const clientRef = useRef<TypedPocketBase>(createBrowserClient());
  clientRef.current.authStore.save(initialToken, initialUser);

  useEffect(() => {
    async function authRefresh() {
      if (clientRef.current.authStore.isValid) {
        try {
          await clientRef.current.collection("users").authRefresh();
        } catch {
          clientRef.current.authStore.clear();
        }
      }
    }

    authRefresh();
  }, [initialToken, initialUser]);

  return (
    <PocketBaseContext.Provider value={clientRef.current}>
      {children}
    </PocketBaseContext.Provider>
  );
}

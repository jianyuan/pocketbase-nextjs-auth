"use client";

import { createBrowserClient } from "@/lib/pocketbase/client";
import { TypedPocketBase } from "@/lib/pocketbase/types";
import { AuthRecord } from "pocketbase";
import { createContext, useContext, useEffect, useState } from "react";

const PocketBaseContext = createContext<TypedPocketBase | null>(null);
const UserContext = createContext<AuthRecord | null>(null);

export function useUser() {
  return useContext(UserContext);
}

export function usePocketBase() {
  return useContext(PocketBaseContext);
}

const client = createBrowserClient();

export function PocketBaseProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthRecord | null>(null);
  useEffect(() => {
    async function authRefresh() {
      if (client.authStore.isValid) {
        try {
          await client.collection("users").authRefresh();
        } catch {
          client.authStore.clear();
        }
      }
    }

    authRefresh();

    return client.authStore.onChange((token, record) => {
      setUser(record);
    }, true);
  }, []);

  return (
    <PocketBaseContext.Provider value={client}>
      <UserContext.Provider value={user}>{children}</UserContext.Provider>
    </PocketBaseContext.Provider>
  );
}

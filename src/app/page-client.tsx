"use client";

import { usePocketBase, useUser } from "@/components/pocketbase-provider";
import { useRouter } from "next/navigation";

export function HomeClient() {
  const router = useRouter();
  const pocketbase = usePocketBase();
  const user = useUser();

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={async () => {
            await pocketbase
              ?.collection("users")
              .authWithPassword("test@example.com", "password");
            router.refresh();
          }}
        >
          Login (client)
        </button>
        <button
          onClick={() => {
            pocketbase?.authStore.clear();
            router.refresh();
          }}
        >
          Logout (client)
        </button>
      </div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

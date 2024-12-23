"use client";

import { useUser } from "@/components/pocketbase-provider";

export function DashboardClient() {
  const user = useUser();

  return (
    <div>
      <h2 className="text-xl">Dashboard (Client)</h2>
      <p>Id: {user?.id}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
}

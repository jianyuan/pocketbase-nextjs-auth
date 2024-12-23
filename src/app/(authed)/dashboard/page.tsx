import { createServerClient } from "@/lib/pocketbase/server";
import { DashboardClient } from "./page-client";

export default async function Dashboard() {
  const client = await createServerClient();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl">Dashboard</h1>
      <div>
        <h2 className="text-xl">Dashboard (Server)</h2>
        <p>Id: {client.authStore.record?.id}</p>
        <p>Email: {client.authStore.record?.email}</p>
      </div>
      <DashboardClient />
    </div>
  );
}

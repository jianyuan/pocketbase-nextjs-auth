import { getServerClient } from "@/lib/pocketbase-server";

export default async function Home() {
  const client = await getServerClient();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <pre>{JSON.stringify(client.authStore.record, null, 2)}</pre>
    </div>
  );
}

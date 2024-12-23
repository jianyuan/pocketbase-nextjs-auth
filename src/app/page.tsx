import { createServerClient } from "@/lib/pocketbase/server";

export default async function Home() {
  const client = await createServerClient();

  return (
    <div>
      {client.authStore.record ? (
        <p>Logged in as {client.authStore.record?.email}</p>
      ) : (
        <p>Not logged in</p>
      )}
      <p>
        Visit{" "}
        <a
          href="https://github.com/jianyuan/pocketbase-nextjs-auth"
          target="_blank"
          className="link"
        >
          our GitHub repository
        </a>{" "}
        to read the documentation.
      </p>
    </div>
  );
}

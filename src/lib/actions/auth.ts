"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "../pocketbase/server";

export async function login(formData: FormData) {
  const client = await createServerClient();

  try {
    await client
      .collection("users")
      .authWithPassword(
        formData.get("email") as string,
        formData.get("password") as string
      );
  } catch (e) {
    console.error(e);
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function logout() {
  const client = await createServerClient();
  await client.authStore.clear();

  revalidatePath("/", "layout");
  redirect("/login");
}

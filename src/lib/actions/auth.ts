"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerClient } from "../pocketbase/server";

export async function login(formData: FormData) {
  const client = await createServerClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await client.collection("users").authWithPassword(email, password);
  } catch (e) {
    // TODO: Handle error
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

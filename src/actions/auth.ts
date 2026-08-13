"use server";

import argon2 from "argon2";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { users } from "@/db/schema";
import { createSession } from "@/lib/auth";

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = formData
    .get("email")
    ?.toString()
    .trim()
    .toLowerCase();

  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return {
      error: "Email and password are required.",
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return {
      error: "Invalid credentials.",
    };
  }

  if (!user.isActive) {
    return {
      error: "Account is disabled.",
    };
  }

  const validPassword = await argon2.verify(
    user.passwordHash,
    password
  );

  if (!validPassword) {
    return {
      error: "Invalid credentials.",
    };
  }

  await createSession(user.id);

  redirect("/admin/dashboard");
}
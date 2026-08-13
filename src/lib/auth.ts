import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";

import { db } from "@/db";
import { users, sessions } from "@/db/schema";

const SESSION_COOKIE = "admin_session";

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");

  const expiresAt = new Date(
    Date.now() + 1000 * 60 * 60 * 24 * 30
  ); // 30 days

  await db.insert(sessions).values({
    userId,
    token,
    expiresAt,
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: expiresAt,
  });
}

export async function getSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const session = await db.query.sessions.findFirst({
    where: and(
      eq(sessions.token, token),
      gt(sessions.expiresAt, new Date())
    ),
  });

  return session ?? null;
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.userId),
  });

  return user ?? null;
}

export async function deleteSession() {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db
      .delete(sessions)
      .where(eq(sessions.token, token));
  }

  cookieStore.delete(SESSION_COOKIE);
}
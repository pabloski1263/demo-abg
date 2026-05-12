import { cookies } from "next/headers";
import { getContent } from "./content";

const AUTH_COOKIE = "demo-abg-auth";

export function verifyAuth(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  return token === "authenticated";
}

export function createSession(): void {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE, "authenticated", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24,
  });
}

export function destroySession(): void {
  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE, "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
}

export function validateCredentials(email: string, password: string): boolean {
  const content = getContent();
  return email === content.admin.email && password === content.admin.password;
}

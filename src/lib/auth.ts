import { cookies } from "next/headers";
import { getContent } from "./content";

const AUTH_COOKIE = "demo-abg-auth";
const AUTH_TOKEN = "demo-abg-token";

function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Fijamos un token constante en build time (no cambia entre requests)
let SESSION_TOKEN: string | null = null;

export function verifyAuth(req?: Request): boolean {
  // 1) Check header first (most reliable)
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader === `Bearer ${SESSION_TOKEN}`) return true;
  }

  // 2) Fallback: cookie
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(AUTH_COOKIE)?.value;
    if (token === SESSION_TOKEN) return true;
  } catch {
    // cookies() can throw in certain contexts
  }

  return false;
}

export function createSession(): string {
  if (!SESSION_TOKEN) {
    SESSION_TOKEN = generateToken();
  }

  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE, SESSION_TOKEN, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return SESSION_TOKEN;
}

export function destroySession(): void {
  SESSION_TOKEN = null;
  try {
    const cookieStore = cookies();
    cookieStore.set(AUTH_COOKIE, "", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });
  } catch {
    // ignore
  }
}

export function validateCredentials(email: string, password: string): boolean {
  const content = getContent();
  return email === content.admin.email && password === content.admin.password;
}

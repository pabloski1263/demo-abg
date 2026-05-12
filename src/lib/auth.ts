import { cookies } from "next/headers";
import { getContent, saveContent } from "./content";

const AUTH_COOKIE = "demo-abg-auth";

function generateToken(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 40; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function verifyAuth(req?: Request): boolean {
  const content = getContent();
  const storedToken = (content.admin as any).token;

  if (!storedToken) return false;

  // 1) Check Authorization header (primary)
  if (req) {
    const authHeader = req.headers.get("authorization");
    if (authHeader === `Bearer ${storedToken}`) return true;
  }

  // 2) Fallback: cookie
  try {
    const cookieStore = cookies();
    const cookieToken = cookieStore.get(AUTH_COOKIE)?.value;
    if (cookieToken === storedToken) return true;
  } catch {
    // cookies() may throw
  }

  return false;
}

export function createSession(): string {
  const token = generateToken();
  const content = getContent();
  (content.admin as any).token = token;
  saveContent(content);

  const cookieStore = cookies();
  cookieStore.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return token;
}

export function destroySession(): void {
  try {
    const content = getContent();
    delete (content.admin as any).token;
    saveContent(content);

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

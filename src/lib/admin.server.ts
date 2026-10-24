import { createHash, timingSafeEqual } from "node:crypto";
import { useSession } from "@tanstack/react-start/server";
import { redirect } from "@tanstack/react-router";

export type AdminSessionData = { unlocked?: boolean; username?: string };

function sessionConfig() {
  return {
    password: process.env["ADMIN_SESSION_SECRET"]!,
    name: "dco-admin",
    maxAge: 60 * 60 * 12,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "lax" as const,
      path: "/",
    },
  };
}

export function getAdminSession() {
  // TanStack Start's server `useSession` is a request helper, not a React hook.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSession<AdminSessionData>(sessionConfig());
}

function matches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env["ADMIN_USERNAME"];
  const expectedPass = process.env["ADMIN_PASSWORD"];
  if (!expectedUser || !expectedPass) return false;
  return (
    matches(username.trim().toLowerCase(), expectedUser.trim().toLowerCase()) &&
    matches(password, expectedPass)
  );
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session.data.unlocked) throw redirect({ to: "/admin/login" });
  return session;
}

export async function isAdminUnlocked(): Promise<boolean> {
  const session = await getAdminSession();
  return session.data.unlocked === true;
}

const BUCKET = "vehicles";

export function slugifyFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const ext = (dot > -1 ? name.slice(dot + 1) : "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const base = (dot > -1 ? name.slice(0, dot) : name)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${base || "vehicul"}-${Date.now()}.${ext || "jpg"}`;
}

export async function uploadVehicleImage(fileName: string, base64: string, contentType: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const path = `uploads/${slugifyFileName(fileName)}`;
  const bytes = Buffer.from(base64, "base64");
  const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, bytes, {
    contentType: contentType || "image/jpeg",
    upsert: true,
  });
  if (error) throw new Error(error.message);
  return path;
}

export async function downloadVehicleImage(path: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin.storage.from(BUCKET).download(path);
}

import { headers } from "next/headers";

export async function getPathnameOnServerSide() {
  const h = await headers();
  const fullUrl = h.get("x-url") || h.get("referer") || "";
  try {
    const url = new URL(fullUrl);
    return url.pathname;
  } catch {
    if (fullUrl.startsWith("/")) return fullUrl;
    return "/";
  }
}

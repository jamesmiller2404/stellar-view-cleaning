import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MAX_PER_MINUTE = 20;
const WINDOW_MS = 60_000;
const rateLimit = new Map<string, { count: number; windowStart: number }>();

const getClientKey = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || "unknown";
  const ua = request.headers.get("user-agent") || "unknown";
  return `${ip}:${ua}`;
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateLimit.get(key);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimit.set(key, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_PER_MINUTE) {
    return true;
  }

  entry.count += 1;
  return false;
};

const isSameOrigin = (request: NextRequest) => {
  const origin = request.headers.get("origin") || "";
  const referer = request.headers.get("referer") || "";
  const host = request.headers.get("host") || "";
  const secFetchSite = request.headers.get("sec-fetch-site") || "";

  if (!host) {
    return false;
  }

  const originOk = origin.includes(host) || referer.includes(host);
  const secOk =
    !secFetchSite || secFetchSite === "same-origin" || secFetchSite === "same-site";

  return originOk || secOk;
};

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const key = getClientKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const phone = process.env.BUSINESS_PHONE_E164 || "";
  if (!phone) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503 });
  }

  return NextResponse.json(
    { phone },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}

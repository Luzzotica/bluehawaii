import { NextResponse } from "next/server";

export const runtime = "nodejs";

const WEBHOOK_URL =
  process.env.LEAD_WEBHOOK_URL ??
  "https://services.leadconnectorhq.com/hooks/x4qRHA3TUhlnEmFmm8jB/webhook-trigger/a2e9b217-3c54-457b-971b-a0ee582098c0";

type LeadInput = {
  email?: string;
  name?: string;
  source?: string;
};

export async function POST(request: Request) {
  let body: LeadInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = (body.email ?? "").trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const payload = {
    name: (body.name ?? "").trim(),
    email,
    date: new Date().toISOString(),
    source: (body.source ?? "").trim() || "finishes-guide",
  };

  const res = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to record lead" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

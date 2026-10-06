// Public endpoint for the homepage newsletter form.
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected by Supabase at runtime,
// so no key is ever shipped to the browser or committed to the repo.
import { createClient } from "npm:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://hypnodreamz.com",
  "https://www.hypnodreamz.com",
  "http://localhost:8000",
  "http://127.0.0.1:8000",
]);

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

function corsHeaders(origin: string | null): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin && ALLOWED_ORIGINS.has(origin) ? origin : "https://hypnodreamz.com",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "content-type",
    "Vary": "Origin",
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(origin) });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, origin);
  if (origin && !ALLOWED_ORIGINS.has(origin)) return json({ error: "Forbidden" }, 403, origin);

  let payload: { email?: unknown; website?: unknown };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid request" }, 400, origin);
  }

  // Honeypot: real visitors never fill the hidden "website" field.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return json({ ok: true }, 200, origin);
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400, origin);
  }

  const { error } = await supabase
    .from("newsletter_subscribers")
    .insert({ email, source: "homepage" });

  // 23505 = unique violation: already subscribed, treat as success.
  if (error && error.code !== "23505") {
    console.error("newsletter insert failed", error);
    return json({ error: "Something went wrong. Please try again." }, 500, origin);
  }

  return json({ ok: true }, 200, origin);
});

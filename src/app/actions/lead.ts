"use server";

import { createHmac } from "node:crypto";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "message", string>>;
};

const topics = new Set(["Consulting", "UGC / brand partnership", "Press or speaking", "Other"]);

function field(data: FormData, key: string, max = 2000) {
  const value = data.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * Sends a website lead to Mercury Call Desk through an inbound webhook.
 * CRM_WEBHOOK_URL and CRM_WEBHOOK_SECRET target the signed MCD Sulus workflow.
 * LEADS_WEBHOOK_URL remains a compatibility option for an unsigned legacy webhook.
 */
export async function submitLead(
  _prev: LeadState,
  data: FormData,
): Promise<LeadState> {
  // Honeypot: real visitors never see or fill this field.
  if (field(data, "website")) return { status: "success" };

  const name = field(data, "name", 120);
  const email = field(data, "email", 200);
  const phone = field(data, "phone", 40);
  const company = field(data, "company", 160);
  const message = field(data, "message", 4000);
  const rawTopic = field(data, "topic", 60);
  const topic = topics.has(rawTopic) ? rawTopic : "Other";
  const rawPage = field(data, "page", 120);
  const page = ["contact", "consulting", "ugc"].includes(rawPage) ? rawPage : "contact";

  const fieldErrors: LeadState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = "Please enter a valid email.";
  if (message.length < 10)
    fieldErrors.message = "Please add a few details about what you need.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", fieldErrors };
  }

  const crmUrl = process.env.CRM_WEBHOOK_URL;
  const url = crmUrl || process.env.LEADS_WEBHOOK_URL;
  const secret = process.env.CRM_WEBHOOK_SECRET;
  if (!url || (crmUrl && !secret)) {
    console.error("CRM intake configuration is incomplete; lead was not delivered.");
    return {
      status: "error",
      message:
        "Sorry, the form isn't connected yet. Please reach out on Instagram for now.",
    };
  }

  const [firstName, ...rest] = name.split(/\s+/);
  const tags = ["website-contact", "hamiltonpinto.com", topic];
  const raw = JSON.stringify({
    name,
    firstName,
    lastName: rest.join(" "),
    email,
    phone,
    company,
    topic,
    message,
    source: `hamiltonpinto.com/${page}`,
    page,
    tags,
    tagsCsv: tags.join(","),
    callbackRequested: "no",
    submittedAt: new Date().toISOString(),
  });
  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (crmUrl && secret) {
      headers["X-Webhook-Signature"] = `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`;
    }
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: raw,
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    console.error("CRM lead delivery failed; no successful delivery was confirmed.");
    return {
      status: "error",
      message:
        "Sorry, something went wrong sending your message. Please try again or reach out on Instagram.",
    };
  }

  return {
    status: "success",
    message: "Thanks! Your message is in. I'll get back to you shortly.",
  };
}

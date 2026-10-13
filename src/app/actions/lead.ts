"use server";

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
 * Set LEADS_WEBHOOK_URL in Vercel to the Mercury workflow's inbound webhook URL.
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
  const page = field(data, "page", 120);

  const fieldErrors: LeadState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    fieldErrors.email = "Please enter a valid email.";
  if (message.length < 10)
    fieldErrors.message = "Please add a few details about what you need.";
  if (Object.keys(fieldErrors).length) {
    return { status: "error", fieldErrors };
  }

  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) {
    console.error("LEADS_WEBHOOK_URL is not set; lead was not delivered.");
    return {
      status: "error",
      message:
        "Sorry, the form isn't connected yet. Please reach out on Instagram for now.",
    };
  }

  const [firstName, ...rest] = name.split(/\s+/);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        firstName,
        lastName: rest.join(" "),
        email,
        phone,
        company,
        topic,
        message,
        source: "hamiltonpinto.com",
        page,
        tags: ["website lead", topic],
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Lead delivery failed", err);
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

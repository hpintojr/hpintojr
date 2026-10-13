"use client";

import { useActionState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { cn } from "@/lib/utils";

const topicOptions = [
  "Consulting",
  "UGC / brand partnership",
  "Press or speaking",
  "Other",
] as const;

export type Topic = (typeof topicOptions)[number];

const inputClass =
  "mt-1.5 block w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm shadow-xs outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground/40 focus:ring-3 focus:ring-ring/30";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium">
      {children}
    </label>
  );
}

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 text-xs text-red-600">
      {text}
    </p>
  );
}

export function ContactForm({
  defaultTopic = "Consulting",
  page,
  companyLabel = "Company",
  messagePlaceholder = "What are you working on, and how can I help?",
  className,
}: {
  defaultTopic?: Topic;
  page: string;
  companyLabel?: string;
  messagePlaceholder?: string;
  className?: string;
}) {
  const [state, action, pending] = useActionState<LeadState, FormData>(
    submitLead,
    { status: "idle" },
  );

  if (state.status === "success") {
    return (
      <div className={cn("rounded-2xl border bg-card p-8 text-center", className)}>
        <CheckCircle2 className="mx-auto size-10 text-brand" />
        <p className="mt-4 text-lg font-semibold">Message sent</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {state.message ?? "Thanks! I'll get back to you shortly."}
        </p>
      </div>
    );
  }

  const fe = state.fieldErrors ?? {};

  return (
    <form
      action={action}
      noValidate
      className={cn("rounded-2xl border bg-card p-6 shadow-xs sm:p-8", className)}
    >
      <input type="hidden" name="page" value={page} />
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${page}-website`}>Website</label>
        <input id={`${page}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor={`${page}-name`}>Name</Label>
          <input
            id={`${page}-name`}
            name="name"
            autoComplete="name"
            required
            aria-invalid={!!fe.name}
            aria-describedby={fe.name ? `${page}-name-err` : undefined}
            className={inputClass}
          />
          <FieldError id={`${page}-name-err`} text={fe.name} />
        </div>
        <div>
          <Label htmlFor={`${page}-email`}>Email</Label>
          <input
            id={`${page}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!fe.email}
            aria-describedby={fe.email ? `${page}-email-err` : undefined}
            className={inputClass}
          />
          <FieldError id={`${page}-email-err`} text={fe.email} />
        </div>
        <div>
          <Label htmlFor={`${page}-phone`}>
            Phone <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <input
            id={`${page}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </div>
        <div>
          <Label htmlFor={`${page}-company`}>
            {companyLabel}{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <input
            id={`${page}-company`}
            name="company"
            autoComplete="organization"
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={`${page}-topic`}>What&apos;s this about?</Label>
          <select
            id={`${page}-topic`}
            name="topic"
            defaultValue={defaultTopic}
            className={inputClass}
          >
            {topicOptions.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor={`${page}-message`}>Message</Label>
          <textarea
            id={`${page}-message`}
            name="message"
            rows={5}
            required
            placeholder={messagePlaceholder}
            aria-invalid={!!fe.message}
            aria-describedby={fe.message ? `${page}-message-err` : undefined}
            className={inputClass}
          />
          <FieldError id={`${page}-message-err`} text={fe.message} />
        </div>
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-60 sm:w-auto"
      >
        {pending ? <Loader2 className="size-4 animate-spin" /> : null}
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

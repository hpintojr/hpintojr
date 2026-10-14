import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
      {children}
    </p>
  );
}

export function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
      {children}
    </span>
  );
}

const buttonBase =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

export function ButtonLink({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/85"
      : "border bg-card text-foreground hover:bg-muted";
  return (
    <Link href={href} className={cn(buttonBase, styles)}>
      {children}
      <ArrowRight className="size-4 opacity-60 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export function ExternalLink({
  href,
  rel,
  children,
}: {
  href: string;
  rel?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel={cn("noopener noreferrer", rel)}
      className="group inline-flex items-center gap-1 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight className="size-3.5 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </a>
  );
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-card text-card-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg bg-primary text-[13px] font-bold tracking-tight text-primary-foreground",
        className,
      )}
    >
      HP
    </span>
  );
}

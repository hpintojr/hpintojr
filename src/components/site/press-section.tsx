import { site } from "@/config/site";
import { Card, Container, Eyebrow } from "@/components/site/ui";
import { ArrowUpRight } from "lucide-react";

const fmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** "As seen in" press list. Renders nothing until site.press has entries. */
export function PressSection({ className }: { className?: string }) {
  if (!site.press.length) return null;
  const items = [...site.press].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <section aria-labelledby="press" className={className}>
      <Container>
        <Eyebrow>As seen in</Eyebrow>
        <h2 id="press" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Press
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <a
              key={p.url}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full p-6 transition-colors group-hover:bg-muted/50">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand">
                  {p.outlet}
                </p>
                <h3 className="mt-3 font-semibold leading-snug tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                  {fmt.format(new Date(p.date))}
                  <ArrowUpRight className="size-3.5 opacity-60" />
                </p>
              </Card>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

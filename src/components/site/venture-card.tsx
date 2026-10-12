import Image from "next/image";
import type { Venture } from "@/config/site";
import { Card, ExternalLink } from "@/components/site/ui";

function displayUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "");
}

export function VentureCard({ venture: v }: { venture: Venture }) {
  return (
    <Card className="group flex flex-col overflow-hidden">
      <div className="relative aspect-video overflow-hidden border-b bg-muted">
        <Image
          src={v.image}
          alt={v.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-medium text-brand">
            {v.category}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {v.role}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{v.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {v.blurb}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          <ExternalLink href={v.url} rel={v.disclosure ? "sponsored" : undefined}>
            {v.linkLabel ?? displayUrl(v.url)}
          </ExternalLink>
          {v.instagram ? (
            <ExternalLink href={v.instagram}>
              @{v.instagram.replace(/\/$/, "").split("/").pop()}
            </ExternalLink>
          ) : null}
        </div>
        {v.disclosure ? (
          <p className="mt-3 text-xs text-muted-foreground">{v.disclosure}</p>
        ) : null}
      </div>
    </Card>
  );
}

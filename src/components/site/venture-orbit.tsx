"use client";

import { Code2, Megaphone, Palette, PhoneCall } from "lucide-react";
import LogoOrbit from "@/components/codedvisuals/integrations/logo-orbit";

function Mark({ label }: { label: string }) {
  return (
    <span className="text-[10px] font-bold tracking-tight text-foreground">
      {label}
    </span>
  );
}

const ventures = [
  <Mark key="acc" label="ACC" />,
  <Mark key="xb" label="XB" />,
  <Mark key="bp" label="B&P" />,
  <Mark key="mcd" label="MCD" />,
];

const disciplines = [
  <Code2 key="code" className="size-4 text-foreground" />,
  <Megaphone key="mkt" className="size-4 text-foreground" />,
  <Palette key="design" className="size-4 text-foreground" />,
  <PhoneCall key="phone" className="size-4 text-foreground" />,
];

export function VentureOrbit() {
  return (
    <LogoOrbit
      animated
      orbit
      trigger="mount"
      outerLogos={ventures}
      innerLogos={disciplines}
      logo={
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          HP
        </span>
      }
    />
  );
}

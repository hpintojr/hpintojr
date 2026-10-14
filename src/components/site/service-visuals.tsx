"use client";

import { useReducedMotion } from "motion/react";
import BrowserSimple from "@/components/codedvisuals/browser/simple";
import FilesStacked from "@/components/codedvisuals/files/stacked";
import NotificationsBell from "@/components/codedvisuals/notifications/bell";

export function WebVisual() {
  const reduceMotion = useReducedMotion();
  return (
    <BrowserSimple animated={!reduceMotion} trigger="inView" url="bennyandpenny.com" fadeOut />
  );
}

export function BrandVisual() {
  const reduceMotion = useReducedMotion();
  return (
    <FilesStacked animated={!reduceMotion} trigger="inView" category="design" count={5} />
  );
}

export function PhoneVisual() {
  const reduceMotion = useReducedMotion();
  return <NotificationsBell animated={!reduceMotion} trigger="inView" count={3} fadeOut />;
}

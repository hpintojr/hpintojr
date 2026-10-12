"use client";

import BrowserSimple from "@/components/codedvisuals/browser/simple";
import FilesStacked from "@/components/codedvisuals/files/stacked";
import NotificationsBell from "@/components/codedvisuals/notifications/bell";

export function WebVisual() {
  return (
    <BrowserSimple animated trigger="inView" url="bennyandpenny.com" fadeOut />
  );
}

export function BrandVisual() {
  return (
    <FilesStacked animated trigger="inView" category="design" count={5} />
  );
}

export function PhoneVisual() {
  return <NotificationsBell animated trigger="inView" count={3} fadeOut />;
}

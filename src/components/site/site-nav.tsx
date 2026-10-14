"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/consulting", label: "Consulting" },
  { href: "/ugc", label: "UGC & partnerships" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav aria-label="Primary" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        closeMenu();
        toggle.current?.focus();
      }
    }}>
      <div className="desktop-nav">
        {links.map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className="nav-link">
            {label}
          </Link>
        ))}
        <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} className="nav-contact">
          Let&apos;s talk <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <button ref={toggle} type="button" className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
        {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
      </button>
      <div id="mobile-navigation" className="mobile-nav" hidden={!open}>
        {[...links, { href: "/contact", label: "Let’s talk" }].map(({ href, label }) => (
          <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={closeMenu}>
            {label} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

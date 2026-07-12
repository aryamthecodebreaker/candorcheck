"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/site";
import { LogoMark } from "@/components/logo-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || (pathname === "/" && href === "/benchmark");

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <LogoMark />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link className={isActive(item.href) ? "nav-active" : undefined} href={item.href} key={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu</summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link className={isActive(item.href) ? "nav-active" : undefined} href={item.href} key={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}

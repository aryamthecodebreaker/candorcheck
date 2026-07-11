import Link from "next/link";
import { navigation, repositoryUrl } from "@/data/site";
import { LogoMark } from "@/components/logo-mark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <LogoMark />
          <p className="footer-note">
            A transparent, one-message stress test for factual reliability,
            grounding, and honest uncertainty.
          </p>
        </div>
        <div className="footer-links">
          <p className="footer-label">Explore</p>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="footer-links">
          <p className="footer-label">Project</p>
          <a href={repositoryUrl}>GitHub repository</a>
          <Link href="/methodology#protocol">Evaluation protocol</Link>
          <Link href="/methodology#limitations">Limitations</Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>Released under the MIT License.</span>
        <span>Built for reproducible comparisons, not marketing claims.</span>
      </div>
    </footer>
  );
}

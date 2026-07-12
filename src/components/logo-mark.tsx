import Link from "next/link";

export function LogoMark() {
  return (
    <Link className="brand" href="/" aria-label="CandorCheck home">
      <span className="brand-mark" aria-hidden="true">
        CC
      </span>
      <span className="brand-name">CandorCheck</span>
      <span className="brand-version">open</span>
    </Link>
  );
}

import Link from "next/link";

export function LogoMark() {
  return (
    <Link className="brand" href="/" aria-label="HallucinationBench home">
      <span className="brand-mark" aria-hidden="true">
        HB
      </span>
      <span className="brand-name">HallucinationBench</span>
      <span className="brand-version">v0.1</span>
    </Link>
  );
}

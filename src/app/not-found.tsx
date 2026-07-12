import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell page-hero compact-hero">
      <p className="eyebrow">404 / Missing evidence</p>
      <h1>This page is not in the record.</h1>
      <p className="lede">
        CandorCheck does not invent missing pages. Return to the verified
        site instead.
      </p>
      <Link className="button button-dark" href="/">
        Go home
      </Link>
    </section>
  );
}

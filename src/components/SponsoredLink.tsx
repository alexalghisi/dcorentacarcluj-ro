import { ADSTERRA_SMARTLINK } from "@/lib/advertising";

/** Discreet, clearly labelled sponsored link (Adsterra Smartlink) for page footers. */
export function SponsoredLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={ADSTERRA_SMARTLINK}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      className={`text-xs text-muted-foreground underline-offset-2 hover:underline ${className}`}
    >
      Oferte partenere (publicitate)
    </a>
  );
}

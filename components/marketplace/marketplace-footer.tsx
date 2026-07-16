import Link from "next/link";

const LINKS = [
  { label: "About", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Help", href: "#" },
];

const SOCIALS = [
  { label: "X", short: "X", href: "#" },
  { label: "Instagram", short: "IG", href: "#" },
  { label: "LinkedIn", short: "in", href: "#" },
];

export function MarketplaceFooter() {
  return (
    <footer className="bg-[#111111]">
      <div className="mx-auto max-w-[1440px] px-7 py-16 lg:px-14 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-12 md:flex-row md:items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 transition-opacity duration-[250ms] hover:opacity-60"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[11px] font-semibold text-[#111111]">
              T
            </span>
            <span className="text-[16px] font-medium tracking-tight text-white">
              Titan Soles
            </span>
          </Link>

          <nav className="flex flex-wrap gap-x-10 gap-y-3">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[14px] font-normal text-white/45 transition-colors duration-[250ms] hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[12px] font-medium text-white/45 transition-all duration-[250ms] hover:bg-white/10 hover:text-white"
              >
                {social.short}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/[0.08] pt-8">
          <p className="text-[12px] font-normal text-white/30">
            © {new Date().getFullYear()} Titan Soles
          </p>
        </div>
      </div>
    </footer>
  );
}

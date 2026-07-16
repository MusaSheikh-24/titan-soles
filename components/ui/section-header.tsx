import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
  align?: "left" | "center";
  eyebrow?: string;
}

export function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel = "View all",
  className,
  align = "left",
  eyebrow,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex gap-4",
        centered
          ? "flex-col items-center text-center"
          : "items-end justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", centered && "mx-auto")}>
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            {eyebrow}
          </p>
        )}
        <h2 className="text-section font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-base leading-relaxed text-muted">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          {linkLabel}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

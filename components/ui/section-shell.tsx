import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionShellProps {
  theme?: "light" | "dark";
  children: ReactNode;
  className?: string;
  id?: string;
  padded?: boolean;
}

export function SectionShell({
  theme = "dark",
  children,
  className,
  id,
  padded = true,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        theme === "light" ? "theme-light" : "theme-dark",
        "bg-background text-foreground",
        padded && "section-padding",
        className
      )}
    >
      {children}
    </section>
  );
}

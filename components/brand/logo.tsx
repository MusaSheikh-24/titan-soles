import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "light" | "dark";
}

export function Logo({ className, size = "md", variant = "light" }: LogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-sm">
        <span className="text-sm font-bold text-white">T</span>
        <div className="absolute inset-0 rounded-xl bg-white/20" />
      </div>
      <span
        className={cn(
          "font-bold tracking-tight",
          sizes[size],
          variant === "dark" ? "text-white" : "text-neutral-950"
        )}
      >
        Titan<span className="gradient-text">Soles</span>
      </span>
    </div>
  );
}

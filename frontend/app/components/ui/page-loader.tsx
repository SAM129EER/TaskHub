import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
  className?: string;
  label?: string;
}

export function PageLoader({ className, label = "Loading..." }: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex min-h-[50vh] w-full flex-col items-center justify-center gap-3 p-4",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute h-10 w-10 rounded-full border-2 border-primary/20 animate-ping" />
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
      {label && (
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}

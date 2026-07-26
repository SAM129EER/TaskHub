import { Suspense, ReactNode } from "react";
import { PageLoader } from "@/components/ui/page-loader";

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  label?: string;
}

/**
 * SuspenseBoundary component to wrap async routes or lazy-loaded components.
 * Displays a branded loading state while async operations resolve.
 */
export function SuspenseBoundary({
  children,
  fallback,
  className,
  label,
}: SuspenseBoundaryProps) {
  return (
    <Suspense fallback={fallback || <PageLoader className={className} label={label} />}>
      {children}
    </Suspense>
  );
}

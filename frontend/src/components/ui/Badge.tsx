// frontend/src/components/ui/Badge.tsx
import type { ReactNode } from "react";

export default function Badge({ children }: { children: ReactNode }) {
  return (
    <div className="bg-primary-100 text-primary-600 text-xs font-bold px-2 py-1 rounded-full">
      {children}
    </div>
  );
}
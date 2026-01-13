// frontend/src/components/ui/FeatureCard.tsx
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps) {
  return (
    <div className="card p-8 text-center transform hover:-translate-y-2 transition-transform duration-300 bg-white dark:bg-neutral-800">
      <div className="inline-block bg-primary-100 dark:bg-primary-500/20 text-primary-500 dark:text-primary-300 p-4 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-2">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400">{description}</p>
    </div>
  );
}
// frontend/src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-neutral-800 p-3 mb-2 rounded-lg shadow-sm animate-pulse">
      <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-full mb-2"></div>
      <div className="h-3 bg-neutral-200 dark:bg-neutral-700 rounded w-1/2"></div>
    </div>
  );
}
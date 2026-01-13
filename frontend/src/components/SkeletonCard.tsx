// frontend/src/components/SkeletonCard.tsx
export default function SkeletonCard() {
  return (
    <div className="bg-white p-3 mb-2 rounded shadow-sm animate-pulse">
      <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-neutral-200 rounded w-full mb-2"></div>
      <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
    </div>
  );
}
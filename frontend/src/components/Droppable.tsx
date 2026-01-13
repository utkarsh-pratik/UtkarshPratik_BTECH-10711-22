// frontend/src/components/Droppable.tsx
import { useDroppable } from "@dnd-kit/core";
import React from "react";

export function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="w-full md:w-1/3">
      {children}
    </div>
  );
}
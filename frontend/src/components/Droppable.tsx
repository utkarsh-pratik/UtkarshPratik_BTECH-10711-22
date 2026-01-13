// frontend/src/components/Droppable.tsx
import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react"; // <-- Import ReactNode

export function Droppable({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  // Dynamically set the background color based on whether a card is hovering over it
  const style = {
    backgroundColor: isOver ? "rgba(99, 102, 241, 0.1)" : undefined, // primary-500 with 10% opacity
  };

  return (
    <div ref={setNodeRef} className="w-full md:w-1/3 transition-colors duration-200 rounded-lg">
      <div style={style} className="h-full rounded-lg">
        {children}
      </div>
    </div>
  );
}
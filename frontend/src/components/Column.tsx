// frontend/src/components/Column.tsx
import { motion, AnimatePresence } from "framer-motion"; // <-- Import motion and AnimatePresence
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Inbox } from "lucide-react";
import TaskCard from "./TaskCard";
import type { Task } from "../types/task";

// Define animation variants for each task card
const taskCardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function Column({
  title,
  tasks,
  onEdit,
  onDelete,
}: {
  title: string;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}) {
  return (
    <div className="bg-transparent p-4 rounded-lg w-full flex-shrink-0 h-full">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="font-bold text-lg text-neutral-700">{title}</h2>
        <span className="text-sm font-medium bg-neutral-200 text-neutral-600 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3 h-full">
        <AnimatePresence>
          {tasks.length > 0 ? (
            <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
              {tasks.map((task) => (
                <motion.div key={task._id} variants={taskCardVariants}> {/* <-- Wrap TaskCard */}
                  <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} />
                </motion.div>
              ))}
            </SortableContext>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center h-full text-neutral-400"
            >
              <Inbox size={48} />
              <p className="mt-2 text-sm font-medium">No tasks here</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

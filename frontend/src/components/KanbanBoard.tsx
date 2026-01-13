// frontend/src/components/KanbanBoard.tsx
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable"; // Add arrayMove to your imports from @dnd-kit/sortable
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // <-- Import motion
import {
  fetchTasks,
  updateTaskStatus,
  deleteTask as deleteTaskApi,
} from "../api/task.api";
import Column from "./Column";
import { Droppable } from "./Droppable";
import EditTaskModal from "./EditTaskModal";
import TaskCard from "./TaskCard";
import SkeletonCard from "./SkeletonCard"; // <-- Import SkeletonCard
import type { Task } from "../types/task";

// Define animation variants for the container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the animation of children by 0.1s
    },
  },
};

// Define animation variants for each column
const columnVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true); // <-- Add loading state

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    setIsLoading(true);
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err))
      .finally(() => setIsLoading(false)); // <-- Set loading to false after fetch
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t._id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    // If not dropped on a valid area, do nothing
    if (!over) return;

    // If dropped on the same spot, do nothing
    if (active.id === over.id) return;

    const originalTask = tasks.find((t) => t._id === active.id);
    if (!originalTask) return;

    const overIsAColumn = ["pending", "in-progress", "completed"].includes(over.id as string);

    // Case 1: Dropped on a different column
    if (overIsAColumn && originalTask.status !== over.id) {
      const newStatus = over.id as Task["status"];
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === active.id ? { ...t, status: newStatus } : t
        )
      );
      await updateTaskStatus(active.id as string, newStatus);
      return;
    }

    // Case 2: Reordering within the same column
    const overTask = tasks.find((t) => t._id === over.id);
    if (overTask && originalTask.status === overTask.status) {
      setTasks((prevTasks) => {
        const oldIndex = prevTasks.findIndex((t) => t._id === active.id);
        const newIndex = prevTasks.findIndex((t) => t._id === over.id);
        return arrayMove(prevTasks, oldIndex, newIndex);
      });
      // Optional: You could add an API call here to save the new order
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleDelete = async (taskId: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTaskApi(taskId);
        setTasks((prev) => prev.filter((t) => t._id !== taskId));
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
        {["Pending", "In Progress", "Completed"].map((title) => (
          <div key={title} className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-xl w-full md:w-1/3">
            <h2 className="font-bold mb-4 text-lg text-neutral-700 dark:text-neutral-200">{title}</h2>
            <div className="space-y-3">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)}
      >
        <motion.div
          className="flex flex-col md:flex-row gap-4 p-4 md:p-6"
          variants={containerVariants} // <-- Apply container variants
          initial="hidden"
          animate="visible"
        >
          <Droppable id="pending">
            <motion.div variants={columnVariants}> {/* <-- Wrap column in motion.div */}
              <Column
                title="Pending"
                tasks={tasks.filter((t) => t.status === "pending")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          </Droppable>
          <Droppable id="in-progress">
            <motion.div variants={columnVariants}> {/* <-- Wrap column in motion.div */}
              <Column
                title="In Progress"
                tasks={tasks.filter((t) => t.status === "in-progress")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          </Droppable>
          <Droppable id="completed">
            <motion.div variants={columnVariants}> {/* <-- Wrap column in motion.div */}
              <Column
                title="Completed"
                tasks={tasks.filter((t) => t.status === "completed")}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </motion.div>
          </Droppable>
        </motion.div>

        <DragOverlay>
          {activeTask ? (
            <div className="rotate-3 shadow-lg">
              <TaskCard
                task={activeTask}
                onEdit={() => {}}
                onDelete={() => {}}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <EditTaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        task={editingTask}
        onTaskUpdated={handleTaskUpdated}
      />
    </>
  );
}

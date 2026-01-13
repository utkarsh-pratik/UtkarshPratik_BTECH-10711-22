// frontend/src/components/KanbanBoard.tsx
import {
  DndContext,
  DragOverlay, // <-- Import DragOverlay
  PointerSensor, // <-- Import sensors for better control
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent, // <-- Import DragStartEvent
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import {
  fetchTasks,
  updateTaskStatus,
  deleteTask as deleteTaskApi,
} from "../api/task.api";
import Column from "./Column";
import { Droppable } from "./Droppable";
import EditTaskModal from "./EditTaskModal";
import TaskCard from "./TaskCard"; // <-- Import TaskCard
import type { Task } from "../types/task";

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null); // <-- Add state for the active task

  // Use sensors for more reliable drag detection
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // User must drag 8px before a drag starts
      },
    })
  );

  useEffect(() => {
    fetchTasks().then((res) => setTasks(res.data));
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t._id === event.active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null); // Clear the active task
    const { active, over } = event;
    if (!over || !active) return;

    const task = tasks.find((t) => t._id === active.id);
    if (!task) return;

    const newStatus = over.id as Task["status"];
    if (task.status !== newStatus) {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t._id === task._id ? { ...t, status: newStatus } : t
        )
      );
      await updateTaskStatus(task._id, newStatus);
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

  return (
    <>
      <DndContext
        sensors={sensors} // <-- Add sensors
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTask(null)} // Handle drag cancellation
      >
        <div className="flex flex-col md:flex-row gap-4 p-4 md:p-6">
          <Droppable id="pending">
            <Column
              title="Pending"
              tasks={tasks.filter((t) => t.status === "pending")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Droppable>
          <Droppable id="in-progress">
            <Column
              title="In Progress"
              tasks={tasks.filter((t) => t.status === "in-progress")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Droppable>
          <Droppable id="completed">
            <Column
              title="Completed"
              tasks={tasks.filter((t) => t.status === "completed")}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Droppable>
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              onEdit={() => {}}
              onDelete={() => {}}
            />
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

// frontend/src/utils/dueDateUtils.ts

// Define the TaskStatus type
export type TaskStatus = "on-track" | "due-soon" | "overdue";

// Function to calculate the task status based on the due date
export function calculateTaskStatus(dueDate: string): TaskStatus {
  if (!dueDate) return "on-track"; // Default to "on-track" if no due date is provided

  const now = new Date();
  const due = new Date(dueDate);

  const timeDiff = due.getTime() - now.getTime();
  const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert milliseconds to days

  if (daysDiff < 0) {
    return "overdue"; // Due date is in the past
  } else if (daysDiff <= 3) {
    return "due-soon"; // Due date is within the next 3 days
  } else {
    return "on-track"; // Due date is more than 3 days away
  }
}
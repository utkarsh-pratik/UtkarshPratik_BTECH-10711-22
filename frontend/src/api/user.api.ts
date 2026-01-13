// frontend/src/api/user.api.ts
import api from "./axios";

export const updateProfile = (name: string) =>
  api.put("/users/me", { name });

export const deleteProfile = () => api.delete("/users/me");
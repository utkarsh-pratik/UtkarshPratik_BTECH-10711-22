// frontend/src/api/user.api.ts
import api from "./axios";

// Define the shape of the user profile response
interface UserProfile {
  _id: string;
  name: string;
  email: string;
}

export const getProfile = () => api.get<UserProfile>("/users/me");

export const updateProfile = (name: string) => api.put("/users/me", { name });

export const deleteProfile = () => api.delete("/users/me");
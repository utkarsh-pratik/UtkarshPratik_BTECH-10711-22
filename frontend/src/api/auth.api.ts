import api from "./axios";

// Define the shape of the successful login response
interface LoginResponse {
  token: string;
}

export const loginApi = (email: string, password: string) =>
  // Tell the post method to expect a LoginResponse
  api.post<LoginResponse>("/auth/login", { email, password });

export const registerApi = (name: string, email: string, password: string) =>
  api.post("/auth/register", { name, email, password });
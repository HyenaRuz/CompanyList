import { instance } from "../api/axios.api";

export const registration = async (userData) => {
  const { data } = await instance.post("auth/signup", userData);
  return data;
};
export const login = async (userData) => {
  const { data } = await instance.post("auth/login", userData);
  return data;
};
export const getProfile = async () => {
  const { data } = await instance.get("auth/profile");
  return data;
};
export const updateUser = async (userData) => {
  await instance.patch("user", userData);
};

import apiClient from "@/plugins/axios";

import { useAuthStore } from "@/store/authStore";

export const login = async (nik, password) => {
  try {
    const response = await apiClient.post("/auth/login", {
      nik,
      password,
    });

    console.log("Login response:", response.data);

    if (!response.data || !response.data.data || !response.data.data.token) {
      throw new Error("Invalid response from server");
    }

    const { token, role } = response.data.data;
    console.log("Token and role from login service:", token, role);
    const authStore = useAuthStore();
    authStore.setToken(token);
    authStore.setRole(role);

    console.log(
      "Token and role saved in store:",
      authStore.token,
      authStore.role
    ); // Debug log

    return response.data.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const register = async (nik,nama,jenisKelamin,tanggalLahir, email,alamat,pendidikan,pekerjaan,agama,perkawinan, password) => {
  try {
    const response = await apiClient.post("/auth/register", {
      nik,
      nama,
      jenisKelamin,
      tanggalLahir,
      email,
      alamat,
      pendidikan,
      pekerjaan,
      agama,
      perkawinan,
      password,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

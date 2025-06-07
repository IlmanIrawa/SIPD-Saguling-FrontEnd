import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    nik: localStorage.getItem("nik") || "", // Tambahkan state nik
  }),

  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },

    setRole(role) {
      this.role = role;
      localStorage.setItem("role", role);
    },

    setNik(nik) {
      const plainNik = typeof nik === "object" && "_value" in nik ? nik.value : nik;
      this.nik = plainNik;
      localStorage.setItem("nik", JSON.stringify(plainNik));
    },       

    logout() {
      this.token = "";
      this.role = "";
      this.nik = ""; // Hapus nik dari state

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("nik"); // Hapus nik dari localStorage
    },
  },
});

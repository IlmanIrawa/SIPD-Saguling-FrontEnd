import { defineStore } from "pinia";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    nik: (() => {
      try {
        const storedNik = localStorage.getItem("nik");
        console.log("NIK dari localStorage:", storedNik); // Tambahkan logging ini
        const parsedNik = String(JSON.parse(storedNik) || ""); // Konversi ke string
        console.log("NIK setelah JSON.parse:", parsedNik); // Tambahkan logging ini
        return parsedNik;
      } catch (error) {
        console.error("Error parsing NIK from localStorage:", error);
        return ""; // Nilai default jika terjadi kesalahan
      }
    })(),
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
      console.log("NIK sebelum penanganan _value:", nik); // Tambahkan logging ini
      const plainNik = typeof nik === "object" && "_value" in nik ? String(nik.value) : String(nik); // Konversi ke string
      console.log("NIK setelah penanganan _value:", plainNik); // Tambahkan logging ini
      this.nik = plainNik;
      localStorage.setItem("nik", JSON.stringify(plainNik));
      console.log("NIK disimpan di localStorage:", JSON.stringify(plainNik)); // Tambahkan logging ini
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

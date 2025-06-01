<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-header bg-info text-white">
        <h5 class="mb-0">Form Input Berita</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitBerita">
          <div class="mb-3">
            <label for="tanggal" class="form-label">Tanggal</label>
            <input type="date" id="tanggal" class="form-control" v-model="form.tanggal" required />
          </div>

          <div class="mb-3">
            <label for="judul" class="form-label">Judul Berita</label>
            <input type="text" id="judul" class="form-control" v-model="form.judul" placeholder="Judul" required />
          </div>

          <div class="mb-3">
            <label for="isi" class="form-label">Isi Berita</label>
            <textarea id="isi" class="form-control" v-model="form.isiBerita" rows="5" placeholder="Tulis isi berita di sini..." required></textarea>
          </div>

          <div class="mb-3">
            <label for="gambar" class="form-label">Gambar</label>
            <input type="file" id="gambar" class="form-control" @change="handleFileUpload" />
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            {{ isSubmitting ? "Menyimpan..." : "Simpan" }}
          </button>
        </form>
      </div>
      <div class="card-footer text-center">
        <small>Copyright © 2025 Detailed Desa Saguling. All rights reserved.</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      form: {
        judul: "",
        tanggal: "",
        gambar: null,
        isiBerita: "",
      },
      isSubmitting: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.gambar = event.target.files[0];
    },
    async submitBerita() {
      if (!this.form.judul || !this.form.tanggal || !this.form.isiBerita) {
        Swal.fire("Oops!", "Semua field harus diisi.", "warning");
        return;
      }

      this.isSubmitting = true;
      try {
        const authStore = useAuthStore();
        if (!authStore.token) {
          Swal.fire("Error", "Token tidak ditemukan. Silakan login kembali.", "error");
          return;
        }

        const formData = new FormData();
        formData.append("judul", this.form.judul);
        formData.append("tanggal", this.form.tanggal);
        formData.append("isiBerita", this.form.isiBerita);
        if (this.form.gambar) {
          formData.append("gambar", this.form.gambar, this.form.gambar.name);
        }

        await axios.post("http://localhost:3000/api/berita", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authStore.token}`,
          },
        });

        Swal.fire("Berhasil", "Data berhasil disimpan!", "success");
        this.form = { judul: "", tanggal: "", gambar: null, isiBerita: "" };
      } catch (error) {
        Swal.fire("Gagal", "Gagal menyimpan data!", "error");
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};

</script>

<style>
.card {
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-header {
  font-size: 18px;
  font-weight: bold;
}
.card-footer {
  font-size: 14px;
}
.toolbar button {
  margin-right: 5px;
}
</style>

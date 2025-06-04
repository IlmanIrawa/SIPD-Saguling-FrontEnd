<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-header bg-info text-white">
        <h5 class="mb-0">Form Pengajuan Administrasi</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitPengajuan" enctype="multipart/form-data">
          <div class="mb-3">
            <label for="nik" class="form-label">NIK</label>
            <input type="number" id="nik" class="form-control" v-model="form.nik" required readonly />
          </div>

          <div class="mb-3"><label for="nama" class="form-label">Nama</label>
            <input type="text" id="nama" class="form-control" v-model="form.nama" required readonly />
          </div>

          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <input type="text" id="alamat" class="form-control" v-model="form.alamat" required readonly />
          </div>

          <div class="mb-3">
            <label for="noHp" class="form-label">Handphone</label>
            <input type="number" id="noHp" class="form-control" v-model="form.noHp" required  />
          </div>

          <div class="mb-3">
            <label for="ktp" class="form-label">KTP</label>
            <input
              type="file"
              id="ktp"
              name="ktp"
              class="form-control"
              @change="handleFileUpload($event, 'ktp')"
              required
            />
          </div>

          <div class="mb-3">
            <label for="kk" class="form-label">Kartu Keluarga</label>
            <input
              type="file"
              id="kk"
              name="kk"
              class="form-control"
              @change="handleFileUpload($event, 'kk')"
              required
            />
          </div>

          <div class="mb-3">
            <label for="keperluan" class="form-label">Pilih Keperluan</label>
            <select
              id="keperluan"
              class="form-select"
              v-model="form.keperluan"
              required
            >
              <option disabled value="">-- Pilih Keperluan --</option>
              <option v-for="keperluan in keperluanList" :key="keperluan" :value="keperluan">
                {{ keperluan }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="lampiran" class="form-label">Dokumen Penunjang</label>
            <input
              type="file"
              id="lampiran"
              class="form-control"
              name="lampiran"
              @change="handleFileUpload($event, 'lampiran')"
              required
            />

            <div class="alert alert-secondary mt-2 p-3">
              <p class="mb-1"><strong>Informasi Tambahan:</strong></p>
              <ul class="mb-2">
                <li>
                  <a href="#" class="text-decoration-none">
                    📄 <strong>Klik di sini</strong> untuk membaca
                    <em>Ketentuan Dokumen Penunjang</em>
                  </a>
                </li>
                <li>
                  <a href="#" class="text-decoration-none">
                    📥 <strong>Klik di sini</strong> untuk mengunduh
                    <em>Format Dokumen Penunjang</em>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Kirim</button>
        </form>
      </div>
      <div class="card-footer text-center">
        <small>Copyright © 2025 Detailed Desa Saguling</small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      form: {
        nik: "",
        nama: "",
        alamat: "",
        noHp: "",
        ktp: null,
        kk: null,
        lampiran: null,
        keperluan: "",
      },
      keperluanList: [
        "Surat Ket. Tidak Mampu",
        "Surat Keterangan Domisili",
        "Surat Keterangan Pertanahan",
        "Surat Keterangan Kematian",
        "Surat Keterangan Kelahiran",
      ],
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    handleFileUpload(event, field) {
      const file = event.target.files[0];
      if (file) {
        this.form[field] = file;
      }
    },
    async getUserData() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem("jwt_token");

        if (!token) {
          return;
        }

        const response = await axios.get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;

        // Isi form otomatis dari data user
        this.form.nik = user.nik || "";
        this.form.nama = user.nama || "";
        this.form.alamat = user.alamat || "";
        this.form.noHp = user.noHp || "";
      } catch (error) {
        console.error("Gagal mengambil data user:", error);
        // Kamu bisa tampilkan notifikasi error jika perlu
      }
    },
    async submitPengajuan() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem("jwt_token");

        if (!token) {
          Swal.fire({
            icon: "warning",
            title: "Token Tidak Ditemukan",
            text: "Silakan login kembali untuk melanjutkan.",
          });
          return;
        }

        const formData = new FormData();
        formData.append("nik", this.form.nik);
        formData.append("nama", this.form.nama);
        formData.append("alamat", this.form.alamat);
        formData.append("noHp", this.form.noHp);
        formData.append("keperluan", this.form.keperluan);
        formData.append("ktp", this.form.ktp);
        formData.append("kk", this.form.kk);
        formData.append("lampiran", this.form.lampiran);

        await axios.post("http://localhost:3000/api/pengajuan", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Pengajuan berhasil dikirim.",
        });

        this.resetForm();
        this.getUserData(); // Optional: refresh user info setelah submit
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengirim Data",
          text:
            error.response?.data?.message ||
            error.message ||
            "Terjadi kesalahan saat mengirim data.",
        });
      }
    },
    resetForm() {
      this.form.keperluan = "";
      this.form.ktp = null;
      this.form.kk = null;
      this.form.lampiran = null;
      document.getElementById("ktp").value = "";
      document.getElementById("kk").value = "";
      document.getElementById("lampiran").value = "";
    },
  },
};
</script>

<style scoped>
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
a {
  color: #007bff;
}
a:hover {
  text-decoration: underline;
}
</style>

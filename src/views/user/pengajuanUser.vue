<template>
  <div class="container mt-3">
    <div class="card">
      <div class="card-header bg-info text-white">
        <h5 class="mb-0">Form Pengajuan Administrasi</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitPengajuan">
          <div class="mb-3">
            <label for="nik" class="form-label">NIK</label>
            <input
              type="number"
              id="nik"
              class="form-control"
              v-model="form.nik"
              placeholder="NIK"
              required
            />
          </div>

          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input
              type="text"
              id="nama"
              class="form-control"
              v-model="form.nama"
              placeholder="Nama"
              required
            />
          </div>

          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <input
              type="text"
              id="alamat"
              class="form-control"
              v-model="form.alamat"
              placeholder="Alamat"
              required
            />
          </div>

          <div class="mb-3">
            <label for="noHp" class="form-label">Handphone</label>
            <input
              type="number"
              id="noHp"
              class="form-control"
              v-model="form.noHp"
              placeholder="Handphone"
              required
            />
          </div>

          <div class="mb-3">
            <label for="ktp" class="form-label">KTP</label>
            <input
              type="file"
              id="ktp"
              class="form-control"
              @change="handleFileUpload($event, 'ktp')"
            />
          </div>

          <div class="mb-3">
            <label for="kk" class="form-label">Kartu Keluarga</label>
            <input
              type="file"
              id="kk"
              class="form-control"
              @change="handleFileUpload($event, 'kk')"
            />
          </div>

          <div class="mb-3">
            <label for="keperluan" class="form-label">Pilih Keperluan</label>
            <select id="keperluan" v-model="form.keperluan" class="form-select">
              <option disabled value="">-- Pilih Keperluan --</option>
              <option
                v-for="keperluan in keperluanList"
                :key="keperluan"
                :value="keperluan"
              >
                {{ keperluan }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="dokumenPenunjang" class="form-label">Dokumen Penunjang</label>
            <input
              type="file"
              id="dokumenPenunjang"
              class="form-control"
              @change="handleFileUpload($event, 'dokumenPenunjang')"
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
        <small
          >Copyright © 2025 Detailed Desa Saguling. All rights reserved.</small
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

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
        dokumenPenunjang: null,
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
  methods: {
    handleFileUpload(event, field) {
      this.form[field] = event.target.files[0];
    },
    async submitPengajuan() {
      if (
        !this.form.nik ||
        !this.form.nama ||
        !this.form.alamat ||
        !this.form.noHp ||
        !this.form.ktp ||
        !this.form.kk ||
        !this.form.keperluan ||
        !this.form.dokumenPenunjang
      ) {
        alert("Semua field harus diisi.");
        return;
      }

      // Cek apakah file di-upload
      if (!this.form.ktp || !this.form.kk || !this.form.dokumenPenunjang) {
        alert("Semua dokumen harus diunggah.");
        return;
      }

      try {
        const authStore = useAuthStore();
        const token = authStore.token || localStorage.getItem("jwt_token");

        if (!token) {
          alert("Token tidak ditemukan. Silakan login kembali.");
          return;
        }

        const formData = new FormData();
        formData.append("nik", this.form.nik);
        formData.append("nama", this.form.nama);
        formData.append("alamat", this.form.alamat);
        formData.append("noHp", this.form.noHp);
        formData.append("keperluan", this.form.keperluan);
        formData.append("ktp", this.form.ktp, this.form.ktp.name);
        formData.append("kk", this.form.kk, this.form.kk.name);
        formData.append("dokumenPenunjang", this.form.dokumenPenunjang, this.form.dokumenPenunjang.name);

        console.log("Data yang dikirim:", [...formData.entries()]);

        await axios.post("http://localhost:3000/api/pengajuan", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Data berhasil disubmit!");
        this.form = {
          nik: "",
          nama: "",
          alamat: "",
          noHp: "",
          ktp: null,
          kk: null,
          dokumenPenunjang: null,
          keperluan: "",
        };
      } catch (error) {
        console.error("Gagal mengirim data:", error);
        alert(
          `Gagal mengirim data: ${
            error.response ? error.response.data.message : error.message
          }`
        );
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
a {
  color: #007bff;
}
a:hover {
  text-decoration: underline;
}
</style>

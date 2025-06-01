<template>
  <div class="container mt-3">
    <div class="card shadow-sm p-4">
      <h2 class="text-center mb-4">Kirim Laporan</h2>
      <form @submit.prevent="submitLaporan">
        <div class="mb-3">
          <label for="nama" class="form-label">Nama</label>
          <input
            v-model="nama"
            id="nama"
            type="text"
            class="form-control"
            placeholder="Masukkan Nama"
            required
          />
        </div>

        <div class="mb-3">
          <label for="nohp" class="form-label">No HP</label>
          <input
            v-model="nohp"
            id="nohp"
            type="tel"
            class="form-control"
            placeholder="Masukkan No HP"
            required
          />
        </div>

        <div class="mb-3">
          <label for="isiLaporan" class="form-label">Isi Laporan</label>
          <textarea
            v-model="isiLaporan"
            id="isiLaporan"
            class="form-control"
            rows="4"
            placeholder="Masukkan Isi Laporan"
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="lampiran" class="form-label">Lampiran</label>
          <input
            type="file"
            id="lampiran"
            class="form-control"
            @change="handleFile"
          />
        </div>

        <button type="submit" class="btn btn-primary w-100">Kirim</button>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  data() {
    return {
      nama: "",
      nohp: "",
      isiLaporan: "",
      lampiran: null,
    };
  },
  methods: {
    handleFile(event) {
      this.lampiran = event.target.files[0];
    },
    async submitLaporan() {
      try {
        const formData = new FormData();
        formData.append("nama", this.nama);
        formData.append("nohp", this.nohp);
        formData.append("isiLaporan", this.isiLaporan);
        if (this.lampiran) {
          formData.append("lampiran", this.lampiran);
        }

        const response = await fetch("http://localhost:3000/api/lapor", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Gagal mengirim laporan");
        }

        await Swal.fire({
          icon: "success",
          title: "Laporan Terkirim",
          text: "Terima kasih, laporan Anda telah berhasil dikirim.",
        });

        // Reset form
        this.nama = "";
        this.nohp = "";
        this.isiLaporan = "";
        this.lampiran = null;
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: error.message || "Terjadi kesalahan saat mengirim laporan.",
        });
      }
    },
  },
};
</script>

<style>
.container {
  max-width: 600px;
}
</style>

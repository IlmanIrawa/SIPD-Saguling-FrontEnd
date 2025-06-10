<template>
  <div class="container">
    <h2 class="title">Daftar Pengajuan</h2>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Cari ..."
      class="search-input"
    />
    <hr />
    <div class="card-container">
      <div
        class="card"
        v-for="pengajuan in filteredPengajuan"
        :key="pengajuan.pengajuanid"
      >
        <div class="card-content">
          <h4>Bukti Pengajuan #{{ pengajuan.pengajuanid }}</h4>
          <p><strong>Jenis Surat:</strong> {{ pengajuan.keperluan }}</p>
          <span class="status" :class="getStatusClass(pengajuan.statusPengajuan)">
            {{ pengajuan.statusPengajuan }}
          </span>
          <br />
          <button class="btn" @click="cetakBukti(pengajuan)">
            <i class="bi bi-printer"></i> Cetak Bukti
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import jsPDF from "jspdf";
import QRCode from "qrcode";

export default {
  name: "PengajuanCardView",
  data() {
    return {
      spk: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredPengajuan() {
      return this.spk.filter((pengajuan) => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
          pengajuan.nik.toString().includes(this.searchQuery) ||
          pengajuan.nama.toLowerCase().includes(searchLower) ||
          pengajuan.alamat.toLowerCase().includes(searchLower)
        );
      });
    },
  },
  methods: {
    async fetchPengajuan() {
      const authStore = useAuthStore();
      if (!authStore.token) {
        console.error("Token kosong! Tidak dapat melakukan permintaan API.");
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/api/pengajuan/by-nik", {
          headers: { Authorization: `Bearer ${authStore.token}` },
        });
        this.spk = response.data;
      } catch (error) {
        console.error("Error fetching Pengajuan:", error);
      }
    },

    async cetakBukti(pengajuan) {
      const doc = new jsPDF();

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("BUKTI PENGAJUAN SURAT", 70, 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.text("Dokumen ini merupakan persyaratan wajib untuk pengambilan surat.", 20, 35);
      doc.text("Harap membawa dokumen ini saat mengambil surat di kantor.", 20, 45);

      doc.setFont("helvetica", "bold");
      doc.text("Detail Pengajuan:", 20, 60);

      doc.setFont("helvetica", "normal");
      doc.text(`ID Pengajuan : ${pengajuan.pengajuanid}`, 20, 75);
      doc.text(`NIK          : ${pengajuan.nik}`, 20, 85);
      doc.text(`Nama         : ${pengajuan.nama}`, 20, 95);
      doc.text(`Alamat       : ${pengajuan.alamat}`, 20, 105);
      doc.text(`Handphone    : ${pengajuan.noHp}`, 20, 115);
      doc.text(`Keperluan    : ${pengajuan.keperluan}`, 20, 125);
      doc.text(`Status       : ${pengajuan.statusPengajuan}`, 20, 135);

      try {
        const qrData = `ID: ${pengajuan.pengajuanid}\nNIK: ${pengajuan.nik}\nNama: ${pengajuan.nama}`;
        const qrCodeUrl = await QRCode.toDataURL(qrData);
        doc.addImage(qrCodeUrl, "PNG", 140, 40, 50, 50);
      } catch (err) {
        console.error("Error generating QR code:", err);
      }

      doc.setFont("helvetica", "italic");
      doc.setFontSize(10);
      doc.text(
        "Catatan: Harap pastikan semua informasi di atas sesuai sebelum mengambil surat.",
        20,
        160
      );

      doc.save(`Bukti_Pengajuan_${pengajuan.pengajuanid}.pdf`);
    },

    getStatusClass(status) {
      switch (status) {
        case "SELESAI":
          return "status-success";
        case "PENGIRIMAN":
          return "status-warning";
        case "ON_PROCESS":
          return "status-danger";
        default:
          return "status-default";
      }
    },
  },

  mounted() {
    this.fetchPengajuan();
  },
};
</script>

<style scoped>
.search-input {
  padding: 8px;
  border-radius: 5px;
  max-width: 300px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: aliceblue;
  border-radius: 10px;
}
.title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 2rem;
  font-weight: bold;
}
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.card {
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-10px);
}
.status {
  display: inline-block;
  padding: 5px 12px;
  border-radius: 12px;
  font-weight: bold;
}
.status-success { background: #4caf50; color: white; }
.status-warning { background: #ffc107; color: black; }
.status-danger { background: #f44336; color: white; }
.status-default { background: #9e9e9e; color: white; }
.btn {
  margin-top: 20px;
  padding: 8px 16px;
  background: #1e88e5;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}
.btn:hover {
  background: #1565c0;
}
</style>

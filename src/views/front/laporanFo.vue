<template>
  <div class="container mt-2">
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h2 class="mb-0">Laporan Pengajuan Surat</h2>
      </div>
      <div class="card-body">
        <!-- Filter Waktu dan Status -->
        <div class="mb-4 d-flex align-items-center gap-3">
          <label for="status" class="fw-semibold me-2">Filter Status:</label>
          <select
            v-model="statusFilter"
            @change="filterLaporan"
            class="form-select w-auto"
          >
            <option value="">Semua</option>
            <option value="PENDING">Pending</option>
            <option value="ON_PROCESS">On Process</option>
            <option value="MENUNGGU_TTD">Menunggu TTD</option>
            <option value="SELESAI">Selesai</option>
          </select>

          <label for="timeFilter" class="fw-semibold me-2">Filter Waktu:</label>
          <select
            v-model="timeFilter"
            @change="filterLaporan"
            class="form-select w-auto"
          >
            <option value="">Semua Waktu</option>
            <option value="bulanan">Laporan Bulanan</option>
            <option value="tahunan">Laporan Tahunan</option>
          </select>

          <button @click="confirmExport('pdf')" class="btn btn-primary">
           <i class="bi bi-file-earmark-pdf"></i>  Export PDF
          </button>
          <button @click="confirmExport('excel')" class="btn btn-success">
           <i class="bi bi-file-earmark-excel"></i> Export Excel
          </button>
        </div>

        <!-- Tabel Laporan -->
        <div class="table-responsive">
          <table class="table table-bordered table-striped">
            <thead class="table-light">
              <tr>
                <th>No</th>
                <th>NIK</th>
                <th>Nama Pemohon</th>
                <th>Alamat</th>
                <th>No HP</th>
                <th>Keperluan</th>
                <th>Tanggal Pengajuan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in filteredLaporan"
                :key="item.pengajuanid"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.nik }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.alamat }}</td>
                <td>{{ item.noHp }}</td>
                <td>{{ item.keperluan }}</td>
                <td>{{ formatTanggal(item.tanggalPengajuan) }}</td>
                <td>
                  <span
                    class="badge"
                    :class="getStatusClass(item.statusPengajuan)"
                    >{{ item.statusPengajuan }}</span
                  >
                </td>
              </tr>
              <tr v-if="filteredLaporan.length === 0">
                <td colspan="8" class="text-center">
                  Tidak ada data ditemukan
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination mt-3 d-flex justify-content-center">
            <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary me-2">
              Previous
            </button>
            <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary ms-2">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "@/store/authStore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import axios from "axios";

export default {
  name: "laporan-fo",
  setup() {
  const laporan = ref([]);
  const statusFilter = ref("");
  const timeFilter = ref("");
  const currentPage = ref(1);
  const itemsPerPage = ref(5); // Jumlah item per halaman
  const authStore = useAuthStore();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/pengajuan",
        {
          headers: {
            Authorization: `Bearer ${authStore.token}`,
          },
        }
      );
      laporan.value = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onMounted(fetchData);

  const filteredLaporan = computed(() => {
    let filtered = laporan.value;

    if (statusFilter.value) {
      filtered = filtered.filter(
        (item) => item.statusPengajuan === statusFilter.value
      );
    }

    if (timeFilter.value === "bulanan") {
      const currentMonth = new Date().getMonth() + 1;
      filtered = filtered.filter(
        (item) =>
          new Date(item.tanggalPengajuan).getMonth() + 1 === currentMonth
      );
    } else if (timeFilter.value === "tahunan") {
      const currentYear = new Date().getFullYear();
      filtered = filtered.filter(
        (item) =>
          new Date(item.tanggalPengajuan).getFullYear() === currentYear
      );
    }

    return filtered;
  });

  const totalPages = computed(() =>
    Math.ceil(filteredLaporan.value.length / itemsPerPage.value)
  );

  const paginatedLaporan = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    return filteredLaporan.value.slice(start, start + itemsPerPage.value);
  });

  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++;
  }

  function prevPage() {
    if (currentPage.value > 1) currentPage.value--;
  }

  const confirmExport = (type) => {
    const status = statusFilter.value || "Semua";
    const time =
      timeFilter.value === "bulanan"
        ? "bulanan"
        : timeFilter.value === "tahunan"
        ? "tahunan"
        : "semua waktu";
    if (
      confirm(
        `Apakah anda ingin mencetak laporan dengan status "${status}", jangka "${time}"?`
      )
    ) {
      if (type === "pdf") exportPDF();
      else if (type === "excel") exportExcel();
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Pengajuan Administrasi", 14, 10);
    autoTable(doc, {
      head: [
        [
          "No",
          "NIK",
          "Nama Pemohon",
          "Alamat",
          "No HP",
          "Keperluan",
          "Tanggal Pengajuan",
          "Status",
        ],
      ],
      body: filteredLaporan.value.map((item, index) => [
        index + 1,
        item.nik,
        item.nama,
        item.alamat,
        item.noHp,
        item.keperluan,
        formatTanggal(item.tanggalPengajuan),
        item.statusPengajuan,
      ]),
    });
    doc.save("Laporan_Surat.pdf");
  };

  const exportExcel = () => {
    const header = [
      "No",
      "NIK",
      "Nama Pemohon",
      "Alamat",
      "No HP",
      "Keperluan",
      "Tanggal Pengajuan",
      "Status",
    ];

    const data = filteredLaporan.value.map((item, index) => [
      index + 1,
      item.nik,
      item.nama,
      item.alamat,
      item.noHp,
      item.keperluan,
      formatTanggall(item.tanggalPengajuan),
      item.statusPengajuan,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet([
      ["Laporan Pengajuan Administrasi"],
      [],
      header,
      ...data,
    ]);

    worksheet["!cols"] = [
      { wch: 5 },
      { wch: 15 },
      { wch: 20 },
      { wch: 30 },
      { wch: 15 },
      { wch: 25 },
      { wch: 15 },
      { wch: 15 },
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan");
    XLSX.writeFile(workbook, "Laporan_Surat.xlsx");
  };

  const formatTanggal = (tanggalPengajuan) => {
    if (!tanggalPengajuan) return "";
    const date = new Date(tanggalPengajuan);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const formatTanggall = (tanggalPengajuan) => {
    if (!tanggalPengajuan) return "";
    return new Date(tanggalPengajuan).toISOString().split("T")[0];
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-secondary";
      case "ON_PROCESS":
        return "bg-warning text-dark";
      case "MENUNGGU_TTD":
        return "bg-info text-dark";
      case "SELESAI":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  return {
    laporan,
    statusFilter,
    timeFilter,
    filteredLaporan,
    paginatedLaporan,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    confirmExport,
    getStatusClass,
    formatTanggal,
  };
}
}
</script>

<style scoped>
.gap-3 {
  gap: 1rem;
}
</style>

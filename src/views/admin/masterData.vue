<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import * as XLSX from "xlsx";
import formMasterData from "@/views/admin/formMasterData.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = "http://localhost:3000/api/user";
const users = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const searchQuery = ref("");
const authStore = useAuthStore();

// Pagination State
const currentPage = ref(1);
const itemsPerPage = 10;

const selectedItem = reactive({
  userid: null,
  nik: "",
  nama: "",
  jenisKelamin: "",
  tanggalLahir: "",
  email: "",
  alamat: "",
  pendidikan: "",
  pekerjaan: "",
  agama: "",
  perkawinan: "",
  statusHidup: "",
});

const isEdit = ref(false);

async function fetchUsers() {
  isLoading.value = true;
  try {
    const response = await axios.get(BASE_URL, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSubmit(user) {
  isLoading.value = true;
  try {
    if (isEdit.value) {
      await axios.patch(`${BASE_URL}/${user.userid}`, user, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    } else {
      await axios.post(BASE_URL, user, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    }
    await fetchUsers();
    alert(isEdit.value ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!");
    closeForm();
  } catch {
    isLoading.value = false;
    closeForm();
  }
}

// Fungsi Export ke Excel
function exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(users.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Master Data");
  XLSX.writeFile(workbook, "master_data.xlsx");
}

async function deleteUser(userid) {
  if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
  isLoading.value = true;
  try {
    await axios.delete(`${BASE_URL}/${userid}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    users.value = users.value.filter((user) => user.userid !== userid);
    alert("User berhasil dihapus.");
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Terjadi kesalahan saat menghapus user.");
  } finally {
    isLoading.value = false;
  }
}

const formatTanggal = (tanggalLahir) => {
  if (!tanggalLahir) return "";
  return new Date(tanggalLahir).toISOString().split("T")[0];
};

// Filter Data berdasarkan Pencarian
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Hitung Total Halaman
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

// Data yang Ditampilkan pada Halaman Aktif
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

// Navigasi Halaman
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function showAddForm() {
  Object.assign(selectedItem, {
    userid: null,
    nik: "",
    nama: "",
    jenisKelamin: "",
    tanggalLahir: new Date().toISOString().slice(0, 10),
    email: "",
    alamat: "",
    pendidikan: "",
    pekerjaan: "",
    agama: "",
    perkawinan: "",
    statusHidup: "",
  });
  isEdit.value = false;
  showForm.value = true;
}

function editUser(user) {
  Object.assign(selectedItem, user);
  isEdit.value = true;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  isEdit.value = false;
}

onMounted(fetchUsers);
</script>

<template>
  <div class="master-data-container">
    <div class="card shadow-sm rounded-lg">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h2 class="text-xl font-weight-bold mb-0">Master Data</h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari ..."
          class="search-input"
        />
        <div>
          <button @click="showAddForm" class="btn btn-primary me-2"><i class="bi bi-clipboard-data"></i> Tambah Item</button>
          <button @click="exportToExcel" class="btn btn-success"><i class="bi bi-file-earmark-spreadsheet"></i> Export</button>
        </div>
      </div>

      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4">Loading...</div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead>
              <tr>
                <th>NIK</th>
                <th>Nama</th>
                <th>Jenis Kelamin</th>
                <th>Tanggal Lahir</th>
                <th>Email</th>
                <th>Alamat</th>
                <th>Pendidikan</th>
                <th>Pekerjaan</th>
                <th>Agama</th>
                <th>Perkawinan</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.userid">
                <td>{{ user.nik }}</td>
                <td>{{ user.nama }}</td>
                <td>{{ user.jenisKelamin }}</td>
                <td>{{ formatTanggal(user.tanggalLahir) }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.alamat }}</td>
                <td>{{ user.pendidikan }}</td>
                <td>{{ user.pekerjaan }}</td>
                <td>{{ user.agama }}</td>
                <td>{{ user.perkawinan }}</td>
                <td>{{ user.statusHidup }}</td>
                <td>
                  <button @click="editUser(user)" class="btn btn-warning btn-sm"><i class="bi bi-pencil-square"></i> Edit</button>
                  <button @click="deleteUser(user.userid)" class="btn btn-danger btn-sm ms-2">
                    <i class="bi bi-trash-fill"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <!-- Navigasi Pagination -->
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

    <ModalApp v-model:visible="showForm">
      <formMasterData 
      :item="selectedItem" 
      :isEdit="isEdit" 
      @submit="handleSubmit" 
      @cancel="closeForm" />
    </ModalApp>
  </div>
</template>

<style scoped>
.search-input {
  padding: 8px;
  border-radius: 5px;
  max-width: 300px;
}

/* Mengatur tampilan dasar tabel */
.table {
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
}

/* Mengatur tinggi baris tabel agar tidak terlalu tinggi */
.table td,
.table th {
  padding: 8px 10px; /* Mengurangi padding agar lebih proporsional */
  vertical-align: middle; /* Menjaga teks tetap sejajar */
  font-size: 14px; /* Menyesuaikan ukuran font */
  border-bottom: 1px solid #dee2e6; /* Garis bawah antar baris */
}

/* Membatasi tinggi tabel agar tidak terlalu tinggi */
.table-responsive {
  max-height: 500px; /* Membatasi tinggi maksimum tabel */
  overflow-y: auto; /* Menambahkan scroll jika konten terlalu panjang */
}

/* Memberikan tampilan header tabel yang lebih jelas */
.table thead th {
  background-color: #f8f9fa;
  border-bottom: 2px solid #000;
  text-transform: uppercase;
  font-weight: bold;
}

/* Efek hover pada baris tabel */
.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.1);
  transition: background-color 0.2s ease;
}

/* Menambahkan garis vertikal antar kolom */
.table td,
.table th {
  border-right: 1px solid #ddd;
}

/* Menghapus garis vertikal pada kolom terakhir */
.table td:last-child,
.table th:last-child {
  border-right: none;
}

/* Mengatur card container */
.master-data-container {
  background-color: #f4f6f9;
  padding: 20px;
}

/* Mengatur tampilan card */
.card {
  border: none;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

/* Mengatur tampilan header card */
.card-header {
  background-color: #e7e7fa;
  color: white;
  padding: 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Input pencarian */
.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

/* Mengatur tampilan tombol */
.btn-group .btn {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 5px 10px;
}

/* Warna badge */
.badge {
  font-size: 0.8em;
  padding: 0.4em 0.6em;
}

.badge.bg-warning {
  background-color: #ffc107 !important;
}

/* Responsif: Menyembunyikan kolom tertentu di layar kecil */
@media (max-width: 768px) {
  .table th:nth-child(5),
  .table td:nth-child(5),
  .table th:nth-child(6),
  .table td:nth-child(6),
  .table th:nth-child(7),
  .table td:nth-child(7) {
    display: none;
  }

  .btn-group {
    flex-direction: column;
    gap: 0.5rem;
  }

  .btn-group .btn {
    width: 100%;
  }
}
</style>

<script setup>
import { ref, reactive, onMounted } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import formMasterData from "@/views/admin/formMasterData.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";

const BASE_URL = "http://localhost:3000/api/user";
const users = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const searchQuery = ref("");
const authStore = useAuthStore();

const selectedItem = reactive({
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
      await axios.patch(`${BASE_URL} ${user.userid}`, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    } else {
      await axios.post(BASE_URL, user, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    }
    await fetchUsers();
    alert(isEdit.value ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!");
  } catch {
    isLoading.value = false;
    closeForm();
  }
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
  return new Date(tanggalLahir).toISOString().split('T')[0]; // Hanya ambil bagian YYYY-MM-DD
};

function showAddForm() {
  Object.assign(selectedItem, {
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
  Object.assign(selectedItem, {
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
}

onMounted(fetchUsers);
</script>

<template>
  <div class="master-data-container">
    <!-- Header dan Tombol Tambah -->
    <div class="card shadow-sm rounded-lg">
      <div
        class="card-header text-white p-4 d-flex justify-content-between align-items-center"
      >
        <h2 class="text-xl font-weight-bold mb-0">Master Data </h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari ..."
          class="search-input"
        />
        <button
          @click="showAddForm"
          class="btn btn-light d-flex align-items-center"
        >
          <i class="bi bi-clipboard2-plus me-2"></i> Tambah Item
        </button>
      </div>

      <!-- Tabel Data -->
      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4">
          <span>Loading...</span>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-light">
              <tr>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  NIK
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Nama
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Jenis Kelamin
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Tanggal Lahir
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Email
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Alamat
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Pendidikan
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Pekerjaan
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Agama
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Perkawinan
                </th>
                <th class="py-3 px-4 text-muted text-uppercase font-weight-bold">
                  Status
                </th>
                <th
                  class="py-3 px-4 text-muted text-uppercase font-weight-bold text-center"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.userid">
                <td class="py-3 px-4 font-weight-bold">{{ user.nik }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.nama }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.jenisKelamin }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ formatTanggal(user.tanggalLahir) }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.email }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.alamat }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.pendidikan }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.pekerjaan }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.agama }}</td>
                <td class="py-3 px-4 font-weight-bold">{{ user.perkawinan }}</td>
                <td class="py-3 px-4 font-weight-bold text-primary">
                  {{ user.statusHidup }}
                </td>
                <td class="py-3 px-4 text-center">
                  <div class="btn-group" role="group">
                    <button
                      @click="editUser(user)"
                      class="btn btn-outline-warning btn-sm me-2"
                    >
                      <i class="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      @click="deleteUser(user)"
                      class="btn btn-outline-danger btn-sm"
                    >
                      <i class="bi bi-trash3"></i> Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <ModalApp v-model:visible="showForm">
      <formMasterData
        :user="selectedItem"
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </ModalApp>
  </div>
</template>

<style scoped>
/* Mengatur tampilan dasar tabel */
.table {
  table-layout: auto;
  width: 100%;
  border-collapse: collapse;
}

/* Mengatur tinggi baris tabel agar tidak terlalu tinggi */
.table td, .table th {
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
.table td, .table th {
  border-right: 1px solid #ddd;
}

/* Menghapus garis vertikal pada kolom terakhir */
.table td:last-child, .table th:last-child {
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

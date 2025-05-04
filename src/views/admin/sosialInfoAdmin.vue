<script setup>
import { ref, reactive, onMounted, computed } from "vue";
import ModalApp from "@/views/ModalApp.vue";
import formSosial from "@/views/admin/formSosial.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const BASE_URL = "http://localhost:3000/api/sosial";
const users = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const searchQuery = ref("");
const authStore = useAuthStore();

const selectedItem = reactive({
  nik: "",
  nama: "",
  alamat: "",
  jenisBantuan: "",
  usulSanggah: "",
});

const isEdit = ref(false);

// Pagination-related variables
const currentPage = ref(1);
const itemsPerPage = 10;

// Fetch data from the API
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

// Tambahan untuk mencegah klik ganda
const isSubmitting = ref(false);

//KECURIGAAN PUSAT ERROR NYA DI BLOK INI 
// Handle form submission (Add/Edit)
async function handleSubmit(user) {
  // Cegah pengiriman ganda
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  isLoading.value = true;

  try {
    const config = {
      headers: { Authorization: `Bearer ${authStore.token}` },
    };

    if (isEdit.value) {
      // Edit data
      await axios.put(`${BASE_URL}/${user.sosialid}`, user, config);
      alert("Data berhasil diperbarui!");
    } else {
      // Tambah data
      await axios.post(BASE_URL, user, config);
      alert("Data berhasil ditambahkan!");
    }

    // Perbarui daftar setelah perubahan
    await fetchUsers();
  } catch (error) {
    //alert("Terjadi kesalahan saat menyimpan data.");
  } finally {
    isLoading.value = false;
    isSubmitting.value = false;
    closeForm();
  }
}

// Handle delete user
async function deleteUser(sosialid) {
  if (!confirm("Apakah Anda yakin ingin menghapus user ini?")) return;
  isLoading.value = true;
  try {
    await axios.delete(`${BASE_URL}/${sosialid}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    users.value = users.value.filter((user) => user.sosialid !== sosialid);
    alert("User berhasil dihapus.");
  } catch (error) {
    console.error("Error deleting user:", error);
    alert("Terjadi kesalahan saat menghapus user.");
  } finally {
    isLoading.value = false;
  }
}

// Filter users based on search query
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

// Pagination logic
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

// Change page
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++;
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--;
}

function showAddForm() {
  Object.assign(selectedItem, {
    nik: "",
    nama: "",
    alamat: "",
    jenisBantuan: "",
    usulSanggah: "",
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

function exportToPDF() {
  const doc = new jsPDF();
  doc.text("Master Data Bantuan Sosial Desa Saguling", 14, 10);
  autoTable(doc, {
    head: [["NIK", "Nama", "Alamat", "Jenis Bantuan", "Status Kelayakan"]],
    body: users.value.map((user) => [
      user.nik,
      user.nama,
      user.alamat,
      user.jenisBantuan,
      user.usulSanggah,
    ]),
  });
  doc.save("Master_Data_Bansos.pdf");
}

function exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(users.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Master Data Sosial");
  XLSX.writeFile(workbook, "master-data-sosial.xlsx");
}

onMounted(fetchUsers);
</script>

<template>
  <div class="master-data-container">
    <div class="card shadow-sm rounded-lg">
      <div
        class="card-header text-white p-4 d-flex justify-content-between align-items-center"
      >
        <h2 class="text-xl font-weight-bold mb-0">Master Data Sosial</h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari ..."
          class="search-input"
        />
        <div class="action-buttons">
          <button
            @click="showAddForm"
            class="btn btn-light d-flex align-items-center mb-2"
          >
            <i class="bi bi-clipboard2-plus me-2"></i> Tambah Data
          </button>
          <button
            @click="exportToPDF"
            class="btn btn-danger d-flex align-items-center mb-2"
          >
            <i class="bi bi-file-earmark-pdf me-2"></i> Ekspor PDF
          </button>
          <button
            @click="exportToExcel"
            class="btn btn-success d-flex align-items-center"
          >
            <i class="bi bi-file-earmark-excel me-2"></i> Ekspor Excel
          </button>
        </div>
      </div>

      <div class="card-body p-0">
        <div v-if="isLoading" class="text-center py-4">
          <span>Loading...</span>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="bg-light">
              <tr>
                <th>NIK</th>
                <th>Nama</th>
                <th>Alamat</th>
                <th>Jenis Bantuan</th>
                <th>Status</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in paginatedUsers" :key="user.sosialid">
                <td>{{ user.nik }}</td>
                <td>{{ user.nama }}</td>
                <td>{{ user.alamat }}</td>
                <td>{{ user.jenisBantuan }}</td>
                <td>{{ user.usulSanggah }}</td>
                <td class="text-center">
                  <button
                    @click="editUser(user)"
                    class="btn btn-outline-warning btn-sm me-2"
                  >
                    <i class="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    @click="deleteUser(user.sosialid)"
                    class="btn btn-outline-danger btn-sm"
                  >
                    <i class="bi bi-trash3"></i> Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination mt-3 d-flex justify-content-center">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="btn btn-secondary me-2"
          >
            Previous
          </button>
          <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="btn btn-secondary ms-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <ModalApp v-model:visible="showForm">
      <formSosial
        :user="selectedItem"
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit($event)"
        @cancel="closeForm"
      />
    </ModalApp>
  </div>
</template>


<style scoped>
.master-data-container {
  background-color: #f4f6f9;
  padding: 20px;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.pagination {
  margin-top: 15px;
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
}

.pagination span {
  padding: 0 10px;
}
</style>

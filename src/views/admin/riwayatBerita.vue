<template>
  <div class="container">
    <h1 class="title">Riwayat Publish Berita</h1>
    <input
          type="text"
          v-model="searchQuery"
          placeholder="Cari ..."
          class="search-input"
        />
    <hr>
    <section class="articles">
      <article v-for="user in filteredUsers" :key="user.beritaid" class="article">
        <div class="article-wrapper">
          <figure>
            <img :src="`http://localhost:3000/uploads/${user.gambar}`" alt="Gambar Berita" />
          </figure>
          <div class="article-body">
            <h2 class="article-title">{{ user.judul }}</h2>
            <hr class="divider" />
            <p>{{ user.isiBerita }}</p>
            <button @click="editUser(user)" class="btn edit-btn">Edit</button>
            <button @click="confirmDeleteUser(user)" class="btn delete-btn">Delete</button>
          </div>
        </div>
      </article>
    </section>

    <ModalApp v-model:visible="showForm">
      <formRiwayatBerita
        :user="selectedItem"
        :item="selectedItem"
        :isEdit="isEdit"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </ModalApp>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted , computed} from "vue";
import ModalApp from "@/views/ModalApp.vue";
import formRiwayatBerita from "@/views/admin/formRiwayatBerita.vue";
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
const searchQuery = ref("");

const users = ref([]);
const isLoading = ref(false);
const showForm = ref(false);
const selectedItem = reactive({ judul: "", isiBerita: "", gambar: "" });
const isEdit = ref(false);
const authStore = useAuthStore();

async function fetchUsers() {
  try {
    isLoading.value = true;
    const response = await axios.get("http://localhost:3000/api/berita", {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    users.value = response.data;
  } catch (error) {
    console.error("Error fetching Berita:", error);
  } finally {
    isLoading.value = false;
  }
}

// Filter Data berdasarkan Pencarian
const filteredUsers = computed(() => {
  return users.value.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );
});

async function handleSubmit(user) {
  try {
    isLoading.value = true;
    if (isEdit.value) {
      await axios.patch(
        `http://localhost:3000/api/berita/${user.beritaid}`,
        user,
        {
          headers: { Authorization: `Bearer ${authStore.token}` },
        }
      );
    } else {
      await axios.post("http://localhost:3000/api/berita", user, {
        headers: { Authorization: `Bearer ${authStore.token}` },
      });
    }
    await fetchUsers();
    alert(
      isEdit.value ? "Data berhasil diperbarui!" : "Data berhasil ditambahkan!"
    );
  } catch (error) {
    console.error("Error saving user:", error);
  } finally {
    isLoading.value = false;
    closeForm();
  }
}

async function deleteUser(beritaid) {
  try {
    isLoading.value = true;
    await axios.delete(`http://localhost:3000/api/berita/${beritaid}`, {
      headers: { Authorization: `Bearer ${authStore.token}` },
    });
    users.value = users.value.filter((user) => user.beritaid !== beritaid);
    alert("Berita berhasil dihapus.");
  } catch (error) {
    console.error("Error deleting berita:", error);
    alert("Terjadi kesalahan saat menghapus berita.");
  } finally {
    isLoading.value = false;
  }
}

function editUser(user) {
  Object.assign(selectedItem, user);
  isEdit.value = true;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  isEdit.value = false;
  Object.assign(selectedItem, { judul: "", isiBerita: "", gambar: "" });
}

function confirmDeleteUser(user) {
  if (window.confirm(`Apakah Anda yakin ingin menghapus Berita |"${user.judul}"|?`)) {
    deleteUser(user.beritaid);
  }
}

onMounted(fetchUsers);
</script>

<style scoped>
.search-input {
  padding: 8px;
  border-radius: 5px;
  max-width: 300px;
  width: 500px;
}
.container {
  background-color: white;
  margin: 5px;
  border-radius: 10px;
  padding: 20px;
  width: 99%;
}

.title {
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

.articles {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.article {
  box-sizing: border-box;
}

.article-wrapper {
  
  height: 350px; /* Pastikan ukuran card tetap */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

figure {
  width: 100%;
}

figure img {
  width: 90%;
  height: auto;
}

.article-body {
  padding: 20px;
}

.article-title {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: bold;
  white-space: nowrap; /* Hindari wrap ke baris baru */
  overflow: hidden; /* Sembunyikan teks yang berlebih */
  text-overflow: ellipsis; /* Tambahkan titik-titik (...) jika teks terlalu panjang */
  width: 100%; /* Sesuaikan dengan lebar kontainer */
  display: block;
}


.divider {
  border: none;
  border-top: 1px solid #ccc;
  margin: 12px 0;
}

p {
  margin: 0 0 16px 0;
  max-height: 80px; /* Batasi tinggi maksimal */
  overflow-y: auto; /* Tambahkan scroll jika konten lebih panjang */
  white-space: normal; /* Izinkan wrap ke baris baru */
  text-overflow: ellipsis; /* Tambahkan titik-titik jika teks melebihi batas */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Batasi ke 3 baris */
  -webkit-box-orient: vertical;
}


.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 8px;
}

.edit-btn {
  background-color: #4caf50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}
</style>

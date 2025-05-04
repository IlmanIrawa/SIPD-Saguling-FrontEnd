<template>
  <div class="profile-container">
    <h2>Profil Pengguna</h2>
    <hr />

    <!-- Tampilkan data pengguna jika sudah dimuat -->
    <div v-if="user">
      <p><strong>NIK:</strong> {{ user.nik }}</p>
      <p><strong>Nama:</strong> {{ user.nama }}</p>
      <p><strong>Jenis Kelamin:</strong> {{ user.jenisKelamin }}</p>
      <p><strong>Tanggal Lahir:</strong> {{ formatDate(user.tanggalLahir) }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Alamat:</strong> {{ user.alamat }}</p>
      <p><strong>Pendidikan:</strong> {{ user.pendidikan }}</p>
      <p><strong>Pekerjaan:</strong> {{ user.pekerjaan }}</p>
      <p><strong>Agama:</strong> {{ user.agama }}</p>
      <p><strong>Status Perkawinan:</strong> {{ user.perkawinan }}</p>
    </div>

    <!-- Pesan loading jika data belum dimuat -->
    <div v-else>
      <p>Memuat data pengguna...</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';
import { useAuthStore } from '@/store/authStore';  // Mengimpor store untuk autentikasi
import axios from 'axios';

export default defineComponent({
  name: 'UserProfile',
  setup() {
    const userStore = useAuthStore();  // Mengakses store pengguna

    // Fungsi untuk mengambil profil pengguna
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/me', {
          headers: { Authorization: `Bearer ${userStore.token}` },  // Menggunakan token dari store
        });
        userStore.setUser(response.data);  // Menyimpan data pengguna ke store
      } catch (error) {
        console.error('Gagal memuat data user:', error);
      }
    };

    // Format tanggal lahir menjadi format Indonesia
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    };

    onMounted(fetchUserProfile);  // Memanggil fetchUserProfile saat komponen dimuat

    return {
      user: userStore.user,  // Mengakses data pengguna dari store
      formatDate,
    };
  },
});
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

p {
  line-height: 1.8;
}
</style>

<template>
  <div class="background-blur"></div>

  <header :class="{ 'scrolled': isScrolled }">
    <Header />
  </header>
<strong><h3>CEK PENERIMA MANFAAT DESA SAGULING</h3></strong>
<hr>
  <div class="container mt-4 p-4">
    <div class="row justify-content-center align-items-start g-4">
      <!-- Kiri: Card Search -->
      <div class="col-md-7">
        <div class="card shadow-lg p-4 text-center h-100">
          <img src="@/assets/img/serch.webp" alt="Search Illustration" class="illustration mb-3" />
          <h2 class="mb-2">Cek Bantuan Sosial</h2>
          <p class="text-muted">Masukkan NIK Anda untuk mengetahui status bantuan sosial.</p>

          <div class="input-group mb-4">
            <span class="input-group-text"><i class="fas fa-id-card"></i></span>
            <input
              v-model="nik"
              type="number"
              class="form-control"
              placeholder="Masukkan NIK Anda..."
              @keyup.enter="searchData"
            />
            <button class="btn btn-primary" @click="searchData" :disabled="isLoading">
              <span v-if="isLoading" class="spinner-border spinner-border-sm"></span>
              Cari
            </button>
          </div>
        </div>
      </div>

      <!-- Kanan: Petunjuk -->
      <div class="col-md-5">
        <div class="card p-4 shadow h-100">
          <h5>Petunjuk Pencarian :</h5>
          <ol class="small">
            <li>Masukkan NIK anda yang sesuai dan padan dengan DISDUKCAPIL</li>
            <li>Sesudah memasukan NIK pada kolom pencarian</li>
            <li>Detail PM (Penerima Manfaat) akan muncul beserta keterangan bantuan</li>
            <li>
              Jika kesalahan input NIK silahkan Ulangi
              <span class="btn btn-sm btn-primary"><i class="fas fa-sync-alt"></i></span>
              Lanjutkan sesuai petunjuk 
            </li>
            <li>Klik tombol CARI untuk menampilkan data</li>
          </ol>
          <p class="mt-2">
            <strong>Note:</strong> Sistem Cek Bansos Desa Saguling akan mencari Nama PM sesuai domisili wilayah Desa Saguling.
          </p>
        </div>
      </div>
    </div>

    <!-- Notifikasi Data Tidak Ditemukan -->
    <div v-if="showErrorModal" class="alert alert-danger text-center mt-4 animate__animated animate__shakeX">
      <p>{{ errorMessage }}</p>
      <button class="btn btn-secondary btn-sm" @click="closeErrorModal">Tutup</button>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content animate__animated animate__zoomIn">
      <h5 class="mb-3">Detail Penerima Bantuan</h5>
      <ul class="list-group list-group-flush">
        <i>
          <p>Berikut Detail data penerima bantuan sosial, jika merasa belum menerima dan terdapat kesalahan, silahkan komfirmasi ke Kantor Desa</p>
        </i>
        <hr />
        <li class="list-group-item"><strong>Nama:</strong> {{ dataPenerima.nama }}</li>
        <li class="list-group-item"><strong>Alamat:</strong> {{ dataPenerima.alamat }}</li>
        <li class="list-group-item"><strong>Jenis Bantuan:</strong> {{ dataPenerima.jenisBantuan }}</li>
        <li class="list-group-item"><strong>Status:</strong> {{ dataPenerima.usulSanggah }}</li>
      </ul>
      <button class="btn btn-danger btn-sm mt-3" @click="closeModal">Tutup</button>
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { ref } from "vue";
import { useUIStore } from "@/store/uiStore";
import axios from "axios";
import Header from "@/examples/PageLayout/header.vue";
import Footer from "@/examples/PageLayout/Footer.vue";

const uiStore = useUIStore();
uiStore.layout = "homeDesa";

const nik = ref("");
const dataPenerima = ref(null);
const showModal = ref(false);
const showErrorModal = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const searchData = async () => {
  if (!nik.value) {
    errorMessage.value = "Silakan masukkan NIK terlebih dahulu.";
    showErrorModal.value = true;
    return;
  }

  isLoading.value = true;
  showModal.value = false;
  showErrorModal.value = false;

  try {
    const response = await axios.get(`http://localhost:3000/api/sosial?nik=${nik.value}`);
    if (response.data.length > 0) {
      dataPenerima.value = response.data[0];
      showModal.value = true;
    } else {
      errorMessage.value = "Data tidak ditemukan / Bukan penerima bantuan.";
      showErrorModal.value = true;
    }
  } catch (error) {
    errorMessage.value = "Terjadi kesalahan saat mengambil data. Coba lagi nanti.";
    showErrorModal.value = true;
  } finally {
    isLoading.value = false;
  }
};

const closeModal = () => {
  showModal.value = false;
  nik.value = "";
};

const closeErrorModal = () => {
  showErrorModal.value = false;
};
</script>

<style>
/* Header */
header {
  position: fixed;
  top: 0;
  width: 100%;
  transition: background-color 0.3s ease-in-out;
  z-index: 1000;
}

header:not(.scrolled) {
  background-color: black;
}

header.scrolled {
  background-color: rgb(37, 37, 37);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

/* Background Blur */
.background-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: url('@/assets/img/bg-profile.jpg') no-repeat center center/cover;
  z-index: -1;
  filter: blur(40px);
}

/* Container */
.container {
  max-width: 1140px;
  position: relative;
  z-index: 1;
}

/* Card Styling */
.card {
  border-radius: 10px;
  backdrop-filter: blur(10px);
  background: rgb(236, 234, 234);
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Supaya sejajar */
.h-100 {
  height: 100%;
}

/* Ilustrasi */
.illustration {
  width: 150px;
  display: block;
  margin: 0 auto;
}

/* Modal Styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-content ul {
  list-style: none;
  padding: 0;
}

.modal-content .list-group-item {
  background: none;
  border: none;
  text-align: left;
  padding: 5px 0;
}
h3{
  text-align: center;
  padding-top: 120px;
}

/* Animasi */
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
</style>

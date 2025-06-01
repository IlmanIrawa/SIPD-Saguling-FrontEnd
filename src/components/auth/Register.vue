<script setup>
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useUIStore } from "@/store/uiStore";
import { register as registerService } from "@/services/authService";
import Swal from "sweetalert2";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";

const body = document.getElementsByTagName("body")[0];
const uiStore = useUIStore();

// State
const nik = ref("");
const nama = ref("");
const jenisKelamin = ref("");
const tanggalLahir = ref("");
const email = ref("");
const alamat = ref("");
const pendidikan = ref("");
const pekerjaan = ref("");
const agama = ref("");
const perkawinan = ref("");
const password = ref("");
const error = ref("");

// Lifecycle hooks
onBeforeMount(() => {
  uiStore.hideConfigButton = true;
  uiStore.showNavbar = false;
  uiStore.showSidenav = false;
  uiStore.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  uiStore.hideConfigButton = false;
  uiStore.showNavbar = true;
  uiStore.showSidenav = true;
  uiStore.showFooter = true;
  body.classList.add("bg-gray-100");
});

// Methods
const register = async () => {
  error.value = "";

  const parsedNik = parseInt(nik.value, 10);

  if (isNaN(parsedNik)) {
    Swal.fire({
      icon: "warning",
      title: "NIK Tidak Valid",
      text: "NIK harus berupa angka.",
    });
    return;
  }

  try {
    const response = await registerService(
      parsedNik,
      nama.value,
      jenisKelamin.value,
      tanggalLahir.value,
      email.value,
      alamat.value,
      pendidikan.value,
      pekerjaan.value,
      agama.value,
      perkawinan.value,
      password.value
    );
    console.log("Registration successful:", response);

    await Swal.fire({
      icon: "success",
      title: "Registrasi Berhasil!",
      text: "Akun Anda telah berhasil dibuat.",
      confirmButtonText: "OK",
    });

    //window.location.href = "/Login";

    // Reset form
    nik.value = "";
    nama.value = "";
    jenisKelamin.value = "";
    tanggalLahir.value = "";
    email.value = "";
    alamat.value = "";
    pendidikan.value = "";
    pekerjaan.value = "";
    agama.value = "";
    perkawinan.value = "";
    password.value = "";
  } catch (e) {
    error.value =
      e.response?.data.message || e.message || "Terjadi kesalahan tidak terduga";
    console.error("Registration failed:", error.value);

    Swal.fire({
      icon: "error",
      title: "Registrasi Gagal",
      text: error.value,
    });
  }
};
</script>

<template>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Pemerintah Desa Saguling : Kp. Dengkeng Desa Saguling Kecamatan Saguling Kabupaten Bandung Barat
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Registrasi</h5>
            </div>

            <div class="card-body">
              <form @submit.prevent="register">
                <ArgonInput v-model="nik" type="number" placeholder="NIK" />
                <ArgonInput v-model="nama" type="text" placeholder="Nama" />
                <ArgonInput v-model="jenisKelamin" type="text" placeholder="Jenis Kelamin" />
                <ArgonInput v-model="tanggalLahir" type="date" placeholder="Tanggal Lahir" />
                <ArgonInput v-model="email" type="email" placeholder="Email" />
                <ArgonInput v-model="alamat" type="text" placeholder="Alamat" />
                <ArgonInput v-model="pendidikan" type="text" placeholder="Pendidikan" />
                <ArgonInput v-model="pekerjaan" type="text" placeholder="Pekerjaan" />
                <ArgonInput v-model="agama" type="text" placeholder="Agama" />
                <ArgonInput v-model="perkawinan" type="text" placeholder="Status Perkawinan" />
                <ArgonInput v-model="password" type="password" placeholder="Password" />

                <div class="text-center">
                  <ArgonButton type="submit" color="primary" class="w-100 mt-4 mb-3">
                    Register
                  </ArgonButton>
                </div>
                <p class="text-sm mt-3 mb-0 text-center">
                  Sudah punya akun?
                  <a href="/Login" class="text-dark font-weight-bolder">Login</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.alert {
  margin-bottom: 1rem;
}
</style>

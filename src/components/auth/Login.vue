<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Login</h4>
                  <p class="mb-0">Masukkan NIK dan Password untuk Login</p>
                </div>
                <div class="card-body">
                  <form @submit.prevent="login">
                    <div class="mb-3">
                      <argon-input
                        id="nik"
                        type="number"
                        placeholder="NIK"
                        v-model="nik"
                        size="lg"
                      />
                    </div>
                    <div class="mb-3">
                      <argon-input
                        id="password"
                        type="password"
                        placeholder="Password"
                        v-model="password"
                        size="lg"
                      />
                    </div>

                    <argon-switch id="rememberMe" name="remember-me">
                      Remember me
                    </argon-switch>

                    <div class="text-center">
                      <argon-button
                        class="mt-4"
                        variant="gradient"
                        color="success"
                        fullWidth
                        size="lg"
                        type="submit"
                      >
                        Sign in
                      </argon-button>
                    </div>

                    <div v-if="error" class="text-danger text-center mt-2">
                      {{ error }}
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a
                      href="/Register"
                      class="text-success text-gradient font-weight-bold"
                      >Registrasi</a
                    >
                  </p>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <a
                    href="/"
                    class="text-success text-gradient font-weight-bold"
                    ><i class="bi bi-houses-fill"></i> Back To Home</a
                  >
                </div>
              </div>
            </div>
            <div
              class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                style="
                  background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
                  background-size: cover;
                "
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">
                  "Desa Saguling"
                </h4>
                <p class="text-white position-relative">
                  Pelayanan Optimal Untuk Masyarakat Ceria
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onBeforeMount, ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { login as loginService } from "@/services/authService";
import { useUIStore } from "@/store/uiStore";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Swal from "sweetalert2";

const uiStore = useUIStore();
const authStore = useAuthStore();

const nik = ref("");
const password = ref("");
const error = ref("");

// Lifecycle Hooks
onBeforeMount(() => {
  uiStore.hideConfigButton = true;
  uiStore.showNavbar = false;
  uiStore.showSidenav = false;
  uiStore.showFooter = false;
  document.body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  uiStore.hideConfigButton = false;
  uiStore.showNavbar = true;
  uiStore.showSidenav = true;
  uiStore.showFooter = true;
  document.body.classList.add("bg-gray-100");
});

// Fungsi login
const login = async () => {
  if (!nik.value || !password.value) {
    error.value = "NIK dan Password tidak boleh kosong!";
    Swal.fire({
      icon: "warning",
      title: "Peringatan",
      text: error.value,
    }).then(() => {
      nik.value = "";
      password.value = "";
      error.value = "";
    });
    return;
  }

  try {
    const nikInt = parseInt(nik.value, 10);
    if (isNaN(nikInt)) {
      error.value = "NIK harus berupa angka!";
      Swal.fire({
        icon: "error",
        title: "Format NIK Salah",
        text: error.value,
      }).then(() => {
        nik.value = "";
        password.value = "";
        error.value = "";
      });
      return;
    }

    const { token, role} = await loginService(nikInt, password.value);

    authStore.setToken(token);
    authStore.setRole(role);
    authStore.setNik(nik.value); 
    localStorage.setItem("userRole", role);

    console.log("NIK disimpan:", authStore.nik);

    await Swal.fire({
      icon: "success",
      title: "Berhasil Login",
      text: `Selamat datang !`,
      timer: 2000,
      showConfirmButton: false,
    });

    if (role === "ADMIN") {
      window.location.href = "/admin";
    } else if (role === "USER") {
      window.location.href = "/user";
    } else if (role === "FO") {
      window.location.href = "/front";
    }
  } catch (err) {
    error.value = "Login gagal! Periksa NIK atau Password Anda.";
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: error.value,
    }).then(() => {
      nik.value = "";
      password.value = "";
      error.value = "";
    });
  }
};

</script>

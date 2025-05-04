<script setup>
import { useRoute } from "vue-router";
import { useUIStore } from "@/store/uiStore";
import SidenavItem from "./SidenavItem.vue";
import { ref, watch, onMounted } from "vue";

// Mengakses store UI 
const uiStore = useUIStore();
const route = useRoute();

// Role pengguna disimpan di localStorage
const userRole = ref(localStorage.getItem("userRole") || "guest");
const isModalVisible = ref(false);

// Watcher untuk sinkronisasi role di localStorage
watch(
  () => localStorage.getItem("userRole"),
  (newRole) => {
    userRole.value = newRole; // Perbarui role jika localStorage berubah
  }
);

// Perbarui role saat komponen di-mount
onMounted(() => {
  userRole.value = localStorage.getItem("userRole");
});

// Watcher untuk mengubah status sidebar saat modal terbuka
watch(isModalVisible, (newVal) => {
  uiStore.showSidenav = !newVal; // Mengupdate status sidebar di Pinia store
});

// Fungsi untuk mendapatkan route saat ini
const getRoute = () => route.name;
</script>

<template>
  <aside
    :class="[ 'sidebar', { 'sidebar-hidden': !uiStore.showSidenav, 'sidebar-inactive': isModalVisible } ]"
  >
    <div
      class="collapse navbar-collapse w-auto h-auto h-100"
      id="sidenav-collapse-main"
    >
      <ul class="navbar-nav">
        <!-- Menu untuk ADMIN -->
        <template v-if="userRole === 'ADMIN'">
          <li class="nav-item">
          <sidenav-item
            to="/admin"
            :class="getRoute() === 'dashboardWH' ? 'active' : ''"
            navText="Dashboard"
          >
            <template v-slot:icon
              ><i class="bi bi-house-door text-primary text-sm opacity-10"></i
            ></template>
          </sidenav-item>
        </li>
          <li class="nav-item">
            <sidenav-item
              to="/admin/master-data"
              :class="getRoute() === 'admin/master-data' ? 'active' : ''"
              navText="Master Data"
            >
              <template v-slot:icon
                ><i class="bi bi-clipboard-data text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/admin/unggah-berita"
              :class="getRoute() === 'admin/unggah-berita' ? 'active' : ''"
              navText="Unggah Berita"
            >
              <template v-slot:icon
                ><i class="bi bi-newspaper text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/admin/riwayat-berita"
              :class="getRoute() === 'admin/riwayat-berita' ? 'active' : ''"
              navText="Riwayat Berita"
            >
              <template v-slot:icon
                ><i class="bi bi-newspaper text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/admin/lapor-masuk"
              :class="getRoute() === 'admin/lapor-masuk' ? 'active' : ''"
              navText="Laporan Masuk"
            >
              <template v-slot:icon
                ><i class="bi bi-chat-square-text text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/admin/sosial-infoAdmin"
              :class="getRoute() === 'admin/sosial-infoAdmin' ? 'active' : ''"
              navText="Sosial "
            >
              <template v-slot:icon
                ><i class="bi bi-people-fill text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/admin/aset-desa"
              :class="getRoute() === 'admin/aset-desa' ? 'active' : ''"
              navText="Aset"
            >
              <template v-slot:icon
                ><i class="bi bi-gem text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
        </template>

        <!-- Menu Untuk Front Office -->
        <template v-if="userRole === 'FO'">
        <li class="nav-item">
          <sidenav-item
            to="/front"
            :class="getRoute() === 'dashboardWH' ? 'active' : ''"
            navText="Dashboard"
          >
            <template v-slot:icon
              ><i class="bi bi-house-door text-primary text-sm opacity-10"></i
            ></template>
          </sidenav-item>
        </li>
          <li class="nav-item">
            <sidenav-item
              to="/front/pengajuan-masuk"
              :class="getRoute() === 'admin/pengajuan-masuk' ? 'active' : ''"
              navText="Pengajuan Masuk"
            >
              <template v-slot:icon
                ><i class="bi bi-box-arrow-in-down text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/front/riwayat-pengajuan"
              :class="getRoute() === 'front/riwayat-pengajuan' ? 'active' : ''"
              navText="Riwayat Pengajuan"
            >
              <template v-slot:icon
                ><i class="bi bi-clipboard-check text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/front/laporan-fo"
              :class="getRoute() === 'front/laporan-fo' ? 'active' : ''"
              navText="Laporan"
            >
              <template v-slot:icon
                ><i class="bi bi-journal-arrow-down text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
        </template>

        <!-- Menu untuk User -->
        <template v-if="userRole === 'USER'">
          <li class="nav-item">
          <sidenav-item
            to="/user"
            :class="getRoute() === 'dashboardPH' ? 'active' : ''"
            navText="Dashboard"
          >
            <template v-slot:icon
              ><i class="bi bi-house-door text-primary text-sm opacity-10"></i
            ></template>
          </sidenav-item>
        </li>
          <li class="nav-item">
            <sidenav-item
              to="/user/profile"
              :class="getRoute() === 'user/profile' ? 'active' : ''"
              navText="Profile User"
            >
              <template v-slot:icon
                ><i class="bi bi-person-vcard text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/user/pengajuan-user"
              :class="getRoute() === 'user/pengajuan-user' ? 'active' : ''"
              navText="Pengajuan"
            >
              <template v-slot:icon
                ><i class="bi bi-envelope-arrow-up-fill text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/user/riwayat-pengajuan"
              :class="getRoute() === 'user/riwayat-pengajuan' ? 'active' : ''"
              navText="Tracking Pengajuan "
            >
              <template v-slot:icon
                ><i class="bi bi-arrow-counterclockwise text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/user/cetak"
              :class="getRoute() === 'user/cetak' ? 'active' : ''"
              navText="Bukti Pengajuan"
            >
              <template v-slot:icon
                ><i class="bi bi-printer text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          <li class="nav-item">
            <sidenav-item
              to="/user/lapor"
              :class="getRoute() === 'user/lapor' ? 'active' : ''"
              navText="Lapor"
            >
              <template v-slot:icon
                ><i class="bi bi-chat-square-text text-primary text-sm opacity-10"></i></template>
            </sidenav-item>
          </li>
          
        </template>
      </ul>
    </div>
  </aside>
</template>

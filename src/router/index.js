import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/auth/Login.vue";
import Register from "../components/auth/Register.vue";
import dashboardUser from "../views/user/dashboardUser.vue";
import AdminView from "../views/admin/AdminView.vue";
import UserView from "../views/user/UserView.vue";
import profileView from "../views/profileDesa/profileView.vue";
import FrontView from "../views/front/FrontView.vue";
import { useUIStore } from "@/store/uiStore";

const getUserRole = () => {
  return localStorage.getItem("role"); 
};

const routes = [
  {
    path: "/",
    component: () => import("../views/profileDesa/homeDesa.vue"),
    meta: { layout: "homeDesa" }, 
  },
  {
    path: "/homeDesa",
    component: () => import("../views/profileDesa/homeDesa.vue"),
    meta: { layout: "homeDesa" }, 
  },
  {
    path: "/cekBansos",
    component: () => import("../views/profileDesa/cekBansos.vue"),
    meta: { layout: "homeDesa" }, 
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },

  {
    path: "/homeDesa",
    component: profileView,
    meta: { layout: "homeDesa" },
    children: [
      { path: "/cekBansos", component: () => import("../views/profileDesa/cekBansos.vue") },
      { path: "/beritaDesa", component: () => import("../views/profileDesa/beritaDesa.vue") },
      { path: "/visiMisi", component: () => import("../views/profileDesa/visiMisi.vue") },
      { path: "/infografis", component: () => import("../views/profileDesa/infografisDesa.vue") },
    ],
  },
  // Define routes based on user role
  {
    path: "/admin",
    component: AdminView,
    meta: { requiresAuth: true, layout: "dashboard", role: "ADMIN" },
    children: [
      { path: "", component: () => import("../views/admin/dashboardAdmin.vue") },
      { path: "master-data", component: () => import("../views/admin/masterData.vue") },
      { path: "unggah-berita", component: () => import("../views/admin/unggahBerita.vue") },
      { path: "riwayat-berita", component: () => import("../views/admin/riwayatBerita.vue") },
      { path: "sosial-infoAdmin", component: () => import("../views/admin/sosialInfoAdmin.vue") },
      { path: "lapor-masuk", component: () => import("../views/admin/laporMasuk.vue") },
      { path: "aset-desa", component: () => import("../views/admin/asetDesa.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (getUserRole() === "ADMIN") next();
      else next("/login"); 
    },
  },
  {
    path: "/front",
    component: FrontView,
    meta: { requiresAuth: true, layout: "dashboard", role: "FO" },
    children: [
      { path: "", component: () => import("../views/front/dashboardFront.vue") },
      { path: "pengajuan-masuk", component: () => import("../views/front/pengajuanMasuk.vue") },
      { path: "riwayat-pengajuan", component: () => import("../views/front/riwayatPengajuan.vue") },
      { path: "laporan-fo", component: () => import("../views/front/laporanFo.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (getUserRole() === "FO") next();
      else next("/login"); 
    },
  },
  {
    path: "/user",
    component: UserView,
    meta: { requiresAuth: true, layout: "dashboard", role: "USER" },
    children: [
      { path: "", component: dashboardUser },
      { path: "profile", component: () => import("../views/user/profileUser.vue") },
      { path: "pengajuan-user", component: () => import("../views/user/pengajuanUser.vue") },
      { path: "riwayat-pengajuan", component: () => import("../views/user/riwayatPengajuan.vue") },
      { path: "berita-user", component: () => import("../views/user/beritaUser.vue") },
      { path: "bansos-info", component: () => import("../views/user/bansosInfo.vue") },
      { path: "cetak", component: () => import("../views/user/buktiPengajuan.vue") },
      { path: "lapor", component: () => import("../views/user/lapor.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (getUserRole() === "USER") next();
      else next("/login"); 
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem("auth"));
  const userRole = localStorage.getItem("role");

  // --- Tambahan untuk atur layout sebelum render ---
  const uiStore = useUIStore();
  uiStore.layout = to.meta.layout || "";  // ← penting agar layout langsung dikenali

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresAuth && to.meta.role && to.meta.role !== userRole) {
    alert("Silahkan Login Untuk Masuk Ke Halaman Ini.");
    next("/login");
  } else {
    next();
  }
});

export default router;

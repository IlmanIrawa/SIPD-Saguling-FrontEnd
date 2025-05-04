<template>
  <nav :class="['navbar', 'navbar-expand-lg', 'shadow-sm', 'p-3', {'bg-white': scrolled, 'bg-transparent': !scrolled}]">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="#">
        <img src="@/assets/img/logo2.png" alt="Logo" height="50" class="me-2 logo-img" />
        <div class="brand-text">
          <span class="fw-bold d-block">DESA SAGULING</span>
          <span class="d-block">BANDUNG BARAT</span>
        </div>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/visiMisi">Profile Desa</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/beritaDesa">Berita</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cekBansos">Cek Bansos</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      scrolled: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY > 50;
    }
  }
};
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease-in-out;
}

.bg-transparent {
  background-color: transparent !important;
}

.bg-white {
  background-color: rgb(211, 209, 209) !important;
}

/* Ukuran logo sedikit lebih kecil */
.logo-img {
  height: 50px;
}

/* Ukuran teks desa lebih kecil agar proporsional */
.brand-text span {
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
}

/* Warna teks berubah saat navbar di-scroll */
.bg-white .brand-text span {
  color: black;
}

/* Ukuran teks navigasi lebih nyaman */
.navbar-nav .nav-link {
  font-size: 1rem;
  font-weight: bold;
  color: white;
  margin: 10px;
}

.bg-white .nav-link {
  color: black !important;
}
</style>

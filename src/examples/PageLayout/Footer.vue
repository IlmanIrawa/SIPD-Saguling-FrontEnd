<template>
  <footer class="py-5 footer bg-light text-dark">
    <div class="container">
      <div class="row text-center">
        <!-- Logo Desa -->
        <div class="col-lg-12 mb-3">
          <img src="@/assets/img/logo2.png" alt="Logo Desa" class="logo-footer" />
          <h5 class="mt-2">Desa Saguling</h5>
          <p class="text-muted">Melayani masyarakat dengan sepenuh hati</p>
        </div>
      </div>
      
      <div class="row text-center">
        <div class="col-lg-12 mb-3">
          <a href="/profil-desa" class="text-secondary me-3">Profil Desa</a>
          <a href="/struktur-organisasi" class="text-secondary me-3">Struktur Organisasi</a>
          <a href="/layanan" class="text-secondary me-3">Layanan</a>
          <a href="/berita" class="text-secondary me-3">Berita</a>
          <a href="/kontak" class="text-secondary">Kontak</a>
        </div>
      </div>
      
      <div class="row text-center">
        <div class="col-lg-12 mb-3">
          <a href="#" class="text-secondary me-3">
            <span class="fab fa-facebook"></span>
          </a>
          <a href="#" class="text-secondary me-3">
            <span class="fab fa-instagram"></span>
          </a>
          <a href="#" class="text-secondary me-3">
            <span class="fab fa-twitter"></span>
          </a>
          <a href="#" class="text-secondary">
            <span class="fab fa-youtube"></span>
          </a>
        </div>
      </div>
      
      <div class="row text-center mt-3">
        <div class="col-lg-12">
          <p class="mb-0 text-secondary">
            Copyright © {{ new Date().getFullYear() }} Desa Saguling. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  background: #f8f9fa;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}

body, .app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
}

.logo-footer {
  width: 80px;
  height: auto;
}
.text-secondary {
  text-decoration: none;
}
.text-secondary:hover {
  color: #007bff;
}
</style>
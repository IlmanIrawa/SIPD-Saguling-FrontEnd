<template>
  <div class="card card-carousel overflow-hidden h-100 p-0">
    <div
      id="carouselExampleCaptions"
      class="carousel slide h-100"
      data-bs-ride="carousel"
    >
      <div class="carousel-inner border-radius-lg h-100">
        <div
          class="carousel-item h-100 active"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/wisata/Curug-Halimun.jpg') + ')',
            backgroundSize: 'cover',
          }"
        >
          <div
            class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5"
          >
            <div
              class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3"
            >
              <i class="ni ni-camera-compact text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Desa Saguling</h5>
            <p>
              Kantor Pemerintah Desa Saguling : Jalan Dengkeng Desa Saguling Kecamatan Saguling Kab. Bandung Barat 
            </p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/wisata/plta-saguling.jpg') + ')',
            backgroundSize: 'cover',
          }"
        >
          <div
            class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5"
          >
            <div
              class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3"
            >
              <i class="ni ni-bulb-61 text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Desa Saguling</h5>
            <p>
             Kantor Pemerintah Desa Saguling : Jalan Dengkeng Desa Saguling Kecamatan Saguling Kab. Bandung Barat 
            </p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/wisata/sanghyang-heuleut.jpg') + ')',
            backgroundSize: 'cover',
          }"
        >
          <div
            class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5"
          >
            <div
              class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3"
            >
              <i class="ni ni-trophy text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Desa Saguling</h5>
            <p>
              Kantor Pemerintah Desa Saguling : Jalan Dengkeng Desa Saguling Kecamatan Saguling Kab. Bandung Barat 
            </p>
          </div>
        </div>
        <div
          class="carousel-item h-100"
          :style="{
            backgroundImage:
              'url(' + require('@/assets/img/wisata/danau-saguling.jpg') + ')',
            backgroundSize: 'cover',
          }"
        >
          <div
            class="carousel-caption d-none d-md-block bottom-0 text-start start-0 ms-5"
          >
            <div
              class="icon icon-shape icon-sm bg-white text-center border-radius-md mb-3"
            >
              <i class="ni ni-trophy text-dark opacity-10"></i>
            </div>
            <h5 class="text-white mb-1">Desa Saguling</h5>
            <p>
              Kantor Pemerintah Desa Saguling : Jalan Dengkeng Desa Saguling Kecamatan Saguling Kab. Bandung Barat  
            </p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next w-5 me-3"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

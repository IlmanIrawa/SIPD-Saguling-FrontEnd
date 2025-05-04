<template>
<div class="container">
    <h2>WISATA ALAM DESA SAGULING</h2>
    <hr>
  <ul class="image-gallery">
    <li v-for="(item, index) in items" :key="index">
      <a href="#">
        <figure>
          <img :src="item.src" :alt="item.alt" />
          <figcaption>{{ item.caption }}</figcaption>
        </figure>
      </a>
    </li>
  </ul>
</div>
</template>

<script setup>
import curugHalimun from '@/assets/img/wisata/Curug-Halimun.jpg'
import danauSaguling from '@/assets/img/wisata/danau-saguling.jpg'
import pltaSaguling from '@/assets/img/wisata/plta-saguling.jpg'
import sanghyangHeuleut from '@/assets/img/wisata/sanghyang-heuleut.jpg'
import sanghyangKenit from '@/assets/img/wisata/sanghyang-kenit.jpg'
import cikahuripan from '@/assets/img/wisata/wisata-sungai-cikahuripan.jpg'

const items = [
  {
    src: curugHalimun,
    alt: 'Curug Halimun',
    caption: 'Curug Halimun',
  },
  {
    src: danauSaguling,
    alt: 'Danau Saguling',
    caption: 'Danau Saguling',
  },
  {
    src: pltaSaguling,
    alt: 'PLTA Saguling',
    caption: 'PLTA Saguling',
  },
  {
    src: sanghyangHeuleut,
    alt: 'Sanghyang Heuleut',
    caption: 'Sanghyang Heuleut',
  },
  {
    src: sanghyangKenit,
    alt: 'Sanghyang Kenit',
    caption: 'Sanghyang Kenit',
  },
  {
    src: cikahuripan,
    alt: 'Wisata Sungai Cikahuripan',
    caption: 'Wisata Sungai Cikahuripan',
  }
]
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Lato, sans-serif;
  margin: 0;
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(20, 20, 20, 1);
}

img {
  width: 100%;
  display: block;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  transition: transform 1000ms;
}

.image-gallery {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  max-width: 100%;
  width: 70rem;
  
}

figure {
  margin: 7px;
  position: relative;
  overflow: hidden;
  border-radius:10px;
}

figure::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  background: rgba(0, 0, 0, 0.5);
  transform-origin: center;
  opacity: 0;
  transform: scale(2);
  transition: opacity 300ms;
}

figcaption {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  place-items: center;
  text-align: center;
  padding: 1rem;
  color: white;
  font-size: 1.2rem;
  z-index: 1;
  opacity: 0;
  transition: opacity 600ms, transform 600ms;
}

a:is(:hover, :focus) figure::after {
  opacity: 1;
}

a:is(:hover, :focus) figcaption {
  opacity: 1;
  transition: opacity 600ms;
}

@media (prefers-reduced-motion: no-preference) {
  figcaption {
    transform: translate3d(0, 2rem, 0);
  }

  figure::after {
    border-radius: 50%;
    opacity: 1;
    transform: scale(0);
    transition: transform 900ms;
  }

  a:is(:hover, :focus) figure::after {
    transform: scale(2.5);
  }

  a:is(:hover, :focus) figcaption {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    transition: opacity 600ms 400ms, transform 600ms 400ms;
  }

  a:is(:hover, :focus) img {
    transform: scale(1.2);
  }
}
h2 {
  font-size: 2rem;
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
  background: linear-gradient(90deg, #2c3e50, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  padding-bottom: 0.5rem;
}

h2::after {
  content: "";
  display: block;
  width: 80px;
  height: 4px;
  margin: 0.5rem auto 0;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  border-radius: 2px;
}

</style>

<template>
  <header :class="{ 'scrolled': isScrolled }">
    <Header />
  </header>

  <div class="news-ticker">
  <div class="ticker-content">
    ⚠️ Peringatan: Akan ada pemadaman listrik di Dusun Cikaroya pada tanggal 15 April 2025.
    | 📢 Posyandu Balita akan dilaksanakan hari Minggu pukul 08.00 WIB di Balai RW 07.
    | 🎉 Selamat Hari Jadi Desa Saguling ke-79!
  </div>
</div>

  <strong><h3>BERITA DESA SAGULING</h3></strong>
  <hr />
<div class="search-bar" style="margin: 1rem 0; text-align: center;">
  <input v-model="searchQuery" type="text" placeholder="Cari berita..." style="padding: 8px; width: 250px; border-radius: 5px; border: 1px solid #ccc;">
  <button @click="searchNews" style="padding: 8px 12px; margin-left: 8px; border: none; border-radius: 5px; background-color: #007bff; color: white; cursor: pointer;">
    Cari
  </button>
</div>

  <div class="content-wrapper">
    <div v-for="(card, index) in paginatedNews" :key="index" class="news-card">
      <a :href="card.link" class="news-card__card-link"></a>
      <img :src="card.image" :alt="card.title" class="news-card__image" />
      <div class="news-card__text-wrapper">
        <h2 class="news-card__title" v-html="card.title"></h2>
        <div class="news-card__post-date">{{ card.date }}</div>
        <div class="news-card__details-wrapper">
          <p class="news-card__excerpt" v-html="card.excerpt"></p>
          <a :href="card.link" class="news-card__read-more">
            Read more <i class="fas fa-long-arrow-alt-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
    <span>Halaman {{ currentPage }} dari {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
  </div>

  <Footer />
</template>


<script setup>
import { ref, computed} from "vue";
import { useUIStore } from "@/store/uiStore";
import Header from "@/examples/PageLayout/header.vue";
import Footer from "@/examples/PageLayout/Footer.vue";

const uiStore = useUIStore();
uiStore.layout = "homeDesa";

const isScrolled = ref(false);
const itemsPerPage = 18;
const currentPage = ref(1); 

const newsCards = [
  {
    title: "Amazing First Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur…",
    link: "#"
  },
  {
    title: "Amazing Second Title that is Quite Long",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit…",
    link: "#"
  },
  {
    title: "Amazing Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae…",
    link: "#"
  },
  {
    title: "Amazing Forth Title that is Quite Long",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet!",
    link: "#"
  },
  {
    title: "Amazing Fifth Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio…",
    link: "#"
  },
  {
    title: "Amazing 6<sup>th</sup> Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia.",
    link: "#"
  },
   {
    title: "Amazing First Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur…",
    link: "#"
  },
  {
    title: "Amazing Second Title that is Quite Long",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit…",
    link: "#"
  },
  {
    title: "Amazing Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae…",
    link: "#"
  },
  {
    title: "Amazing Forth Title that is Quite Long",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet!",
    link: "#"
  },
  {
    title: "Amazing Fifth Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio…",
    link: "#"
  },
  {
    title: "Amazing 6<sup>th</sup> Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia.",
    link: "#"
  },
  {
    title: "Amazing First Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/127513/pexels-photo-127513.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur…",
    link: "#"
  },
  {
    title: "Amazing Second Title that is Quite Long",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/631954/pexels-photo-631954.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam obcaecati ex natus nulla rem sequi laborum quod fugit…",
    link: "#"
  },
  {
    title: "Amazing Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis beatae…",
    link: "#"
  },
  {
    title: "Amazing Forth Title that is Quite Long",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/248486/pexels-photo-248486.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet!",
    link: "#"
  },
  {
    title: "Amazing Fifth Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/206660/pexels-photo-206660.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio…",
    link: "#"
  },
  {
    title: "Amazing 6<sup>th</sup> Title",
    date: "Jan 29, 2018",
    image: "https://images.pexels.com/photos/210243/pexels-photo-210243.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    excerpt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia.",
    link: "#"
  }
];

// Jumlah halaman total
const totalPages = computed(() => Math.ceil(newsCards.length / itemsPerPage));


// Fungsi navigasi halaman
const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const searchQuery = ref("");

const filteredNews = computed(() => {
  if (!searchQuery.value) return newsCards;
  return newsCards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    card.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNews.value.slice(start, end);
});

function searchNews() {
  currentPage.value = 1; // Reset ke halaman pertama saat pencarian
}

</script>

<style scoped lang="scss">
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

$card-height-large-screen: 16rem;
$card-height-mobile: 10rem;

@mixin atLarge {
  @media (min-width: 900px) {
    @content;
  }
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: "Open Sans", sans-serif;
}

body {
  background-color: #555;
}

.content-wrapper {
  margin: 0 auto;
  margin-bottom: 20px;
  margin-left: 20px;
  margin-right: 20px;
  max-width: 2000px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
  padding-top: 40px;
}

.news-card {
  position: relative;
  height: $card-height-mobile;
  border-radius: 0.5rem;
  overflow: hidden;
  flex: 1 1 calc(100% / 2 - 1rem); // default mobile: 2 per baris
  max-width: calc(100% / 2 - 1rem);
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  @include atLarge {
    height: $card-height-large-screen;
    flex: 1 1 calc(100% / 6 - 1rem); // 6 per baris
    max-width: calc(100% / 6 - 1rem);
  }

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.7) 80%);
    z-index: 0;
  }

  &__card-link {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 3s ease;
    z-index: -1;
    position: relative;
  }

  &__text-wrapper {
    position: absolute;
    bottom: 0;
    padding: 0.6rem;
    color: white;
    transition: background-color 1.5s ease;
  }

  &__title {
    font-size: 0.85rem;
    margin-bottom: 0.3rem;
    transition: color 1s ease;
  }

  &__post-date {
    font-size: 0.6rem;
    margin-bottom: 0.3rem;
    color: #ccc;
  }

  &__details-wrapper {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 1.5s ease, opacity 1s ease;
  }

  &__excerpt {
    font-size: 0.8rem;
    font-weight: 300;
  }

  &__read-more {
    background: black;
    color: #bbb;
    display: block;
    padding: 0.3rem 0.5rem;
    border-radius: 0.3rem;
    margin-top: 0.5rem;
    border: 1px solid #444;
    font-size: 0.7rem;
    text-decoration: none;
    width: 6rem;
    margin-left: auto;
    position: relative;
    z-index: 5;

    i {
      position: relative;
      left: 0.2rem;
      color: #888;
      transition: left 0.5s ease, color 0.6s ease;
    }

    &:hover i {
      left: 0.5rem;
      color: yellow;
    }
  }

  @include atLarge {
    &:hover {
      .news-card__details-wrapper {
        max-height: $card-height-large-screen;
        opacity: 1;
      }

      .news-card__text-wrapper {
        background-color: rgba(0, 0, 0, 0.6);
      }

      .news-card__title {
        color: yellow;
      }

      .news-card__image {
        transform: scale(1.2);
        z-index: -1;
      }
    }
  }
}

h3 {
  padding-top: 40px;
  text-align: center;
}

.news-ticker {
  margin-top: 100px;
  width: 100%;
  overflow: hidden;
  background-color: #595be4;
  color: #333;
  border: 1px solid #ddd;
  padding: 8px 0;
  box-sizing: border-box;
  position: relative;
}

.ticker-content {
  display: inline-block;
  white-space: nowrap;
  padding-left: 100%;
  animation: scroll-left 20s linear infinite;
  font-weight: bold;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-weight: bold;
  color: white;

  button {
    background-color: #3a5fc7;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;
    font-weight: bold;

    &:disabled {
      background-color: #aaa;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 0.9rem;
  }
}
.search-bar input:focus {
  outline: none;
  border-color: #0056b3;
}

</style>

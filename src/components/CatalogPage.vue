<template>
  <div class="catalog-page">
    <div class="catalog-header">
      <h1>Каталог</h1>
      <input
        class="search-bar"
        v-model="searchQuery"
        type="text"
        placeholder="Пошук..."
      />
    </div>
    <div class="filter-section">
      <div class="tags-filter">
        <label>
          Сортування за тегом:
          <select v-model="sortByTag">
            <option value="">Усі товари</option>
            <option v-for="tag in availableTags" :key="tag" :value="tag">
              {{ tag }}
            </option>
          </select>
        </label>
      </div>
      <div class="price-filter">
        <label>
          Мінімальна ціна:
          <input
            type="number"
            v-model.number="minPrice"
            placeholder="Введіть мінімальну ціну"
          />
        </label>
        <label>
          Максимальна ціна:
          <input
            type="number"
            v-model.number="maxPrice"
            placeholder="Введіть максимальну ціну"
          />
        </label>
      </div>
    </div>
    <div class="catalog">
      <div
        v-for="product in sortedAndFilteredProducts"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.image" alt="Product Image" />
        <h2>{{ product.name }}</h2>
        <p>Ціна: {{ product.price }} грн</p>
        <p>Теги: {{ product.tags.join(", ") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CatalogPage",
  data() {
    return {
      searchQuery: "",
      selectedTags: [],
      sortByTag: "", // Сортування за тегом
      minPrice: null,
      maxPrice: null,
      // Доступні теги для сортування
      availableTags: ["Популярні", "Новинка", "Знижки"],
      products: [
        {
          id: 1,
          name: "Товар 1",
          image: require("@/assets/image/3.jpg"),
          price: 1500,
          tags: ["Новинка", "Знижки"],
        },
        {
          id: 2,
          name: "Товар 2",
          image: require("@/assets/image/6.jpg"),
          price: 1200,
          tags: ["Популярні"],
        },
        {
          id: 3,
          name: "Товар 3",
          image: require("@/assets/image/bar.jpg"),
          price: 800,
          tags: ["Новинка"],
        },

      ],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        const matchesTags = this.selectedTags.length
          ? this.selectedTags.some((tag) => product.tags.includes(tag))
          : true;

        const minPrice =
          this.minPrice !== null && this.minPrice !== ""
            ? parseFloat(this.minPrice)
            : null;
        const maxPrice =
          this.maxPrice !== null && this.maxPrice !== ""
            ? parseFloat(this.maxPrice)
            : null;

        const matchesPrice =
          (minPrice !== null ? product.price >= minPrice : true) &&
          (maxPrice !== null ? product.price <= maxPrice : true);

        return matchesSearch && matchesTags && matchesPrice;
      });
    },
    sortedAndFilteredProducts() {
      if (!this.sortByTag) {
        return this.filteredProducts;
      }
      return this.filteredProducts.filter((product) =>
        product.tags.includes(this.sortByTag)
      );
    },
  },
};
</script>

<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/background.jpg'); /* Фон */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
  color: white;
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-bar {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 200px;
}

.filter-section {
  margin-bottom: 20px;
}

.tags-filter {
  margin-bottom: 15px;
}

.tags-filter select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  font-size: 16px;
}

.price-filter {
  margin-top: 10px;
}

.price-filter label {
  display: block;
  margin-bottom: 10px;
}

.catalog {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}

.product-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: calc(33.33% - 20px);
  box-sizing: border-box;
}

.product-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.product-card h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.product-card p {
  color: black;
  font-size: 16px;
  margin-top: 10px;
}
</style>

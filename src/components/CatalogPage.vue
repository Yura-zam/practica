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
      <button @click="toggleCart" class="cart-button">
        Кошик ({{ cart.length }})
      </button>
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
        <button @click="addToCart(product)">Купити</button>
      </div>
    </div>

    <!-- Модальне вікно кошика -->
    <div v-if="isCartOpen" class="cart-modal">
      <div class="cart-content">
        <button class="close-button" @click="toggleCart">Закрити</button>
        <h2>Ваш кошик</h2>
        <div v-if="cart.length === 0">
          <p>Кошик порожній.</p>
        </div>
        <div v-else>
          <ul>
            <li v-for="item in cart" :key="item.id">
              {{ item.name }} - {{ item.price }} грн
              <button @click="removeFromCart(item)">Видалити</button>
            </li>
          </ul>
          <h3>Загальна сума: {{ totalPrice }} грн</h3>
          <button @click="processPayment">Оформити замовлення</button>
        </div>
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
      sortByTag: "",
      availableTags: ["Популярні", "Новинка", "Знижки"],
      products: [
        {
          id: 1,
          name: "Товар 1",
          image: require("@/assets/image/3.jpg"),
          price: 15000,
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
        {
          id: 4,
          name: "Товар 4",
          image: require("@/assets/image/brake cilin.png"),
          price: 800,
          tags: ["Новинка"],
        },
        {
          id: 5,
          name: "Товар 5",
          image: require("@/assets/image/brake disk.jpg"),
          price: 800,
          tags: ["Новинка", "Знижки"],
        },
      ],
      cart: [], // Товари в кошику
      isCartOpen: false, // Чи відкрите модальне вікно кошика
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        const matchesTags = this.sortByTag
          ? product.tags.includes(this.sortByTag)
          : true;

        return matchesSearch && matchesTags;
      });
    },
    sortedAndFilteredProducts() {
      return this.filteredProducts;
    },
    totalPrice() {
      return this.cart.reduce((sum, item) => sum + item.price, 0);
    },
  },
  methods: {
    addToCart(product) {
      this.cart.push(product);
    },
    removeFromCart(product) {
      this.cart = this.cart.filter((item) => item.id !== product.id);
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    },
    processPayment() {
      alert("Замовлення оформлено!");
      this.cart = [];
      this.isCartOpen = false;
    },
  },
};
</script>

<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding: 20px;
  color: white;
}

.product-card h2,
.product-card p {
  color: black;
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

.cart-button {
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.cart-button:hover {
  background-color: #e64a19;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: calc(33.33% - 20px);
}

.product-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.close-button {
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  float: right;
  cursor: pointer;
}


.close-button:hover {
  background: darkred;
}
</style>
<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  background-color: white;
  color: while;
  min-height: 100vh;
  padding: 20px;
}

.product-card h2,
.product-card p {
  color: black;
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

.cart-button {
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

.cart-button:hover {
  background-color: #e64a19;
}

.catalog {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product-card {
  background: rgba(255, 255, 255, 0.95);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  width: calc(33.33% - 20px);
}

.product-card img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.cart-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-content {
  background: white;
  color: black;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

.close-button {
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  float: right;
  cursor: pointer;
}

.close-button:hover {
  background: darkred;
}
</style>

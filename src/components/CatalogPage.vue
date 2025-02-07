<template>
  <div class="catalog">
    <header class="header">
      <div class="logo">Old Mans Wheel</div>
    </header>
    
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="ДЕТАЛЬ" />
      <select v-model="selectedTag" @change="filterByTag">
        <option value="">Всі теги</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <main class="catalog-grid">
      <div v-for="item in filteredItems" :key="item.id" class="catalog-item" @click="showDetails(item)">
        <div class="image">Картинка</div>
        <div class="title">{{ item.name }}</div>
        <button @click.stop="addToCart(item)">Додати до кошика</button>
      </div>
    </main>

    <div v-if="selectedItem" class="item-details">
      <h2>{{ selectedItem.name }}</h2>
      <p>Ціна: {{ selectedItem.price }}</p>
      <p>Опис: {{ selectedItem.description }}</p>
      <button @click="closeDetails">Закрити</button>
    </div>

    <footer class="footer">
      <div class="cart-icon" @click="toggleCart">🛒</div>
    </footer>

    <div v-if="showCart" class="cart">
      <h2>Кошик</h2>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <div>{{ item.name }}</div>
        <div>{{ item.price }}</div>
        <div>Кількість: {{ item.quantity }}</div>
      </div>
      <div class="total">
        <p>Загальна сума: {{ totalPrice }}</p>
      </div>
      <div class="payment-method">
        <label for="payment">Спосіб оплати:</label>
        <select id="payment" v-model="paymentMethod">
          <option value="credit-card">Кредитна картка</option>
          <option value="paypal">PayPal</option>
          <option value="cash">Готівка</option>
        </select>
      </div>
      <button @click="checkout">Оформити замовлення</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      selectedTag: '',
      selectedItem: null,
      showCart: false,
      paymentMethod: 'credit-card',
      cart: [],
      items: [
        { id: 1, name: 'Назва 1', price: '100 грн', description: 'Опис 1', tags: ['tag1', 'tag2'] },
        { id: 2, name: 'Назва 2', price: '200 грн', description: 'Опис 2', tags: ['tag2', 'tag3'] },
        { id: 3, name: 'Назва 3', price: '300 грн', description: 'Опис 3', tags: ['tag1'] },
        { id: 4, name: 'Назва 4', price: '400 грн', description: 'Опис 4', tags: ['tag3'] },
        { id: 5, name: 'Назва 5', price: '500 грн', description: 'Опис 5', tags: ['tag2'] },
        { id: 6, name: 'Назва 6', price: '600 грн', description: 'Опис 6', tags: ['tag1', 'tag3'] },
        { id: 7, name: 'Назва 7', price: '700 грн', description: 'Опис 7', tags: ['tag2'] },
        { id: 8, name: 'Назва 8', price: '800 грн', description: 'Опис 8', tags: ['tag1'] },
      ],
    };
  },
  computed: {
    filteredItems() {
      let items = this.items.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      if (this.selectedTag) {
        items = items.filter(item => item.tags.includes(this.selectedTag));
      }
      return items;
    },
    uniqueTags() {
      const tags = new Set();
      this.items.forEach(item => {
        item.tags.forEach(tag => tags.add(tag));
      });
      return Array.from(tags);
    },
    totalPrice() {
      return this.cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0) + ' грн';
    },
  },
  methods: {
    filterByTag() {
      console.log('Filtering by tag:', this.selectedTag);
    },
    showDetails(item) {
      this.selectedItem = item;
    },
    closeDetails() {
      this.selectedItem = null;
    },
    addToCart(item) {
      const cartItem = this.cart.find(cartItem => cartItem.id === item.id);
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    checkout() {
      alert(`Замовлення оформлено! Спосіб оплати: ${this.paymentMethod}`);
      this.cart = [];
      this.showCart = false;
    },
  },
};
</script>

<style scoped>
.catalog {
  font-family: Arial, sans-serif;
  color: #fff;
  background-color: #222;
  padding: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav button {
  margin: 0 5px;
  background-color: #444;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.nav button:hover {
  background-color: #666;
}

.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.search-bar input {
  padding: 5px;
  width: 200px;
  margin-right: 10px;
}

.search-bar select {
  padding: 5px;
  width: 150px;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.catalog-item {
  background-color: #333;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.catalog-item:hover {
  background-color: #555;
}

.image {
  background-color: #555;
  height: 100px;
  margin-bottom: 10px;
}

.title {
  font-size: 14px;
}

.item-details {
  background-color: #444;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  color: #fff;
}

.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.cart-icon {
  font-size: 20px;
  cursor: pointer;
}

.cart {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  position: fixed;
  top: 50px;
  right: 20px;
  width: 300px;
  max-height: 80vh;
  overflow-y: auto;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.total {
  margin-top: 20px;
  font-weight: bold;
}

.payment-method {
  margin-top: 20px;
}

button {
  background-color: #444;
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #666;
}
</style>
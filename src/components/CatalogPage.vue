<template>
  <div class="catalog">
    <div class="nav">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search for parts..." />
        <select v-model="selectedCategory">
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
        <button @click="search">Search</button>
      </div>
      <button @click="toggleCart">Кошик</button>
    </div>
    <div class="content">
      <div class="catalog-grid">
        <div v-for="product in filteredProducts" :key="product.id" class="catalog-item">
          <div class="image">
            <img :src="product.image" alt="Product Image" />
          </div>
          <div class="title">{{ product.name }}</div>
          <div class="item-details">
            <div class="price">{{ product.price }} USD</div>
            <button @click.stop="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showCart" class="modal" @click.self="toggleCart">
      <div class="modal-content">
        <span class="close" @click="toggleCart">&times;</span>
        <h2>Ваш кошик</h2>
        <div v-if="cartItems.length === 0">Ваш кошик порожній</div>
        <div v-else>
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-details">
              <span class="item-name">{{ item.name }}</span>
              <span class="item-price">{{ item.price }} USD</span>
              <span class="item-quantity">Кількість: {{ item.quantity }}</span>
            </div>
          </div>
          <div class="total">
            Всього: {{ total }} USD
          </div>
          <button @click="checkout">Оформити замовлення</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
      categories: [],
      searchQuery: '',
      selectedCategory: '',
      showCart: false,
      cartItems: [],
    };
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        return (
          (this.selectedCategory === '' || product.category_id === this.selectedCategory) &&
          (this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      });
    },
    total() {
      return this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
  async created() {
    try {
      const productsResponse = await fetch('http://localhost:8080/api/products');
      const productsData = await productsResponse.json();
      this.products = productsData;

      const categoriesResponse = await fetch('http://localhost:8080/api/categories');
      const categoriesData = await categoriesResponse.json();
      this.categories = categoriesData;

      this.fetchCartItems();
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  },
  methods: {
    async addToCart(product) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to add items to the cart.');
          this.$router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:8080/api/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: product.id, quantity: 1 }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Product added to cart');
          this.fetchCartItems();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error adding to cart:', err);
      }
    },
    async fetchCartItems() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await fetch('http://localhost:8080/api/carts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          this.cartItems = data;
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    },
    checkout() {
      alert('Checkout functionality is not implemented yet.');
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    search() {
      // Реалізація пошуку
      this.filteredProducts = this.products.filter(product => {
        return (
          (this.selectedCategory === '' || product.category_id === this.selectedCategory) &&
          (this.searchQuery === '' || product.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
        );
      });
    },
  },
};
</script>

<style scoped>
.catalog {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: url('@/assets/background.jpg') no-repeat center center;
  background-size: cover;
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f4f4f4;
}

.nav .search-bar {
  display: flex;
  align-items: center;
}

.nav .search-bar input,
.nav .search-bar select {
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.nav button {
  padding: 0.5rem 1rem;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
}

.nav button:hover {
  background-color: #555;
}

.content {
  flex: 1;
  padding: 2rem;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.catalog-item {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.catalog-item:hover {
  transform: scale(1.05);
}

.image img {
  max-width: 100%;
  height: auto;
}

.title {
  font-size: 1.2rem;
  margin: 0.5rem 0;
}

.item-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.price {
  font-size: 1rem;
  color: #333;
}

button {
  padding: 0.5rem 1rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  text-align: center;
}

.modal-content img {
  max-width: 100%;
  height: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.total {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
}
</style>
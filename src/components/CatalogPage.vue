<template>
  <div class="catalog">
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search for parts..." />
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <button @click="search">Search</button>
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
            <button @click="addToCart(product.id)">Add to Cart</button>
          </div>
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
  },
  async created() {
    try {
      const productsResponse = await fetch('http://localhost:8080/api/products');
      const productsData = await productsResponse.json();
      if (productsResponse.ok) {
        this.products = productsData;
      } else {
        alert(productsData.message);
      }

      const categoriesResponse = await fetch('http://localhost:8080/api/categories');
      const categoriesData = await categoriesResponse.json();
      if (categoriesResponse.ok) {
        this.categories = categoriesData;
      } else {
        alert(categoriesData.message);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  },
  methods: {
    goToPage(page) {
      this.$router.push(`/${page}`);
    },
    async addToCart(productId) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('Please log in to add items to the cart.');
          this.$router.push('/login');
          return;
        }

        const response = await fetch('http://localhost:8080/api/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product_id: productId, quantity: 1 }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Product added to cart');
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error adding to cart:', err);
      }
    },
    search() {
      // This method is intentionally left empty as the filtering is handled by the computed property
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

.nav button {
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #444;
  color: white;
  border: none;
  cursor: pointer;
}

.nav button:hover {
  background-color: #555;
}

.search-bar {
  display: flex;
  justify-content: center;
  padding: 1rem;
  background-color: #f4f4f4;
}

.search-bar input,
.search-bar select {
  margin-right: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
</style>
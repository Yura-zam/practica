<template>
  <div class="user-page">
    <!-- Заголовок профілю -->
    <div class="profile-header">
      <div class="avatar">
        <img src="@/assets/User.png" alt="Аватар" class="avatar-img" />
      </div>
      <div class="username">нікнейм</div>
    </div>

    <!-- Головний контент: Кошик та Історія -->
    <div class="main-content">
      <!-- Кошик -->
      <div class="basket">
        <h2>кошик</h2>
        <div v-for="item in basketItems" :key="item.id" class="item">
          <img src="@/assets/image/vtulka.jpg" alt="картинка" class="item-image" />
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
            <div class="quantity-control">
              <button @click="decreaseQuantity(item.id)">-</button>
              <input type="number" v-model="item.quantity" min="1" />
              <button @click="increaseQuantity(item.id)">+</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Історія -->
      <div class="history">
        <h2>історія</h2>
        <div v-for="item in historyItems" :key="item.id" class="item">
          <img src="@/assets/image/vtulka.jpg" alt="картинка" class="item-image" />
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
            <span class="item-quantity">Кількість: {{ item.quantity }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Особисті дані -->
    <div class="personal-data">
      <h3>особисті дані</h3>
      <p>контакти: +380991111111</p>
      <p>адреса доставки: ебенград дім 4</p>
      <p>пошта: EBENGRAT@gmail.com</p>
      <button @click="editProfile">редагувати</button>
    </div>

    <!-- Вихід -->
    <button @click="logout" class="logout">вихід</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basketItems: [
        { id: 1, name: "Товар 1", price: "11200 грн", quantity: 1 },
        { id: 2, name: "Товар 2", price: "21500 грн", quantity: 1 },
      ],
      historyItems: [
        { id: 1, name: "Товар 1", price: "11200 грн", quantity: 1 },
        { id: 2, name: "Товар 2", price: "21500 грн", quantity: 1 },
      ],
    };
  },
  methods: {
    increaseQuantity(id) {
      const item = this.basketItems.find(item => item.id === id);
      if (item) item.quantity++;
    },
    decreaseQuantity(id) {
      const item = this.basketItems.find(item => item.id === id);
      if (item && item.quantity > 1) item.quantity--;
    },
    editProfile() {
      // Логіка редагування профілю
    },
    logout() {
      // Логіка виходу з системи
    },
  },
};
</script>


  
<style scoped>
/* Стиль для всієї сторінки */
.user-page {
  position: relative;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-image: url('@/assets/background.jpg'); /* Додати фонове зображення */
  background-size: cover;
  background-position: center;
  padding-bottom: 50px; /* Простір для футера */
}

/* Білий блок за текстом */
.main-content, .personal-data, .profile-header {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Заголовок профілю */
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.avatar-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.username {
  font-size: 24px;
  margin-left: 10px;
}

/* Основний контент: кошик і історія */
.main-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.basket, .history {
  width: 48%;
}

.basket h2, .history h2 {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.item-details {
  flex-grow: 1;
}

.item-name {
  font-weight: bold;
}

.item-price {
  margin-top: 5px;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-control button {
  margin: 0 5px;
}

.personal-data {
  margin-top: 20px;
}

.personal-data h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.personal-data p {
  margin: 5px 0;
}

.logout {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}
</style>

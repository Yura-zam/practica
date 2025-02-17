<template>
  <div class="user-page">
    <!-- Заголовок профілю -->
    <div class="profile-header">
      <div class="avatar">
        <img src="@/assets/User.png" alt="Аватар" class="avatar-img" />
      </div>
      <div class="username">{{ user.username }}</div>
    </div>

    <!-- Головний контент: Кошик та Історія -->
    <div class="main-content">
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
      <p>контакти: {{ user.phone }}</p>
      <p>адреса доставки: {{ user.address }}</p>
      <p>пошта: {{ user.email }}</p>
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
      user: {},
      historyItems: [],
    };
  },
  async created() {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:8080/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          this.user = data;
          this.fetchHistory();
        } else {
          alert(data.message);
        }
      } else {
        // Якщо токен відсутній, завантажити історію без користувача
        this.fetchHistory();
      }
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  },
  methods: {
    async fetchHistory() {
      try {
        const response = await fetch('http://localhost:8080/api/cart/1'); // Використовуйте ID користувача за замовчуванням або інший спосіб отримання даних
        const data = await response.json();
        if (response.ok) {
          this.historyItems = data;
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    },
    editProfile() {
      // Логіка редагування профілю
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
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
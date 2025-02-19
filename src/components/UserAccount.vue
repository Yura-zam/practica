<template>
  <div class="user-page">
    <div class="profile-header">
      <div class="avatar">
        <img :src="profileImageUrl" alt="Аватар" class="avatar-img" />
        <input type="file" @change="onFileChange" />
      </div>
      <div class="username">{{ user.username }}</div>
      <button @click="toggleEditMenu" class="edit-account-button">Редагувати акаунт</button>
    </div>
    <div v-if="showEditMenu" class="edit-menu">
      <button @click="editProfile">Редагувати профіль</button>
      <button @click="changePassword">Змінити пароль</button>
      <button @click="deleteAccount">Видалити акаунт</button>
    </div>
    <div class="main-content">
      <div class="history">
        <h2>Історія покупок</h2>
        <div v-for="item in purchaseHistory" :key="item.id" class="item">
          <div class="item-details">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }} USD</span>
            <span class="item-quantity">Кількість: {{ item.quantity }}</span>
            <span class="item-date">Дата: {{ new Date(item.created_at).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>
    </div>
    <button @click="logout" class="logout">Вихід</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      purchaseHistory: [],
      profileImageUrl: '',
      showEditMenu: false,
    };
  },
  async created() {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://localhost:8080/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        this.user = data;
        this.fetchPurchaseHistory();
        this.fetchProfileImage();
      } else {
        alert(data.message);
      }
    } else {
      this.fetchPurchaseHistory();
    }
  },
  methods: {
    async fetchPurchaseHistory() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/purchase-history', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) this.purchaseHistory = data;
      else alert(data.message);
    },
    async fetchProfileImage() {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/user/profile_image', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const blob = await response.blob();
        this.profileImageUrl = URL.createObjectURL(blob);
      } else {
        this.profileImageUrl = require('@/assets/User.png');
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) this.uploadImage(file);
    },
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/user/profile_image', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (response.ok) this.fetchProfileImage();
      else alert(data.message);
    },
    toggleEditMenu() {
      this.showEditMenu = !this.showEditMenu;
    },
    async editProfile() {
      const newUsername = prompt('Введіть нове ім\'я користувача:', this.user.username);
      if (newUsername && newUsername !== this.user.username) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username: newUsername }),
        });
        const data = await response.json();
        if (response.ok) {
          this.user.username = newUsername;
          alert('Ім\'я користувача успішно змінено');
        } else {
          alert(data.message);
        }
      }
    },
    async changePassword() {
      const newPassword = prompt('Введіть новий пароль:');
      if (newPassword) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/user/password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: newPassword }),
        });
        const data = await response.json();
        if (response.ok) alert('Пароль успішно змінено');
        else alert(data.message);
      }
    },
    async deleteAccount() {
      if (confirm('Ви впевнені, що хочете видалити акаунт?')) {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/user', {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          alert('Акаунт успішно видалено');
          this.logout();
        } else {
          alert(data.message);
        }
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.user-page {
  position: relative;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  padding-bottom: 50px;
}

.main-content, .profile-header {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

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

.avatar input[type="file"] {
  display: block;
  margin-top: 10px;
}

.username {
  font-size: 24px;
  margin-left: 10px;
}

.edit-account-button {
  margin-left: auto;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.edit-account-button:hover {
  background-color: #0056b3;
}

.edit-menu {
  position: absolute;
  top: 70px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.edit-menu button {
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  background-color: white;
  cursor: pointer;
  text-align: left;
}

.edit-menu button:hover {
  background-color: #f4f4f4;
}

.main-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.history {
  width: 100%;
}

.history h2 {
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}

.item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
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

.item-quantity {
  margin-top: 5px;
}

.item-date {
  margin-top: 5px;
}

.logout {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  opacity: 0.9;
}
</style>
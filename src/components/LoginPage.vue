<template>
  <div class="login-page">
    <div class="background"></div>
    <div class="content-container">
      <div class="white-box">
        <h1>{{ isRegistering ? 'Реєстрація' : 'Вхід' }}</h1>
        <input type="text" v-model="name" placeholder="Ім'я" v-if="isRegistering" />
        <input type="email" v-model="email" placeholder="Електронна пошта" />
        <input type="password" v-model="password" placeholder="Пароль" />
        <input type="text" v-model="fullName" placeholder="Повне ім'я" v-if="isRegistering" />
        <div class="button-group">
          <button @click="login" v-if="!isRegistering">Вхід</button>
          <button @click="register" v-if="isRegistering">Реєстрація</button>
          <button @click="toggleForm">{{ isRegistering ? 'Вхід' : 'Реєстрація' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      fullName: '',
      isRegistering: false,
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    },
    validatePassword(password) {
      return password.length >= 6;
    },
    validateUsername(username) {
      return username.length >= 3;
    },
    async login() {
      try {
        const response = await fetch('http://localhost:8080/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email, password: this.password }),
        });
        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('token', data.token);
          this.$router.push('/account');
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error logging in:', err);
      }
    },
    async register() {
      if (!this.validateEmail(this.email)) {
        alert('Невірний формат електронної пошти');
        return;
      }
      if (!this.validatePassword(this.password)) {
        alert('Пароль повинен містити мінімум 6 символів');
        return;
      }
      if (!this.validateUsername(this.name)) {
        alert('Нікнейм повинен містити мінімум 3 символи');
        return;
      }
      try {
        const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.name,
            email: this.email,
            password: this.password,
            full_name: this.fullName,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          alert('Реєстрація успішна! Тепер ви можете увійти.');
          this.toggleForm();
        } else {
          alert(data.message);
        }
      } catch (err) {
        console.error('Error registering:', err);
      }
    },
    toggleForm() {
      this.isRegistering = !this.isRegistering;
    },
  },
};
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/background.jpg') no-repeat center center;
  background-size: cover;
  z-index: -1;
}

.content-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.white-box {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
}

input {
  padding: 0.5rem;
  border: 1px solid #0e0505;
  border-radius: 4px;
  margin-bottom: 1rem;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  background-color: red;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style>
<template>
  <div class="login-page">
    <div class="background"></div>
    <div class="content-container">
      <div class="white-box">
    <h1>Ваш акаунт</h1>
    <input type="text" placeholder="Ім'я" />
    <input type="email" placeholder="Електронна пошта" />
    <input type="password" placeholder="Пароль" />
    <div class="button-group">
      <button @click="login" class="login-button">Вхід</button>
      <button @click="register" class="register-button">Реєстрація</button>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/account'); // Переходить на UserPage.vue
    },
    register() {
      this.$router.push('/account'); // Можна перенаправити на ту ж або іншу сторінку
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

form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
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
}

.login-button {
    background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.register-button {
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
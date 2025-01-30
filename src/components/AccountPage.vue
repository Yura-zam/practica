<template>
  <div class="account-page">
    <div class="background"></div>
    <div class="content-container">
      <div class="white-box">
        <h1>Ваш акаунт</h1>
        <form>
          <div class="form-group">
            <label for="name">Ім'я</label>
            <input type="text" id="name" />
          </div>
          <div class="form-group">
            <label for="email">Електронна пошта</label>
            <input type="email" id="email" />
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" id="password" />
          </div>
          <button type="submit">Зберегти зміни</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AccountPage",
};
</script>

<style scoped>
.account-page {
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
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>

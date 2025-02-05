<template>
  <header class="app-header">
    <div class="header-left">
      <img src="@/assets/logo.png" alt="Логотип" class="logo" />
      <h1>Old Man's Wheel</h1>
    </div>
    <nav class="nav-buttons">
      <router-link to="/catalog" class="btn">Каталог</router-link>
      <router-link to="/about" class="btn">Про нас</router-link>
      <router-link to="/account" class="btn">Аккаунт</router-link>

    </nav>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 60px;
  margin-right: 10px;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
}

.nav-buttons {
  display: flex;
  gap: 15px;
}

.nav-buttons .btn {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  background-color: #444;
  transition: background-color 0.3s;
}

.nav-buttons .btn:hover {
  background-color: #555;
}
</style>
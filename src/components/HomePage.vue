<template>
  <div class="home-page">
    <div class="welcome-box">
      <h2>Ласкаво просимо до Old Man's Wheel!</h2>
      <p>Ваш надійний партнер у світі автозапчастин.</p>
      <router-link to="/catalog" class="catalog-btn">Перейти до каталогу</router-link>
    </div>
  </div>
</template>

<style scoped>
.home-page {
  background-image: url('@/assets/background.jpg'); /* Фон */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  color: white;
}

.welcome-box {
  background-color: rgba(0, 0, 0, 0.6); /* Півпрозорий чорний фон */
  padding: 30px;
  border-radius: 10px;
  max-width: 500px;
}

.catalog-btn {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.catalog-btn:hover {
  background-color: #218838;
}
</style>

<template>
  <div id="app">
    <!-- Використання компонентів -->
    <AppNavbar />
    
    <!-- Основний контент -->
    <header>
      <img src="@/assets/logo.png" alt="Логотип" class="logo" />
      <h1>Магазин авто-запчастин</h1>
    </header>
    
    <!-- Роутер для відображення компонентів -->
    <router-view />
    
    <!-- Нижній колонтитул -->
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  components: {
    AppNavbar,
    AppFooter,
  },
};
</script>


<style>
/* Стилі для логотипа */
.logo {
  height: 200px; /* Висота логотипу */
  width: 200px; /* Ширина логотипу */
  margin-bottom: 10px; /* Відступ між логотипом і текстом */
}

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 20px;
}
</style>

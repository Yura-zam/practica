<template>
  <nav class="navbar">
    <ul>
      <li><button @click="goTo('home')">Головна</button></li>
      <li><button @click="goTo('login')">Вхід</button></li>
      <li><button @click="goTo('register')">Реєстрація</button></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    goTo(page) {
      if (page === 'home') {
        this.$router.push('/');
      } else if (page === 'login') {
        this.$router.push('/login');
      } else if (page === 'register') {
        this.$router.push('/register');
      }
    }
  }
};
</script>

<style>
.navbar {
  background-color: #333;
  color: white;
  padding: 10px;
}

.navbar ul {
  list-style-type: none;
  padding: 0;
}

.navbar ul li {
  display: inline;
  margin-right: 15px;
}

.navbar ul li button {
  background-color: #555;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
}

.navbar ul li button:hover {
  background-color: #777;
}
</style>

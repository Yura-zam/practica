<template>
  <div>
    <h2>Вхід</h2>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Увійти</button>
    </form>
    <router-link to="/register">Немає облікового запису? Зареєструйтесь</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', { email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/dashboard');
        })
        .catch(error => {
          alert('Помилка входу: ' + error.message);
        });
    },
  },
};
</script>

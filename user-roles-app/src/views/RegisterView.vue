<template>
  <div>
    <h2>Реєстрація</h2>
    <form @submit.prevent="register">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <select v-model="role">
        <option value="user">Користувач</option>
        <option value="admin">Адміністратор</option>
        <option value="director">Директор</option>
      </select>
      <button type="submit">Зареєструватись</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      role: 'user',
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        email: this.email,
        password: this.password,
        role: this.role,
      })
      .then(() => {
        this.$router.push('/login');
      })
      .catch(error => {
        alert('Помилка реєстрації: ' + error.message);
      });
    },
  },
};
</script>

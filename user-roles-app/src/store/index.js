import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // зберігання даних користувача
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      // Логіка для перевірки логіна (наприклад, запит до API)
      // Припустимо, що ми отримуємо дані з сервера:
      const user = {
        email,
        role: 'user', // роль, яку ви отримуєте після логіну (приклад)
      };
      commit('setUser', user);
    },
    register({ commit }, { email, password, role }) {
      // Логіка для реєстрації (наприклад, запит до API)
      // Припустимо, що ми отримуємо успішний результат:
      console.log('Реєстрація успішна');
    },
    logout({ commit }) {
      commit('logout');
    },
  },
  getters: {
    isLoggedIn: state => !!state.user,
    userRole: state => (state.user ? state.user.role : null),
  },
});

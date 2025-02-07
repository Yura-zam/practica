
<template>
  <div class="about-page">
    <div class="info-box">
      <h1>Про нас</h1>
      <h2>Інформація про компанію</h2>
      <p>
        Ласкаво просимо до Old Man's Wheel, вашого надійного партнера у світі автозапчастин!
        Ми спеціалізуємося на постачанні якісних автозапчастин для легкових та вантажних автомобілів.
        Наш асортимент включає широкий вибір продукції від провідних світових брендів.
      </p>
      <h2>Наші послуги</h2>
      <ul>
        <li>Мийка автомобілів</li>
        <li>Ремонт і технічне обслуговування</li>
        <li>Продаж автозапчастин</li>
        <li>Шиномонтаж</li>
        <li>Консультації експертів</li>
      </ul>
      <h2>Зв'яжіться з нами</h2>
      <p>Email: <a href="mailto:old.mans.wheel@gmail.com">old.mans.wheel@gmail.com</a></p>
      <p>Телефон: +38 (123) 456-7890</p>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: black;
  padding: 20px;
}

.info-box {
  background: rgba(255, 255, 255, 0.8);  /* фон */
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Тінь */
  text-align: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 10px 0;
}

li {
  margin-bottom: 5px;
}
</style>

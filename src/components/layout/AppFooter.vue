<template>
  <footer class="app-footer">
    <div class="container app-footer__content">
      <div class="app-footer__section">
        <h3 class="app-footer__logo">Горячие источники</h3>
        <p class="app-footer__description">
          Ваш идеальный отдых в уютных кабинках с видом на природу. Почувствуйте гармонию и тепло наших источников.
        </p>
      </div>

      <div class="app-footer__section">
        <h4>Контакты</h4>
        <ul class="app-footer__list">
          <li>📞 +7 (900) 000-00-00</li>
          <li>📍 ул. Лесная, 42, термальный курорт</li>
          <li>✉️ info@springs.ru</li>
        </ul>
      </div>

      <div class="app-footer__section">
        <h4>Режим работы</h4>
        <ul class="app-footer__list">
          <li>Пн-Пт: 09:00 — 22:00</li>
          <li>Сб-Вс: 08:00 — 23:00</li>
          <li>Без выходных и праздников</li>
        </ul>
      </div>
    </div>
    
    <div class="app-footer__bottom">
      <div class="container">
        <p>&copy; 2024 Горячие источники — Система бронирования. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: $primary-color;
  color: white;
  padding-top: 60px;
  margin-top: auto;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
    padding-bottom: 40px;
  }

  &__logo {
    font-family: $font-header;
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: white;
  }

  &__description {
    line-height: 1.6;
    opacity: 0.9;
    font-size: 0.95rem;
  }

  h4 {
    margin-bottom: 20px;
    font-size: 1.2rem;
    color: $accent-color;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    font-size: 0.95rem;
    opacity: 0.9;
  }

  &__bottom {
    background-color: darken($primary-color, 5%);
    padding: 20px 0;
    text-align: center;
    font-size: 0.85rem;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    padding-top: 40px;
    
    &__content {
      text-align: center;
    }

    &__list {
      align-items: center;
    }
  }
}
</style>

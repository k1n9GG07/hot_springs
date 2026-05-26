<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-info">
          <h3>Горячие источники</h3>
          <p>Уникальное место для отдыха и оздоровления в самом сердце природы. Уютные кабинки, чистый воздух и целебные воды.</p>
        </div>

        <div class="footer-contacts">
          <h4>Контакты</h4>
          <ul>
            <li>📍 ул. Родниковая, д. 42</li>
            <li>📞 +7 (900) 000-00-00</li>
            <li>✉️ info@springs.ru</li>
          </ul>
        </div>

        <div class="footer-hours">
          <h4>Режим работы</h4>
          <p>Ежедневно: 08:00 – 23:00</p>
          <p>Без выходных и перерывов</p>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} Горячие источники. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer {
  background-color: $primary-color;
  color: white;
  padding: 60px 0 20px;
  margin-top: auto;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 40px;
    margin-bottom: 40px;
  }

  h3, h4 {
    font-family: $font-header;
    margin-bottom: 20px;
  }

  h3 { font-size: 24px; }
  h4 { font-size: 18px; }

  p, li {
    font-size: 15px;
    line-height: 1.6;
    opacity: 0.9;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 20px;
    text-align: center;
    font-size: 14px;
    opacity: 0.7;
  }
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 30px;
  }
}
</style>

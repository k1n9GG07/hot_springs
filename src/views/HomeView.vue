<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCabinsStore } from '@/stores/cabins'
import AppButton from '@/components/ui/AppButton.vue'
import CabinCard from '@/components/cabin/CabinCard.vue'

const router = useRouter()
const cabinsStore = useCabinsStore()

onMounted(async () => {
  if (cabinsStore.cabins.length === 0) {
    await cabinsStore.fetchCabins()
  }
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__overlay"></div>
      <div class="container hero__content">
        <h1>Горячие источники</h1>
        <p>Ваш уголок спокойствия и здоровья в самом сердце природы</p>
        <AppButton label="Забронировать кабинку" @click="router.push('/cabins')" />
      </div>
    </section>

    <!-- About Section -->
    <section class="about section">
      <div class="container">
        <h2 class="section-title">О нашем комплексе</h2>
        <div class="about__grid">
          <div class="about__text">
            <p>Наши термальные источники — это уникальное место, где природная сила воды встречается с современным комфортом. Мы находимся в экологически чистом районе, вдали от городской суеты.</p>
            <p>Минеральный состав нашей воды способствует укреплению иммунитета, снятию стресса и общему оздоровлению организма. Температура воды в бассейнах поддерживается на уровне 38-42°C круглый год.</p>
          </div>
          <div class="about__image">
            <img src="https://images.unsplash.com/photo-1544124499-58912cbddaad?w=800" alt="Природа и источники">
          </div>
        </div>
      </div>
    </section>

    <!-- Public Pool Section -->
    <section class="pool section">
      <div class="container">
        <h2 class="section-title">Общий бассейн</h2>
        <div class="pool__card">
          <div class="pool__image">
            <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800" alt="Общий бассейн">
          </div>
          <div class="pool__info">
            <h3>Открытый термальный бассейн</h3>
            <p>Просторный бассейн под открытым небом с панорамным видом на горы. Доступен для всех посетителей комплекса.</p>
            <ul class="pool__details">
              <li>🕒 <strong>Режим работы:</strong> 09:00 — 22:00</li>
              <li>💰 <strong>Стоимость входа:</strong> 500 ₽ / чел (без ограничения времени)</li>
            </ul>
            <div class="pool__warning">
              <span class="icon">⚠️</span>
              Бронирование не требуется — оплата на месте
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Cabins Section -->
    <section class="cabins-preview section">
      <div class="container">
        <h2 class="section-title">Наши кабинки</h2>
        <div class="cabins-grid">
          <CabinCard 
            v-for="cabin in cabinsStore.cabins.slice(0, 3)" 
            :key="cabin.id" 
            :cabin="cabin" 
          />
        </div>
        <div class="cabins-preview__footer">
          <AppButton label="Все кабинки" variant="outline" @click="router.push('/cabins')" />
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="pricing section">
      <div class="container">
        <h2 class="section-title">Стоимость аренды кабинок</h2>
        <div class="pricing-grid">
          <div class="price-card">
            <div class="price-card__hours">1 час</div>
            <div class="price-card__amount">2 000 ₽</div>
            <div class="price-card__note">Минимальный заказ</div>
          </div>
          <div class="price-card">
            <div class="price-card__hours">2 часа</div>
            <div class="price-card__amount">3 000 ₽</div>
            <div class="price-card__note">1 500 ₽ / час</div>
          </div>
          <div class="price-card">
            <div class="price-card__hours">3 часа</div>
            <div class="price-card__amount">4 500 ₽</div>
            <div class="price-card__note">1 500 ₽ / час</div>
          </div>
          <div class="price-card">
            <div class="price-card__hours">4 часа</div>
            <div class="price-card__amount">6 000 ₽</div>
            <div class="price-card__note">1 500 ₽ / час</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacts Section -->
    <section class="contacts section">
      <div class="container">
        <h2 class="section-title">Контакты</h2>
        <div class="contacts__grid">
          <div class="contacts__info">
            <div class="contact-item">
              <span class="icon">📞</span>
              <div>
                <h4>Телефон</h4>
                <p>+7 (900) 000-00-00</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="icon">📍</span>
              <div>
                <h4>Адрес</h4>
                <p>ул. Лесная, 42, термальный курорт</p>
              </div>
            </div>
            <div class="contact-item">
              <span class="icon">🕒</span>
              <div>
                <h4>Режим работы</h4>
                <p>Ежедневно с 08:00 до 23:00</p>
              </div>
            </div>
          </div>
          <div class="contacts__map">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d40!3d44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDAwJzAwLjAiTiA0MMKwMDAnMDAuMCJF!5e0!3m2!1sru!2sru!4v1234567890" 
              width="100%" 
              height="350" 
              style="border:0; border-radius: 12px;" 
              allowfullscreen="" 
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.hero {
  height: 80vh;
  position: relative;
  background-image: url('https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
  }

  &__content {
    position: relative;
    z-index: 1;

    h1 {
      font-size: 4rem;
      margin-bottom: 16px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    p {
      font-size: 1.5rem;
      margin-bottom: 32px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
  }
}

.section {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 50px;
  color: $primary-color;
}

.about {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  }

  &__text {
    p {
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 20px;
    }
  }

  &__image img {
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
}

.pool {
  background-color: white;

  &__card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    background: $background-color;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  }

  &__image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__info {
    padding: 40px;

    h3 {
      font-size: 1.8rem;
      margin-bottom: 20px;
      color: $primary-color;
    }

    p {
      margin-bottom: 24px;
      line-height: 1.6;
    }
  }

  &__details {
    margin-bottom: 32px;
    
    li {
      margin-bottom: 12px;
      font-size: 1.1rem;
    }
  }

  &__warning {
    background: rgba($warning-color, 0.1);
    color: darken($warning-color, 30%);
    padding: 16px;
    border-radius: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
  }
}

.cabins-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.cabins-preview__footer {
  text-align: center;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.price-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
    border-color: $accent-color;
  }

  &__hours {
    font-weight: 700;
    color: $text-color;
    margin-bottom: 12px;
  }

  &__amount {
    font-size: 1.8rem;
    font-weight: 700;
    color: $primary-color;
    margin-bottom: 8px;
  }

  &__note {
    font-size: 0.9rem;
    color: lighten($text-color, 40%);
  }
}

.contacts {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 40px;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
}

.contact-item {
  display: flex;
  gap: 20px;
  
  .icon {
    font-size: 1.5rem;
    background: rgba($primary-color, 0.1);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }

  h4 {
    margin-bottom: 4px;
    font-size: 1.1rem;
  }
}

@media (max-width: 992px) {
  .hero h1 { font-size: 3rem; }
  .about__grid, .pool__card, .contacts__grid {
    grid-template-columns: 1fr;
  }
  .cabins-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .cabins-grid {
    grid-template-columns: 1fr;
  }
}
</style>

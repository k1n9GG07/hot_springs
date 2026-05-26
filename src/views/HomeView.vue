<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCabinsStore } from '@/stores/cabins'
import AppButton from '@/components/ui/AppButton.vue'
import CabinCard from '@/components/cabin/CabinCard.vue'

const router = useRouter()
const cabinsStore = useCabinsStore()

const priceList = [
  { hours: 1, total: 2000, perHour: 2000 },
  { hours: 2, total: 3000, perHour: 1500 },
  { hours: 3, total: 4500, perHour: 1500 },
  { hours: 4, total: 6000, perHour: 1500 }
]

onMounted(async () => {
  if (!cabinsStore.cabins.length) {
    await cabinsStore.fetchCabins()
  }
})
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Горячие источники</h1>
        <p>Погрузитесь в атмосферу спокойствия и природной гармонии</p>
        <AppButton label="Забронировать кабинку" @click="router.push('/cabins')" />
      </div>
    </section>

    <!-- About Section -->
    <section class="section about">
      <div class="container">
        <h2 class="section-title">О нашем месте</h2>
        <div class="about-grid">
          <div class="about-text">
            <p>Наши горячие источники — это уникальный природный комплекс, расположенный в экологически чистом районе. Природная минеральная вода, богатая полезными микроэлементами, поможет вам расслабиться и укрепить здоровье.</p>
            <p>Мы создали идеальные условия для семейного отдыха и романтических встреч. Окружение гор и шум леса помогут вам забыть о городской суете.</p>
          </div>
          <div class="about-image">
            <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800" alt="Природа">
          </div>
        </div>
      </div>
    </section>

    <!-- Pool Section -->
    <section class="section pool grey-bg">
      <div class="container">
        <h2 class="section-title">Общий бассейн</h2>
        <div class="pool-content">
          <div class="pool-image">
            <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" alt="Бассейн">
          </div>
          <div class="pool-info">
            <p>На территории комплекса расположен большой открытый бассейн с постоянной температурой воды 38°C.</p>
            <ul class="pool-details">
              <li>🕒 <strong>Режим работы:</strong> 09:00 – 22:00</li>
              <li>💰 <strong>Стоимость входа:</strong> 500 руб. / чел.</li>
            </ul>
            <div class="warning-box">
              ⚠️ Бронирование не требуется — оплата производится на месте в кассе комплекса.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cabins Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Наши кабинки</h2>
        <div class="cabins-grid">
          <CabinCard 
            v-for="cabin in cabinsStore.cabins" 
            :key="cabin.id" 
            :cabin="cabin" 
          />
        </div>
      </div>
    </section>

    <!-- Prices Section -->
    <section class="section grey-bg">
      <div class="container">
        <h2 class="section-title">Стоимость отдыха</h2>
        <div class="prices-grid">
          <div v-for="item in priceList" :key="item.hours" class="price-card">
            <div class="hours">{{ item.hours }} {{ item.hours === 1 ? 'час' : 'часа' }}</div>
            <div class="total">{{ item.total.toLocaleString() }} ₽</div>
            <div class="per-hour">{{ item.perHour.toLocaleString() }} ₽ / час</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contacts Section -->
    <section class="section contacts">
      <div class="container">
        <h2 class="section-title">Контакты</h2>
        <div class="contacts-grid">
          <div class="contacts-info">
            <div class="contact-item">
              <strong>Адрес:</strong>
              <p>ул. Родниковая, д. 42</p>
            </div>
            <div class="contact-item">
              <strong>Телефон:</strong>
              <p>+7 (900) 000-00-00</p>
            </div>
            <div class="contact-item">
              <strong>Email:</strong>
              <p>info@springs.ru</p>
            </div>
          </div>
          <div class="map-placeholder">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d37.6!3d55.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQyJzAwLjAiTiAzN8KwMzYnMDAuMCJF!5e0!3m2!1sru!2sru!4v1600000000000!5m2!1sru!2sru" 
              width="100%" 
              height="300" 
              style="border:0;" 
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
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), 
              url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600') no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;

  .hero-content {
    h1 {
      font-size: 64px;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    p {
      font-size: 20px;
      margin-bottom: 30px;
      max-width: 600px;
    }
  }
}

.section {
  padding: 80px 0;

  &.grey-bg { background-color: #f9f9f9; }

  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 50px;
    color: $primary-color;
  }
}

.about-grid, .pool-content, .contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;

  img {
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
}

.about-text p {
  font-size: 17px;
  margin-bottom: 20px;
  line-height: 1.7;
}

.pool-info {
  .pool-details {
    margin: 25px 0;
    li {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  .warning-box {
    background: lighten($warning-color, 35%);
    color: darken($warning-color, 25%);
    padding: 20px;
    border-radius: 8px;
    font-weight: 500;
  }
}

.cabins-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.prices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  .price-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);

    .hours { font-weight: 700; color: #666; margin-bottom: 15px; }
    .total { font-size: 28px; color: $primary-color; font-weight: 700; margin-bottom: 5px; }
    .per-hour { font-size: 14px; color: #999; }
  }
}

.contacts-info {
  .contact-item {
    margin-bottom: 25px;
    strong { display: block; color: $primary-color; margin-bottom: 5px; }
    p { font-size: 18px; }
  }
}

@media (max-width: 768px) {
  .hero h1 { font-size: 40px; }
  .about-grid, .pool-content, .contacts-grid { grid-template-columns: 1fr; gap: 30px; }
  .section { padding: 50px 0; }
}
</style>

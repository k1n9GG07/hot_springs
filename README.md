# 🌊 Горячие источники — Система бронирования

Веб-приложение для бронирования индивидуальных кабинок на термальном курорте "Горячие источники". Разработано в рамках учебного проекта.

---

## 📌 О проекте

Сайт предоставляет клиентам возможность онлайн-бронирования индивидуальных кабинок с горячими источниками. Администратор получает панель управления для просмотра и обработки заявок.

### Объекты для бронирования

- **Общий бассейн** — вход без бронирования, оплата на месте
- **3 индивидуальные кабинки** — почасовая аренда с онлайн-бронированием

### Тарификация кабинок

| Длительность | Стоимость |
|---|---|
| 1 час | 2 000 руб. |
| 2 часа | 3 000 руб. (1 500 руб/час) |
| 3 часа | 4 500 руб. (1 500 руб/час) |
| 4 часа | 6 000 руб. (1 500 руб/час) |

---

## 🛠 Технологический стек

| Категория | Технология |
|---|---|
| Фреймворк | Vue 3 (Composition API, `<script setup>`) |
| Роутинг | Vue Router 4 |
| Хранилище | Pinia |
| HTTP-клиент | Axios |
| Бэкенд | Node.js + Express |
| База данных | JSON Server (db.json) |
| Стили | SCSS + CSS-переменные |
| Сборка | Vite |
| Деплой фронтенд | Vercel |
| Деплой бэкенд | Railway |

---

## 📁 Архитектура проекта

```
src/
├── api/
│   └── index.js              # Axios instance + все API-запросы
├── router/
│   └── index.js              # Маршруты + Navigation Guards
├── stores/
│   ├── auth.js               # Авторизация и регистрация
│   ├── cabins.js             # Кабинки и занятые слоты
│   └── bookings.js           # Бронирования
├── components/
│   ├── ui/                   # Переиспользуемые UI-компоненты
│   │   ├── AppButton.vue
│   │   ├── AppInput.vue
│   │   ├── AppModal.vue
│   │   ├── AppBadge.vue
│   │   └── AppToast.vue
│   ├── layout/
│   │   ├── AppHeader.vue
│   │   └── AppFooter.vue
│   ├── cabin/
│   │   └── CabinCard.vue
│   └── booking/
│       ├── BookingForm.vue
│       ├── BookingCard.vue
│       ├── TimeSlotPicker.vue
│       └── DurationPicker.vue
├── views/
│   ├── HomeView.vue          # Лендинг
│   ├── CabinsView.vue        # Каталог кабинок
│   ├── BookingView.vue       # Оформление брони
│   ├── ProfileView.vue       # Личный кабинет
│   ├── AdminView.vue         # Панель администратора
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   └── NotFoundView.vue
└── assets/
    └── styles/
        ├── main.scss
        └── variables.scss
```

---

## 🔀 Маршруты

| URL | Страница | Доступ |
|---|---|---|
| `/` | Главная (лендинг) | Все |
| `/cabins` | Список кабинок | Все |
| `/booking/:cabinId` | Оформление брони | Авторизованные |
| `/profile` | Личный кабинет | Авторизованные |
| `/admin` | Панель администратора | Только Admin |
| `/login` | Вход | Гости |
| `/register` | Регистрация | Гости |

---

## ⚙️ Функциональность

### Для клиентов
- Просмотр информации об объекте (бассейн, кабинки, цены)
- Регистрация и авторизация
- Бронирование кабинки с выбором даты, времени и длительности
- Блокировка занятых временных слотов в реальном времени
- Автоматический расчёт стоимости
- История бронирований в личном кабинете
- Отмена активных бронирований

### Для администратора
- Просмотр всех заявок
- Фильтрация по дате и кабинке
- Подтверждение и отмена бронирований
- Статистика заявок

---

## 🚀 Запуск локально

### Требования
- Node.js 18+
- npm 9+

### Установка и запуск

```bash
# Клонировать репозиторий
git clone https://github.com/k1n9GG07/hot_springs.git
cd hot_springs

# Установить зависимости
npm install

# Запустить проект (Vite + Express одновременно)
npm run dev
```

Приложение будет доступно:
- Фронтенд: `http://localhost:5173`
- Бэкенд API: `http://localhost:3001`

### Тестовый аккаунт администратора

```
Email:    admin@springs.ru
Пароль:   admin123
```

---

## 🌐 Деплой

### Бэкенд (Railway)
- Платформа: [Railway](https://railway.app)
- URL: `https://hotsprings-production-a48b.up.railway.app`
- Сервер: Node.js + Express (`server.js`)
- Конфигурация: `railway.json`

### Фронтенд (Vercel)
- Платформа: [Vercel](https://vercel.com)
- Домен: `https://osmanskiydvor.ru`
- Автодеплой при каждом `git push` в ветку `main`

---

## 🗄 Структура базы данных (db.json)

```json
{
  "users": [
    {
      "id": 1,
      "name": "string",
      "phone": "string",
      "email": "string",
      "password": "string",
      "role": "admin | user"
    }
  ],
  "cabins": [
    {
      "id": 1,
      "name": "string",
      "capacity": 4,
      "description": "string",
      "image": "string (URL)"
    }
  ],
  "bookings": [
    {
      "id": 1,
      "userId": "number",
      "userName": "string",
      "userPhone": "string",
      "cabinId": "number",
      "cabinName": "string",
      "date": "YYYY-MM-DD",
      "timeStart": "HH:MM",
      "timeEnd": "HH:MM",
      "hours": "number",
      "totalPrice": "number",
      "status": "pending | confirmed | cancelled",
      "createdAt": "timestamp"
    }
  ]
}
```

---

## 🎨 Дизайн

Стиль — природный, премиальный, спа-эстетика.

| Переменная | Цвет | Назначение |
|---|---|---|
| Primary | `#2D6A4F` | Основной (глубокий зелёный) |
| Accent | `#74C69D` | Акцент (мятный) |
| Background | `#F8F5F0` | Фон (тёплый бежевый) |
| Warning | `#E9C46A` | Статус "Ожидает" |
| Danger | `#E76F51` | Статус "Отменено" |
| Success | `#52B788` | Статус "Подтверждено" |

**Шрифты:** Playfair Display (заголовки) + Inter (основной текст)

---

## 📋 Требования проекта

- [x] Vue 3 (Composition API)
- [x] Vue Router 4 с Navigation Guards
- [x] Pinia (хранилища в отдельных файлах)
- [x] Компоненты в отдельных папках
- [x] UI-компоненты вынесены в `components/ui/`
- [x] Бэкенд-сервер для получения данных (Express)
- [x] Адаптивная вёрстка (mobile / tablet / desktop)

---

## 👨‍💻 Автор

Разработано как учебный проект для заказчика — термального курорта "Горячие источники".

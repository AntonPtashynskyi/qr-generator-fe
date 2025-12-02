# Настройка аутентификации

## Обзор

Приложение использует систему аутентификации на базе JWT токенов с защищенными маршрутами.

## Структура

### API Routes

- **`/api/auth/login`** - Авторизация пользователя
  - Эндпоинт бэкенда: `POST /login`
  - Принимает: `{ email: string, password: string }`
  - Возвращает: `{ accessToken, refreshToken }`

- **`/api/auth/register`** - Регистрация нового пользователя
  - Эндпоинт бэкенда: `POST /sign-up`
  - Принимает: `{ email: string, password: string }`
  - Возвращает: `{ accessToken, refreshToken }`

- **`/api/auth/logout`** - Выход из системы
  - Очищает cookies с токенами

### Защищенные маршруты

- **`/dashboard`** - Доступен только авторизованным пользователям
- Middleware автоматически проверяет наличие `accessToken` и перенаправляет на главную страницу

### Компоненты

- **`LoginForm`** - Универсальная форма для логина и регистрации
  - Props: `{ title: string, mode: 'login' | 'register' }`

- **`LogoutButton`** - Кнопка выхода из системы

## Переменные окружения

Создайте файл `.env.local`:

```env
BACKEND_API_URL=http://localhost:3001
```

## Безопасность

- Токены хранятся в **httpOnly cookies** (защита от XSS)
- **accessToken**: время жизни 24 часа
- **refreshToken**: время жизни 7 дней
- В production cookies помечаются как `secure` (только HTTPS)

## Использование

### Главная страница

```tsx
<LoginForm title='Login' mode='login'/>
<LoginForm title='Registration' mode='register'/>
```

### Dashboard

```tsx
import { LogoutButton } from '@/components/LogoutButton';

<LogoutButton />
```

## Требования к бэкенду

Бэкенд должен предоставлять следующие эндпоинты.

Фронтенд поддерживает **два варианта** возврата токенов:

### Вариант 1: Токены в JSON (рекомендуется для простоты)

1. **POST /login**
   - Body: `{ email: string, password: string }`
   - Response: `{ accessToken: string, refreshToken: string }`

2. **POST /sign-up**
   - Body: `{ email: string, password: string }`
   - Response: `{ accessToken: string, refreshToken: string }`

### Вариант 2: Токены в Set-Cookie headers

Если бэкенд устанавливает cookies сам (через `res.cookie()`), фронтенд автоматически пробросит их клиенту.

1. **POST /login**
   - Body: `{ email: string, password: string }`
   - Headers: `Set-Cookie: accessToken=...; refreshToken=...`
   - Response: любой JSON (токены не обязательны)

2. **POST /sign-up**
   - Body: `{ email: string, password: string }`
   - Headers: `Set-Cookie: accessToken=...; refreshToken=...`
   - Response: любой JSON (токены не обязательны)

**Важно:** Система автоматически определяет, какой вариант использует бэкенд, и обрабатывает оба случая.

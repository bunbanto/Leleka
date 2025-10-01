# ЛЕЛЕКА

## Pregnancy Journey App

[![Live demo](https://img.shields.io/badge/Live%20demo-Leleka-ffd6e7?logo=vercel&labelColor=93c5fd&logoColor=111827)](https://gitpub-frontend.vercel.app/)

Лелека - це зручний застосунок для майбутніх мам. Він допомагає щодня стежити за
перебігом вагітності, отримувати корисні поради, вести особистий щоденник та
керувати завданнями. Усе важливе зібрано в одному місці – від календаря розвитку
малюка до нагадувань і персональних записів, майбутня мама зможе:

- відстежувати розвиток малюка під час вагітності;
- отримувати щоденні поради та нагадування;
- вести власний щоденник і зберігати важливі події;
- контролювати завдання та планувати день;
- мати швидкий доступ до всієї інформації в одному місці.

## Використані технології

### Frontend:

- Next.js 15 (App Router, Turbopack)
- React 19
- TypeScript
- CSS Modules

### _UI & стилізація_

- MUI 7 (+ **@mui/system**, **@mui/icons-material**)
- Emotion (styled, react)
- **HeroUI** (breadcrumbs)
- modern-normalize

### _Дані & стан_

- TanStack React Query 5 (+ Devtools)
- Zustand
- Axios
- cookie (парсинг кукі на клієнті)

### _Форми & валідація_

- Formik + Yup

### _Дати_

- dayjs
- react-datepicker
- flatpickr
- @mui/x-date-pickers

### _UX-утиліти_

- iziToast
- react-spinners
- AOS (анімації при скролі)
- basiclightbox
- react-burger-menu
- react-paginate
- react-icons
- use-debounce

### _Dev tooling_

- ESLint 9 + eslint-config-next + **@tanstack/eslint-plugin-query**
- TypeScript types (@types/\*)
- SVGR (@svgr/cli, @svgr/webpack)

## Backend

[![Swagger UI](https://img.shields.io/badge/Docs-Swagger%20UI-85EA2D?logo=swagger&logoColor=white)](https://gitpub-backend-qq3d.onrender.com/api-docs/)

- Node.js (ESM)
- Express 5

### _База даних_

- MongoDB (driver 6)
- Mongoose 8 (ODM)

### _Авторизація та безпека_

- JSON Web Tokens (`jsonwebtoken`)
- Хешування паролів (`bcrypt`)
- Google OAuth 2.0 (`google-auth-library`)
- Cookies (`cookie-parser`)
- CORS (`cors`)

### _Валідація даних_

- Joi 18

### _Завантаження файлів та медіа_

- `multer` (обробка multipart/form-data)
- Cloudinary SDK (`cloudinary`)

### _E-mail та шаблони_

- `nodemailer`
- `handlebars` (шаблони листів)

### _Документація API_

- `swagger-ui-express` (UI для OpenAPI)
- `@redocly/cli` (bundle/preview OpenAPI)

### _Логи та обробка помилок_

- `pino-http` — структуровані HTTP-логи (middleware для Express)
- `pino-pretty` — читабельний формат логів у дев-режимі
- `http-errors` — узгоджені HTTP-помилки (4xx/5xx)

### _Dev tooling_

- `dotenv` — конфіг через `.env`
- `@faker-js/faker` — тестові дані / сидінг
- `nodemon` — гарячий рестарт у деві
- ESLint 9 — `eslint`, `@eslint/js`, `globals`

## 🚀 Як запустити / розгорнути проєкт:

### 1. Клонувати репозиторій

```
git clone https://github.com/your-repo/pregnancy-journey-app.git
```

### 2. Перейти в робочу папку

```
cd pregnancy-journey-app
```

### 3. Встановити залежності

```
npm i
```

### 4. Запустити у режимі розробки

```
npm run dev
```

## Робота з гілками/основні команди на git:

- git branch — показує лише локальні гілки
- git branch -r — показує лише віддалені гілки
- git branch -a — показує усі гілки, як локальні, так і віддалені
- git switch -c name-your-branch — створює нову гілку
- git switch name-branch — перемикає на іншу гілку
- git fetch — завантажує останні зміни з віддаленого репозиторію, але не вносить
  їх у поточні гілки
- git pull — одночасно і завантажує, і вносить у локальний репозиторій усі
  останні зміни (на усіх гілках), які були зроблені у віддаленому репозиторію
- git pull origin footer — завантажить і застосує усі зміни з віддаленої (origin
  ) гілки footer до локальної
- git commit — застосує коміти до поточної гілки
- git merge page-header — зливає у поточну гілку код з гілки page-header
- git push origin main — віддаленої гілки main
- git branch -d page-header — видаляє локальну гілку page-header

## Супутня інформація

[![GitHub Projects](https://img.shields.io/badge/GitHub_Projects-Open_board-181717?logo=github&logoColor=white)](https://github.com/Nekit6228?tab=projects)

Адаптивна верстка реалізована згідно з макетом. Передбачено захист приватних
сторінок (профіль, щоденник, подорож). Всі запити супроводжуються індикаторами
завантаження та повідомленнями про помилки. Після реєстрації користувач
проходить онбординг для введення початкових даних. Задеплоєний проєкт
доступний за посиланням: [Переглянути сайт](https://gitpub-frontend.vercel.app/)

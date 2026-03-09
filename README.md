# Users Catalog

Одностраничный каталог пользователей на `React + TypeScript`, который загружает данные из публичного API DummyJSON и поддерживает:

- просмотр списка пользователей
- поиск по имени
- серверную пагинацию
- состояния загрузки, пустого результата и ошибки

Репозиторий: [github.com/lina-gritsel/users-catalog](https://github.com/lina-gritsel/users-catalog)

## Stack

- React 19
- TypeScript
- Vite
- CSS Modules
- DummyJSON Users API

## API

Используется публичный API:

- список пользователей: [https://dummyjson.com/users](https://dummyjson.com/users)
- документация: [https://dummyjson.com/docs/users](https://dummyjson.com/docs/users)

Приложение использует:

- `GET /users?limit=12&skip=0`
- `GET /users/search?q=Emily&limit=12&skip=0`

## Requirements

- Node.js 22+
- npm 11+

## Run locally

```bash
npm install
npm run dev
```

После запуска Vite покажет локальный адрес, обычно `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

## What is implemented

- карточки пользователей с именем, email, телефоном, возрастом, ролью, компанией и локацией
- адаптивная сетка карточек
- debounce-поиск по имени через `/users/search`
- пагинация на основе `total`, `skip`, `limit`
- retry для сетевой ошибки

## Git notes

По условию задачи после инициализации проекта был создан отдельный коммит:

- `Init commit`

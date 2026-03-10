# Users Catalog

## Архитектура

- `src/app` - app-level providers и bootstrap
- `src/pages` - page composition без data orchestration
- `src/features` - feature hooks, query factories и feature UI
- `src/entities` - доменные типы, форматтеры и UI сущностей
- `src/shared` - общие hooks, UI и assets

Алиасы импортов:

- `@/` - весь `src`
- `@app/`, `@pages/`, `@features/`, `@entities/`, `@shared/` - по слоям

## Запуск

Требования:

- Node.js 22+
- npm 11+

Установка зависимостей:

```bash
npm install
```

Запуск в режиме разработки:

```bash
npm run dev
```

Сборка production-версии:

```bash
npm run build
```

Проверка линтера:

```bash
npm run lint
```

Предпросмотр production-сборки:

```bash
npm run preview
```

# Коментарі!

виконавець:
Олександр Боднар

## Опис


## Запуск

Необхідні пакунки:
- Docker
- nodejs

Створити Dockerfile, nginx.conf і .env файли і запустити docker.
```bash
node genConfig/genenv.js; docker compose up --build
```

Після запуску контейнера в базі даних користувачів існує дефолтний користувач:

username: aaaaa
email: qqqqq

можна зайти під його обліковкою, або створити власну

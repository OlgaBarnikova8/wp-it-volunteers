# wp-it-volunteers
WordPress тема + Gulp
Для встановлення залежностей команда: npm install
Для запуску команд Gulp: gulp
Для складання проекту у режимі "production": gulp build

Що робить Gulp:
- збирає SCSS файли, додає вендорні префікси
- стискає файли SCSS у style.min.css
- збирає та стискає js файли в main.min.js
- конвертує шрифти в .ttf, з .ttf в woff/woff2
- стискає зображення та конвертує їх у формат .avif, .webp
- gulp sprite створює svg спрайт
- перед кожним запуском збирача чистить папку dest з фінальним проектом
- запускає сервер з автоматичним перезавантаженням вікна у браузері при зміні файлів у проекті

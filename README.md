# Проект Tajam (тестовое задание Nutnet)

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/kilymax/nutnet-tajam-test-project">
    <img src="/public/icons/logo.svg" alt="Logo" width="150" height="150">
  </a>
</div>

## About The Project

Проект, сделанный согласно тестовому заданию от компании Nutnet.

### Built With

- HTML
- CSS (SASS)
- vanilla JS
- bundler Vite v6.0.8
- Node v22.12.0

## Установка

1. Клонировать репозиторий

```sh
   git clone https://github.com/kilymax/nutnet-tajam-test-project
```

2. С предустановленной нодой установить зависимости (кроме devDependencies по сути ничего нет)

```sh
   npm install
   npm run dev
```

3. Билд создать

```sh
   npm run build
```

4. Запустить превью билда

```sh
  npm run preview
```

Вы можете открыть уже развернутое приложение на Github Pages – [Tajam](https://kilymax.github.io/nutnet-tajam-test-project/)

## Пояснительная записка

### Макеты:

1. ✅ в блоке с видео открывается всплывающее окно по клику на иконку play и тексту ниже с (использовался код вставки iframe с сайта Rutube);
2. ✅ реализован просмотр (пролистывание) отзывов по клику на аватар с небольшой анимацией;
3. ✅ в блоке с формой настроена валидация:

- ✅ все поля обязательны;
- ✅ email должен быть корректным;
- ✅ номер телефона должен быть корректным;
- ✅ по каждому полю должны быть ограничения на кол-во введенных символов;
- ✅ проверка должна происходить по клику на кнопку или нажатием на Enter;
- ✅ сообщение об ошибке должно выводиться под полем, в котором она есть;

### Требования:

1. ✅ сайт должен быть кроссбраузерным и адаптивным;
2. ✅ использование шрифтов Playfair и Roboto;
3. ✅ использование методологии БЭМ;
4. ✅ вся верстка должна быть выполнена без использования css-фреймворков, таких как Bootstrap, Tailwind;
5. ✅ использование HTML5, препроцессор SCSS;
6. ✅ наличие сборщика (использовался Vite);
7. ✅ использовать фреймворк или самописный JS на ваше усмотрение (ванильный JS);

### Будет плюсом:

1. ✅ в блоке Команда используйте шаблонизатор для карточки сотрудника (использовался шаблонизатор Handlebars);
2. ✅ реализовать функционал якорных ссылок для каждого раздела в пунктах меню шапки сайта;
3. ❌ соблюдения Pixel Perfect;
4. ✅ настройка автоматической сборки
5. ❌ оптимизация: минификация CSS/JS. Пробовал два минимизатора прикрутить ([vite-plugin-optimize-css-modules](https://www.npmjs.com/package/vite-plugin-optimize-css-modules) и [rollup-plugin-css-porter](https://www.npmjs.com/package/rollup-plugin-css-porter)), но на выходе не было никаких изменений. Не разобрался.
6. ✅ оптимизация: сжатие изображений (использовал [vite-plugin-image-optimizer](https://www.npmjs.com/package/vite-plugin-image-optimizer))
7. ✅ настройка Linter, Prettier;

### "Отсебятина" и для чего:

1. Выделение элемента "Home" меню в хэдере, показалось более симпатичным
2. Анимация при появлении цитат в блоке отзывов
3. Горизонтальный слайдер в блоке "Our work". Подумал при адаптации выстраивать 12 изображений в колонку было бы моветоном, а так вроде ничего :)
4. Наполненил сайт картинками, так банально "вкуснее" смотрится. Вроде все на этом.

## Contact

Ilya K - [Telegram](https://t.me/leoncox) - leon.coxsw@gmail.com

Project Link: [Tajam](https://github.com/kilymax/nutnet-tajam-test-project)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div align="center">
© 2025 GitHub, Inc.
</div>

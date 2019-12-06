<template>

  
<div>
  <h1 class="support__title">Софт, который может пригодиться</h1>
  <a class="support__markets" href="#"><img src="img/googleplay.png" alt="google play"></a>
  <a class="support__markets" href="#"><img src="img/appstore.png" alt="app store"></a>
  <h2 class="support__h2">Свяжитесь с нами</h2>

  <form class="support__form" action="#">
    <div class="support__flex">
      <div class="support__wrapper">
        <label>
          Имя
          <input class="support__input" type="text" placeholder="Петр" required>
        </label>
        <label>
          Email
          <input class="support__input" type="email" placeholder="example@mail.ru" required>
        </label>
        <label>
          Тема
          <input class="support__input" type="text" placeholder="отзыв" required>
        </label>
      </div>
      <label class="support__textarea">
        Сообщение
        <textarea class="support__input" type="text" placeholder="Напишите нам..." required></textarea>
      </label>
    </div>
    <button class="support__submit" type="submit">Отправить</button>
  </form>
  <div class="support__contacts">
    <div class="support__mark">
      <a href="tel:88005553535">8 800 555 3535</a>
      <p>г. Белгород, ул. Костюкова, д. 46</p>
      <a href="mailto:info@gleam.ru">info@gleam.ru</a>
    </div>
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A090049979aac98eb804d84b7cd306a4635ddddb3e5ab0faf61e11d0566d00c55&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
  </div>
</div>
</template>

<style>
.loadingItem {
  align-items: center;
  justify-content: center;
  display: flex;
}

.action-panel {
  margin-bottom: 10px;
  margin-right: 5px;
}
</style>

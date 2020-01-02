<template>  
<div>
  <div class="main__intro">
    <img class="main__img" src="img/main.jpg" alt="Проектор">
    <p class="main__tagline">Gleam - это то, чего вам не хватало</p>
  </div>
  <div class="main__info">
    <img class="main__info-img" src="img/info.svg" alt="лучшие в мире">
    <p class="main__info-text">Самое высокое качество изображения на любой поверхности в любое время суток. 
      Удобное управление прямо из вашего смартфона. Смотрите самый качественный контент с самым качественным проектором.
      <a href='http://kafitis.intbel.ru:5001/'>Ознакомиться с продуктом</a></p>
  </div>
  <ul class="main__list">
    <li class="main__card">
      <img class="main__card-img" src="img/pay.svg" alt="все виды оплат">
      <p class="main__card-text">Принимаем все виды оплаты</p>
    </li>
    <li class="main__card">
      <img class="main__card-img" src="img/support.svg" alt="тех. поддержка 24\7">
      <p class="main__card-text">Тех. поддержка работает 24\7</p>
    </li>
    <li class="main__card">
      <img class="main__card-img main__card-img--logistic" src="img/logistic.svg" alt="доставка в любое место">
      <p class="main__card-text">Доставляем товар в любое место</p>
    </li>
    <li class="main__card">
      <img class="main__card-img" src="img/mobile.svg" alt="удобное приложение">
      <p class="main__card-text">Удобное управление в вашем смартфоне</p>
    </li>
  </ul>
          
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

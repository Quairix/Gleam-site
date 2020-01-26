<template>
  <div>
    <div class="row"> 
      <div class= "col-lg-6 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-xs-2 col-10">
        <div class="main-form">
          <p class="main-form-header"><span>Если</span>  у вас есть какие-либо вопросы или нужна помощь - заполняйте форму ниже и нажимайте на кнопку!</p>
          <form>
            <input ref="name" class="form-control" v-model.trim="newFeed.name" type="text" placeholder="Ваше имя">
            <input ref="mail" class="form-control" v-model="newFeed.mail" type="email" Required placeholder="Ваш email">
            <input ref="theme" class="form-control" v-model="newFeed.theme" type="text" placeholder="Тема">
            <textarea ref="feedText" class="form-control" v-model="newFeed.feedText" type="text" rows="2" placeholder="Сообщение"></textarea>
            <button class="main-form-btn" @click="addFeedback" >Отправить сообщение</button>
          </form>
        </div>
      </div>
    </div>

    <div class="support__contacts">
      <div class="main-form col-lg-6 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10"> 
        <p class="main-form-header"><span>Наши</span> контакты</p>
        <form>
          <p><span>Телефон:</span> +79998234567</p>
          <p><span>Адрес:</span> ул.Костюкова 46</p>
        </form>
      </div>       
    </div>
    <hr />
    <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A090049979aac98eb804d84b7cd306a4635ddddb3e5ab0faf61e11d0566d00c55&amp;source=constructor" width="100%" height="300" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { feedbackRef } from "../config/firebaseConfig";

export default {
  data() {
    return {
      json_fields: {
        Mail: "mail",
        Name: "name",
        Theme: "theme",
        Messag: "messag",
      },
      trUsers: [],
      newFeed: {
        name: "",
        mail: "",
        theme: "",
        feedText: "",
      }
    };
  },

  computed: {
    ...mapGetters(["isLoggedIn", "currentUser"]),

    userEmail() {
      return this.isLoggedIn ? this.currentUser.email : "";
    },
    isAdmin() {
      return this.userEmail == "alad_nastya@mail.ru";
    }
  },
  methods: {
    ...mapActions(["addMessage"]),
    addFeedback() {
      feedbackRef.push(this.newFeed);
      this.addMessage({
        messageClass: "success",
        message: "Отзыв отправлен!",
      });
      this.$router.push('/support');
    }
  }
};
</script>

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

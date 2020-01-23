<template>
  <div class="row"> 
    <div class= "col-lg-6 col-md-6 offset-md-3 col-sm-8 offset-lg-4 offset-sm-2 col-10">
      <div class="main-form">
        <p class="main-form-header"><span>А</span>вторизация</p>
        <form id="login-form" role="form" style="display: block;">
          <input type="email" name="email" id="email" class="form-control" placeholder="Email" v-model="email">
          <input type="password" name="password" id="password" class="form-control" placeholder="Пароль" v-model="password">
          <button class="main-form-btn" style="width: 100%" @click.prevent="loginWithEmailLocal" :disabled="isLoading">Войти
          </button>
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/register"><a>Регистрация</a></router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex';
export default {
  data() {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  methods: {
    ...mapActions(['addMessage', 'clearMessage', 'loginWithEmail']),
    loginWithEmailLocal() {
      this.isLoading = true
      let data = {
        email: this.email,
        password: this.password
      }
      this.loginWithEmail(data).then(() => {
        this.clearMessage();
        this.$router.push({
          name: 'mainpage'
        });
      }).catch((error) => {
        let message_obj = {
          message: error.message,
          messageClass: "danger",
          autoClose: false
        }
        this.addMessage(message_obj);
      }).then(() => {
        this.isLoading = false
      })
    }
  }
}
</script>

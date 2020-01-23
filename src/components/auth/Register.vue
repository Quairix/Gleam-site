<template>
  <div class="row"> 
    <div class= "col-lg-6 col-md-6 offset-md-3 col-sm-8 offset-lg-4 offset-sm-2 col-10">
      <div class="main-form">
        <p class="main-form-header"><span>Р</span>егистрация</p>
        <form id="login-form" role="form" style="display: block;">
           <input type="email" name="email" id="email" class="form-control" placeholder="Email" value=""
          v-model="email">
           <input type="password" name="password" id="password" class="form-control" placeholder="Пароль"
          v-model="password">
          <button class="main-form-btn" style="width: 100%" @click.prevent="registerByEmailLocal" :disabled="isLoading">Зарегистрироваться
          </button>
          <div class="col-lg-12">
            <div class="text-center">
              <router-link to="/login"><a>Войти</a></router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data() {
      return {
        email: '',
        password: '',
        isLoading: false
      }
    },
    methods: {
       ...mapActions(['clearMessage', 'addMessage', 'registerByEmail']),
      registerByEmailLocal() {
        this.isLoading = true
        let data = {
          email: this.email,
          password: this.password
        }
        this.registerByEmail(data).then(() => {
          this.clearMessage();
          this.$router.push({name: 'mainpage'});
        })
        .catch((error) => {
          // console.log('register error', error);
          let message_obj = {
              message: error.message,
              messageClass: "danger",
              autoClose: true
            }
           this.addMessage(message_obj);
        }).then(() => {
          this.isLoading = false
        })
      }
    }
  }
</script>

<template>  
<div>
          <div id="dashboard">
        <section>
            <div class="col1">
                <div class="profile">
                    <div class="create-post">
                      <p>Добавить товар</p>
                        <form @submit.prevent>
                          <p>Описание: <input v.model.trim="ProductItem.description"/></p>
                          <p>Id: <input v.model.trim="ProductItem.id"/></p>
                         <p>URL изображения: <input v.model.trim="ProductItem.thumbnail_url"/></p>
                         <p>Название: <input v.model.trim="ProductItem.title"/></p>
                         <p>Тип: <input v.model.trim="ProductItem.type"/></p>
                          <p> <button class="button" @click="saveToProducts" >Добавить</button></p>
                       
                         </form>
                    </div>
                </div>
            </div>
            <div class="col2">
                <div>
                    <p class="no-results">There are currently no posts</p>
                </div>
            </div>
        </section>
    </div>
</div>
</template>
<script>
    import {
  mapActions
} from 'vuex';
export default {
  props: ['item', 'displayList'],
  methods: {
    ...mapActions(['addMessage', 'saveToProducts']),
    add(){
    this.saveToProducts({
            ProductItem: this.ProductItem
          }).then(() => {
            this.console.log();
            this.addMessage({
              messageClass: 'success',
              message: 'Ваш товар был добавлен!'
            });
          });
    }
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    },
    getTypeString(value) {
      if (value == "proector") {
        return 'Проектор';
      } else {
        if (value == "merch") {
        return 'Мерч';
        } else return '';
      }
    }
  }
}
</script>
<style>
.CENA{
  width: 200px;
}

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

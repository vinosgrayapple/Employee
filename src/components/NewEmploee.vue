<template>
  <div id="new-emploee">
    <h3>Новый Сотрудник</h3>
    <div class="row">
      <form @submit.prevent="saveEmploee">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="emploee_id" required>
            <label>Emploee ID#</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>
            <label>Имя Сотрудника</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>
            <label>Департамент</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>
            <label>Должность</label>
          </div>
        </div>
        <button type="submit" class="btn">Добавить Сотрудника</button>
        <router-link to="/" class="btn grey">Отменить</router-link>
      </form>
    </div>
   
  </div>
</template>
<script>
  import db from "./firebaseInit";
  export default {
    name: "new-emploee",
    data() {
      return {
        emploee_id: null,
        name: null,
        dept: null,
        position: null
      };
    },
    methods: {
      saveEmploee() {
        db
          .collection("emploees")
          .add({
            emploee_id: this.emploee_id,
            name: this.name,
            dept: this.dept,
            position: this.position
          })
          .then(docRef => {
            this.$router.push("/");
          })
          .catch(error => console.log(error));
      }
    }
  };

</script>

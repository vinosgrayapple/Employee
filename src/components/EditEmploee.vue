<template>
  <div id="edit-emploee">
    <h3>Редактировать данные о Сотруднике</h3>
    <div class="row">
      <form @submit.prevent="updateEmploee">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="emploee_id" required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="dept" required>

          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="position" required>

          </div>
        </div>
        <button type="submit" class="btn">Сохранить Сотрудника</button>
        <router-link to="/" class="btn grey">Отменить</router-link>
      </form>
    </div>

  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "edit-emploee",
  data() {
    return {
      emploee_id: null,
      name: null,
      dept: null,
      position: null
    };
  },
  beforeRouteEnter(to, from, next) {
    db
      .collection("emploees")
      .where("emploee_id", "==", to.params.emploee_id)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.emploee_id = doc.data().emploee_id;
            vm.name = doc.data().name;
            vm.dept = doc.data().dept;
            vm.position = doc.data().position;
          });
        });
      });
  },
  watch: {
    $router: "fetchData"
  },
  methods: {
    fetchData() {
      db
        .collection("emploees")
        .where("emploee_id", "==", this.$route.params.emploee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.emploee_id = doc.data().emploee_id;
            this.name = doc.data().name;
            this.dept = doc.data().dept;
            this.position = doc.data().position;
          });
        });
    },
    updateEmploee() {
      db
        .collection("emploees")
        .where("emploee_id", "==", this.$route.params.emploee_id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.update({
              emploee_id: this.emploee_id,
              name: this.name,
              dept: this.dept,
              position: this.position
            });
          });
        })
        .then(() =>
          this.$router.push({
            name: "view-emploee",
            params: { emploee_id: this.emploee_id }
          })
        );
    }
  }
};
</script>

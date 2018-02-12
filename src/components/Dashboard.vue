<template>
  <div id="dashboard">
    <auto-complete v-model="employeeName" :data="emplName" icon="ios-search" :filter-method="filterMethod" placeholder="Поиск"
     @on-search="handleSearch1">
    </auto-complete>
    <ul class="collection with-header">
      <li v-for="emploee in emploees" :key="emploee.id" class="collection-item" @dblclick="$router.push(emploee.emploee_id)">
        <!-- <div class="chip purple">
          {{ emploee.dept }}
        </div> -->
        <avatar style="background: green; margin: 0 10px">{{abrv(emploee.name)}}</avatar>{{ emploee.name }} ({{ emploee.emploee_id }})
        <router-link class="secondary-content" :to="{name: 'view-emploee',params:{emploee_id: emploee.emploee_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      emploees: [],
      employeeName: ""
    };
  },
  created() {
    db
      .collection("emploees")
      .orderBy("dept")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = {
            id: doc.id,
            emploee_id: doc.data().emploee_id,
            name: doc.data().name,
            dept: doc.data().dept,
            position: doc.data().position
          };
          this.emploees.push(data);
        });
      });
  },
  methods: {
    abrv: function(name) {
      return name.split(" ")[0][0];
    },
    filterMethod(value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
     handleSearch1 (value) {
                this.emploees = !value ? [] : this.emploees.filter();
            }
  },
  computed: {
    emplName() {
      if (this.emploees.length) {
        return this.emploees.reduce((bas, emp) => bas.concat(emp.name), []);
      } else {
        return [];
      }
    }
  }
};
</script>

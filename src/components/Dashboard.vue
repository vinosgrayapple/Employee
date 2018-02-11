<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Сотрудники</h4>
      </li>
      <li v-for="emploee in emploees" :key="emploee.id" class="collection-item">
        <div class="chip purple">
          {{ emploee.dept }}
        </div>
        {{ emploee.name }} ({{ emploee.emploee_id }})
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
  import db from './firebaseInit'
  export default {
    name: 'dashboard',
    data() {
      return {
        emploees: []
      }
    },
    created() {
      db.collection('emploees').orderBy('dept').get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              'id': doc.id,
              'emploee_id': doc.data().emploee_id,
              'name': doc.data().name,
              'dept': doc.data().dept,
              'position': doc.data().position
            }
            this.emploees.push(data)
          })
        })
    }
  }

</script>

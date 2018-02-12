<template>
  <div id="new-emploee">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{name}}</h4>
      </li>
      <li class="collection-item">Employee ID#: {{emploee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey">
      Back
    </router-link>
    <button class="btn red" @click="deleteEmploee">Delete</button>
     <div class="fixed-action-btn">
      <router-link :to="{name: 'edit-emploee', params: {emploee_id: emploee_id}}" class="btn-floating btn-large green">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>
<script>
  import db from './firebaseInit'
  export default {
    name: 'view-emploee',
    data() {
      return {
        emploee_id: null,
        name: null,
        dept: null,
        position: null
      }
    },
    beforeRouteEnter(to, from, next) {
      db.collection('emploees').where('emploee_id',
          '==', to.params.emploee_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            next(vm => {
              vm.emploee_id = doc.data().emploee_id
              vm.name = doc.data().name
              vm.dept = doc.data().dept
              vm.position = doc.data().position
            })

          })
        })
    },
    watch: {
      $router: 'fetchData'
    },
    methods: {
      fetchData() {
        db.collection('emploees')
          .where('emploee_id', '==', this.$route.params.emploee_id).get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.emploee_id = doc.data().emploee_id
              this.name = doc.data().name
              this.dept = doc.data().dept
              this.position = doc.data().position
            })
          })
      },
      deleteEmploee() {
        if (confirm('Are you sure?')) {
          db.collection('emploees')
            .where('emploee_id', '==', this.$route.params.emploee_id).get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                doc.ref.delete()
                this.$router.push('/')
              })
            })
        }
      }
    }
  }

</script>

<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel grey lighten-3 darkgrey-text center">
            <h3>Registration</h3>
            <form @submit.prevent="register">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" name="" id="email" v-model="email">
                <label for="email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" name="" id="password" v-model="password">
                <label for="password">Password</label>
              </div>
              <button type="submit" class="btn btn-large grey lighten-4 black-text">register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import firebase from 'firebase';
  export default {
    name: 'register',
    data() {
      return {
          email: '',
          password: ''
      }
    },
    methods: {
        register () {
          firebase.auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`Account created for ${user.email}`);
                 this.$router.go({
                     path: this.$router.path
                     });
            },
            err => {
                alert(err.message);
            });
        }
    }
  }

</script>

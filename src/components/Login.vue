<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="login card-panel green white-text center">
            <h3>Login</h3>
            <form  @submit.prevent="login">
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input type="text" name="" id="email" v-model="email">
                <label class="white-text" for="email">Email</label>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input type="password" name="" id="password" v-model="password">
                <label for="password" class="white-text">Password</label>
              </div>
              <button type="submit" class="btn btn-large grey lighten-4 black-text">Login</button>
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
    name: 'login',
    data() {
      return {
          email: '',
          password: ''
      }
    },
    methods: {
        login () {
          firebase.auth()
          .signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                alert(`You are logged in as  ${user.email}`);
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
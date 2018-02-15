import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditEmploee from '@/components/EditEmploee'
import NewEmploee from '@/components/NewEmploee'
import ViewEmploee from '@/components/ViewEmploee'
import Login from "@/components/Login";
import Register from '@/components/Register';
import firebase from "firebase";

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/new",
      name: "new-emploee",
      component: NewEmploee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/edit/:emploee_id",
      name: "edit-emploee",
      component: EditEmploee,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/:emploee_id",
      name: "view-emploee",
      component: ViewEmploee,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

 // Guard routers

router.beforeEach((to, from, next)=>{
  // Check for requiredAuth 
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NOT logged in
    if (!firebase.auth().currentUser) {
      // Go to login page
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Procced to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
     if (firebase.auth().currentUser) {
      // Go to login page
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Procced to route
      next();
    }
  } else {
    next();
  }
});

export default router;
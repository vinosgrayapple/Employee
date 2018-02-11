import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import EditEmploee from '@/components/EditEmploee'
import NewEmploee from '@/components/NewEmploee'
import ViewEmploee from '@/components/ViewEmploee'

Vue.use(Router)

export default new Router({
  routes:
  [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-emploee',
      component: NewEmploee
    },
    {
      path: '/edit/:emploee_id',
      name: 'edit-emploee',
      component: EditEmploee
    },
    {
      path: '/:emploee_id',
      name: 'view-emploee',
      component: ViewEmploee
    }
  ]
})

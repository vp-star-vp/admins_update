import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { /* getUserRole, */ isUserLoggedIn } from '@/auth/utils'//
// import { canNavigate } from '@/libs/acl/routeProtection'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'apps-user-management-users-list-vp',
      component: () => import('@/views/apps/user-management/users_vp/Users.vue'),
      meta: {
        action: 'read',
        resource: 'ACL',
      },
    },
    {
      path: '/apps/user-management/sites',
      name: 'app-management-sites',
      component: () => import('@/views/apps/user-management/sites/Sites.vue'),
      meta: {
        action: 'read',
        resource: 'ACL',
      },
    },
    {
      path: '/apps/user-management/roles-vp',
      name: 'apps-user-management-roles-vp',
      component: () => import('@/views/apps/user-management/roles_vp/Roles.vue'),
      meta: {
        action: 'read',
      },
    },
    {
      path: '/apps/user-management/permissons-vp',
      name: 'apps-user-management-permissons-vp',
      component: () => import('@/views/apps/user-management/permissions_vp/Roles.vue'),
      meta: {
        action: 'read',
      },
    },
    {
      path: '/apps/user-management/users-list-vp',
      name: 'apps-user-management-users-list-vp',
      component: () => import('@/views/apps/user-management/users_vp/Users.vue'),
      meta: {
        action: 'read',
      },
    },
    {
      path: '/apps/app-management/apps',
      name: 'app-management-apps',
      component: () => import('@/views/apps/user-management/apps/Apps.vue'),
      meta: {
        action: 'read',
      },
    },

    // --
    {
      path: '/error-login/404',
      name: 'error-login',
      component: () => import('@/views/error/ComingSoon.vue'),
      // meta: {
      // layout: 'full',
      // action: 'none',
      // },
    },
    /*    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    }, */
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
    /*  meta: {
        layout: 'full',
      }, */
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (!isUserLoggedIn()) {
    store.dispatch('START_LOADING').then(
      () => {
        if (store.getters.USER_STATE_FULL.ruleApproved) {
          next()
        } else next({ name: 'error-login' })
      },
    )
  } else next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router

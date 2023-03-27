import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { /* getUserRole, */ isUserLoggedIn } from '@/auth/utils'//

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    /*
    {
      path: '/',
      name: 'contact',
      component: () => import('@/views/apps/Contact/Contact.vue'),
    },
*/

    {
      path: '/',
      name: 'apps-user-management-users-list-vp',
      component: () => import('@/views/apps/user-management/users_vp/Users.vue'),
      meta: {
        action: 'read',
      },
    },

    {
      path: '/:number',
      name: 'contact',
      component: () => import('@/views/apps/Contact/Contact.vue'),
    },
    /*    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        pageTitle: 'Home',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
<<<<<<< HEAD
    }, */
    /* {
      path: '/email',
      name: 'apps-email',
      component: () => import('@/views/apps/email/Email.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'email-application',
      },
    }, */
    // },
    // {
    //   path: '/second-page',
    //   name: 'second-page',
    //   component: () => import('@/views/SecondPage.vue'),
    //   meta: {
    //     pageTitle: 'Second Page',
    //     breadcrumb: [
    //       {
    //         text: 'Second Page',
    //         active: true,
    //       },
    //     ],
    //   },
    // },
    // *------------------- pages RULES NONE --------------------------------*
    // --

    {
      path: '/apps/user-management/sites',
      name: 'app-management-sites',
      component: () => import('@/views/apps/user-management/sites/Sites.vue'),
      meta: {
        action: 'read',
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
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
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

    {
      path: '/apps/todo',
      name: 'apps-todo',
      component: () => import('@/views/apps/todo/Todo.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
      },
    },
    {
      path: '/apps/todo/:filter',
      name: 'apps-todo-filter',
      component: () => import('@/views/apps/todo/Todo.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
        navActiveLink: 'apps-todo',
      },
      beforeEnter(to, _, next) {
        if (['important', 'completed', 'deleted'].includes(to.params.filter)) next()
        else next({ name: 'error-404' })
      },
    },
    {
      path: '/apps/todo/tag/:tag',
      name: 'apps-todo-tag',
      component: () => import('@/views/apps/todo/Todo.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
        navActiveLink: 'apps-todo',
      },
      beforeEnter(to, _, next) {
        if (['team', 'low', 'medium', 'high', 'update'].includes(to.params.tag)) next()
        else next({ name: 'error-404' })
      },
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

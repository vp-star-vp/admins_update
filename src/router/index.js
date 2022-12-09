import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
// import { canNavigate } from '@/libs/acl/routeProtection'
import { /* getUserRole, */ isUserLoggedIn } from '@/auth/utils'//
// Routes
// import apps from './routes/apps'

// Routes
// import apps from './routes/apps'

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
      name: 'contact',
      component: () => import('@/views/apps/Contact/Contact.vue'),
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
  ],
})

router.beforeEach((to, from, next) => {
  if (!isUserLoggedIn()) {
    store.dispatch('START_LOADING').then(
      () => {
        if (store.getters.USER_STATE_FULL.ruleApproved) {
        // console.log('store.getters.USER_STATE.ruleApproved: ', store.getters.USER_STATE_FULL.ruleApproved)
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

export default [
  
    // *===============================================---*
    // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
    // *===============================================---*
    {
      path: '/apps/email/:folder',
      name: 'apps-email-folder',
      component: () => import('@/views/apps/email/Email.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'email-application',
        navActiveLink: 'apps-email',
      },
      beforeEnter(to, _, next) {
        if (['sent', 'draft', 'starred', 'spam', 'trash'].includes(to.params.folder)) next()
        else next({ name: 'error-404' })
      },
    },
    {
      path: '/apps/email/label/:label',
      name: 'apps-email-label',
      component: () => import('@/views/apps/email/Email.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'email-application',
        navActiveLink: 'apps-email',
      },
      beforeEnter(to, _, next) {
        if (['personal', 'company', 'important', 'private'].includes(to.params.label)) next()
        else next({ name: 'error-404' })
      },
    },
  
    // *===============================================---*
    // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
    // *===============================================---*
    {
      path: '/apps/todo',
      name: 'apps-todo',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'todo-application',
      },
    },
    {
      path: '/apps/chat',
      name: 'apps-chat',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        contentRenderer: 'sidebar-left',
        contentClass: 'chat-application',
      },
    },
    {
      path: '/apps/calendar',
      name: 'apps-calendar',
      component: () => import('@/views/error/Error404.vue'),
    },
    // *===============================================---*
    // *--------- CHAT  ---------------------------------------*
    // *===============================================---*
]
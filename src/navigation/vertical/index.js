export default [
  {
    title: 'Пользователи',
    icon: 'UserIcon',
    route: 'apps-user-management-users-list-vp',
    action: 'read',
    resource: 'users.navigation',
  },
  {
    title: 'Сайты',
    route: 'app-management-sites',
    icon: 'GlobeIcon',
    action: 'read',
    resource: 'sites.navigation',
  },
  {
    title: 'Приложения',
    route: 'app-management-apps',
    icon: 'TrelloIcon',
    action: 'read',
    resource: 'apps.navigation',
  },
  {
    title: 'Роли',
    route: 'apps-user-management-roles-vp',
    icon: 'UsersIcon',
    action: 'read',
    resource: 'roles.navigation',
  },
  {
    title: 'Разрешения',
    route: 'apps-user-management-permissons-vp',
    icon: 'ZapIcon',
    action: 'read',
    resource: 'permissions.navigation',
  },
]

import { Ability } from '@casl/ability'

// export default new Ability([])

import { initialAbility } from './config'
//  Read ability from localStorage
// * Handles auto fetching previous abilities if already logged in user
// ? You can update this if you store user abilities to more secure place
// ! Anyone can update localStorage so be careful and please update this
// const userData = JSON.parse(localStorage.getItem('userData'))
// console.log('JSON.parse(localStorage.getItem(userData))', JSON.parse(localStorage.getItem('userData')))

// const existingAbility = userData ? userData.ability : null

// console.log('existingAbility:', existingAbility)

/* export default new Ability([]) */
const permissionsData = [
  {
    // eslint-disable-next-line no-plusplus
    id: 1,
    name: 'contact-read',
    appId: 1,
    appName: 'getContact',
    functionalityName: 'contact',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 2,
    name: 'contact-update',
    appId: 1,
    appName: 'getContact',
    functionality: 'contact',
    operationType: 'update',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 3,
    name: 'contact.dealer-read',
    appId: 1,
    appName: 'getContact',
    functionality: 'contact.dealer',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 4,
    name: 'apps-user-management-users-list-vp',
    appId: 1,
    appName: 'apps-user-management-users-list-vp',
    functionality: 'apps-user-management-users-list-vp',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 4,
    name: 'apps-user-management-roles-vp',
    appId: 1,
    appName: 'apps-user-management-roles-vp',
    functionality: 'apps-user-management-roles-vp',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 4,
    name: 'app-management-sites',
    appId: 1,
    appName: 'app-management-sites',
    functionality: 'app-management-sites',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 5,
    name: 'app-management-apps',
    appId: 1,
    appName: 'app-management-apps',
    functionality: 'app-management-apps',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 6,
    name: 'apps-user-management-permissons-vp',
    appId: 1,
    appName: 'apps-user-management-permissons-vp',
    functionality: 'apps-user-management-permissons-vp',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 7,
    name: 'apps-read',
    appId: 1,
    appName: 'apps-read',
    functionality: 'apps-read',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 7,
    name: 'apps-read',
    appId: 1,
    appName: 'apps-read',
    functionality: 'apps-read',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'apps-todo',
    appId: 1,
    appName: 'apps-todo',
    functionality: 'apps-todo',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'apps-todo',
    appId: 1,
    appName: 'apps-todo',
    functionality: 'apps-todo',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'permissions',
    appId: 1,
    appName: 'permissions',
    functionality: 'permissions',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'permissions',
    appId: 1,
    appName: 'permissions',
    functionality: 'permissions',
    operationType: 'update',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'permissions',
    appId: 1,
    appName: 'permissions',
    functionality: 'permissions',
    operationType: 'delete',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'permissions',
    appId: 1,
    appName: 'permissions',
    functionality: 'permissions',
    operationType: 'create',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'app',
    appId: 1,
    appName: 'app',
    functionality: 'app',
    operationType: 'create',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'app',
    appId: 1,
    appName: 'app',
    functionality: 'app',
    operationType: 'delete',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'site',
    appId: 1,
    appName: 'site',
    functionality: 'site',
    operationType: 'create',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'site',
    appId: 1,
    appName: 'site',
    functionality: 'site',
    operationType: 'delete',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'role.create',
    appId: 1,
    appName: 'role.create',
    functionality: 'role.create',
    operationType: 'create',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'role.delete',
    appId: 1,
    appName: 'role.delete',
    functionality: 'role.delete',
    operationType: 'delete',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'role.read',
    appId: 1,
    appName: 'role.read',
    functionality: 'role.read',
    operationType: 'read',
    rbu: 'Ф05',
    apiFunction: '...',
  },
  {
    id: 8,
    name: 'user.role.add',
    appId: 1,
    appName: 'user.role.add',
    functionality: 'user.role.add',
    operationType: 'create',
    rbu: 'Ф05',
    apiFunction: '...',
  },

]

permissionsData.forEach(i => {
  initialAbility.push(
    {
      action: i.operationType,
      subject: i.functionality,
    },
  )
})

/* initialAbility.push(
  {
    action: 'read',
    subject: 'appContact',
  },

) */

export default new Ability(initialAbility)

/* export default new Ability(existingAbility || initialAbility) */

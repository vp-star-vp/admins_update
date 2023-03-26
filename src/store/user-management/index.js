// import axios from '@/libs/axios'
// import Ability from '@/libs/acl/ability'
import apps from './logic/apps'
import sites from './logic/sites'
import rolesVp from './logic/roles'
import permissionsVp from './logic/permissions'
import usersVp from './logic/users'

export default {
  namespaced: true,
  state: {
    rules: [],
    rbu: [
      {
        id: 'Ф01',
        name: 'ЦО',
      },
      {
        id: 'Ф03',
        name: 'ЦО',
      },
      {
        id: 'Ф04',
        name: 'ЦО',
      },
      {
        id: 'Ф05',
        name: 'ЦО',
      },
      {
        id: 'Ф06',
        name: 'ЦО',
      },
    ],
    operationType: [
      { id: 1, name: 'create' },
      { id: 2, name: 'read' },
      { id: 3, name: 'update' },
      { id: 4, name: 'delete' },
    ],
    role: {},
    permission: {},
    user: {},
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    apps,
    sites,
    rolesVp,
    permissionsVp,
    usersVp,
  },
}

import axios from '@axios'
// import { Ability } from '@casl/ability'
import Ability from '@/libs/acl/ability'

export default {
  state: {
    url: 'https://wolga-info.ocs.ru/api/',
    solutionId: 'WAdmin',
    expand: true,
    permissonsType: [{ id: 0, value: 'create' }, { id: 1, value: 'read' }, { id: 2, value: 'update' }, { id: 3, value: 'delete' }],
    user: [],
    ability: [],
    permissions: [],
    // ---  todo delete --->
    info: 'https://confluence.inside/pages/viewpage.action?pageId=191284320',
    ruleApproved: true,
    userRole: 'admin',
    rbuApproved: ['03', '04', '05'],
    // <---- delete
  },
  getters: {
    USER_STATE_FULL(state) {
      return state
    },
    USER_STATE(state) {
      return state.user
    },
    PERMISS_TYPE_BY_CODE: state => code => state.permissonsType.find(p => p.id === code).value,
  },
  mutations: {
    SET_USER_LOGIN(state, user) {
      /* if (user.rbu && user.rbu.length > 0 && state.rbuApproved.indexOf(user.rbu.replace(/\D/g, '')) >= 0) {
        state.ruleApproved = true
      } */
      state.user = user
    },
    SET_USER_PERMISSIONS(state, permissions) {
      const locPerm = []
      state.permissions = permissions
      state.permissions.forEach(i => {
        locPerm.push(
          {
            action: this.getters.PERMISS_TYPE_BY_CODE(i.PermissionType),
            subject: i.Name,
          },
        )
      })
      state.ability = locPerm
      /*      if (1 === 1) { */
      Ability.can(state.ability)
      /*      } */
    },
  },
  actions: {
    async WHO_I_AM({ commit, state }) {
      const user = await axios({
        url: `${state.url}wolgadata_emploeeinfo.who_am_i`,
        method: 'GET',
        withCredentials: true,
      })

      commit('SET_USER_LOGIN', user.data)
    },
    async GET_MY_PERMISSIONS({ commit, state }) {
      const permissions = await axios({
        url: `${state.url}wolgadata_permissionstore.list.all?site=${state.solutionId}&user=${state.user.sid}&expand=${state.expand}`,
        method: 'GET',
        withCredentials: true,
      })
      // console.log('+ permissions: ', permissions.data.data)
      commit('SET_USER_PERMISSIONS', permissions.data.data)
    },
    /*    async CHECK_ACCESS({ commit, state }) {
      const user = await axios({
        url: `${state.url}wolgaadmin_secure.claimslist.exists/${state.groupADAccess}`,
        method: 'GET',
        withCredentials: true,
      })

      commit('SET_ACCESS', user.data.data)
    }, */
    async START_LOADING({ dispatch }) {
      await dispatch('WHO_I_AM')
      await dispatch('GET_MY_PERMISSIONS')
      // await dispatch('CHECK_ACCESS')
    },
  },
}

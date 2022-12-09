import axios from '@axios'

export default {
  state: {
    url: 'https://wolga-info.ocs.ru/api/',
    solution: 'SBFGetContact',
    info: 'https://confluence.inside/pages/viewpage.action?pageId=191284320',
    user: [],
    ruleApproved: false,
    rbuApproved: ['03', '04', '05'],
  },
  getters: {
    USER_STATE_FULL(state) {
      return state
    },
    USER_STATE(state) {
      return state.user
    },
    /* RBU_APPROVED(state){

    }, */
  },
  mutations: {
    SET_USER_LOGIN(state, user) {
      if (user.rbu && user.rbu.length > 0 && state.rbuApproved.indexOf(user.rbu.replace(/\D/g, '')) > 0) {
        state.ruleApproved = true
      }
      state.user = user
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
    async START_LOADING({ dispatch /* , state /* , commit */ }) {
      await dispatch('WHO_I_AM')
      // await dispatch('PARAM_PACK')
      // await dispatch('WHO_MY_GROUP')
      // await dispatch('EMPL_LIST')
      // await dispatch('userManagement/LOAD_PERMISSIONS', { root: true })
    },
  },
}

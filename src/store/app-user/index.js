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
      if (user.rbu && user.rbu.length > 0 && state.rbuApproved.indexOf(user.rbu.replace(/\D/g, '')) >= 0) {
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

      /* user.value = {
        sid: 'S-1-5-21-1982859038-251867848-951718399-70122',
        id: '1000004540',
        name: 'Рядинская Виктория',
        fullName: 'Рядинская Виктория Викторовна',
        email: 'vryadinskaya@ocs.ru',
        daxEmplId: '03060269',
        jobTitle: 'Офис-менеджер',
        sP_PhotoUrl: '',
        bitrix_PhotoUrl: '',
        city: 'Воронеж',
        workGroupId: '632_',
        workGroupName: 'Секретариат РБЮ Юг',
        phone: '3719',
        bitrix_PhoneMobile: '',
        employeeStatus: 1,
        displayNameLat: 'Ryadinskaya Viktoriya',
        bD_Date: '2004-07-02T00:00:00',
        bD_MonthDay: 702,
        location: 'офис',
        photoUrl: '',
        avatarUrl: '',
        rbu: 'Ф03',
        active: true,
        createDate: '2021-06-21T15:57:44.9833333',
        createBySID: null,
        bitrixId: 0,
      }
      */

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

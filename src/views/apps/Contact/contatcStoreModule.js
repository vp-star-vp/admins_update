import axios from '@axios'
import jsonformdata from 'json-form-data'
import store from '@/store'

export default {
  namespaced: true,
  state: {
    amountContact: 0,
    amountSale: 0,
    amountCust: 0,
    amountEmpl: 0,
    faqUrl: 'https://confluence.inside/pages/viewpage.action?pageId=191284320',
  },
  getters: {
    AMOUNT(state) {
      return state
    },
  },
  mutations: {
    SET_AMOUNT_CONTACT(state, val) {
      state.amountContact = val
    },
    SET_AMOUNT_SALE(state, val) {
      state.amountSale = val
    },
    SET_AMOUNT_CUST(state, val) {
      state.amountCust = val
    },
    SET_AMOUNT_EMPL(state, val) {
      state.amountEmpl = val
    },
  },
  actions: {
    SEARCH_BY_PHONE_CONTACT_CUST({ commit }, number) {
      return new Promise((resolve, reject) => {
        const options = {
          initialFormData: new FormData(),
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping(value) {
            if (typeof value === 'boolean') {
              return +value ? 'true' : 'false'
            }
            return value
          },
        }
        const queryParams = {
          paramPack: {
            Search: number,
            Solution: `${store.getters.USER_STATE_FULL.solution}`,
          },
        }
        const paramPack = jsonformdata(queryParams, options)
        const configOptions = {
          url: `${store.getters.USER_STATE_FULL.url}wolgadata_sfb.search_byphone.contactcust.form`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: paramPack,
          withCredentials: true,
        }
        axios(configOptions)
          .then(response => {
            if (response.data.data && response.data.data !== null) {
              commit('SET_AMOUNT_CONTACT', response.data.data.length)
            } else {
              commit('SET_AMOUNT_CONTACT', 0)
            }
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    SEARCH_BY_PHONE_CUST_MANAGER({ commit }, number) {
      return new Promise((resolve, reject) => {
        const options = {
          initialFormData: new FormData(),
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping(value) {
            if (typeof value === 'boolean') {
              return +value ? 'true' : 'false'
            }
            return value
          },
        }
        const queryParams = {
          paramPack: {
            Search: number,
            Solution: `${store.getters.USER_STATE_FULL.solution}`,
          },
        }
        const paramPack = jsonformdata(queryParams, options)
        const configOptions = {
          url: `${store.getters.USER_STATE_FULL.url}wolgadata_sfb.search_byphone.custmanager.form`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: paramPack,
          withCredentials: true,
        }
        axios(configOptions)
          .then(response => {
            if (response.data.data && response.data.data !== null) {
              commit('SET_AMOUNT_SALE', response.data.data.length)
            } else {
              commit('SET_AMOUNT_SALE', 0)
            }
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    SEARCH_BY_PHONE_CUST({ commit }, number) {
      return new Promise((resolve, reject) => {
        const options = {
          initialFormData: new FormData(),
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping(value) {
            if (typeof value === 'boolean') {
              return +value ? 'true' : 'false'
            }
            return value
          },
        }
        const queryParams = {
          paramPack: {
            Search: number,
            Solution: `${store.getters.USER_STATE_FULL.solution}`,
          },
        }
        const paramPack = jsonformdata(queryParams, options)
        const configOptions = {
          url: `${store.getters.USER_STATE_FULL.url}wolgadata_sfb.search_byphone.cust.form`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: paramPack,
          withCredentials: true,
        }
        axios(configOptions)
          .then(response => {
            if (response.data.data && response.data.data !== null) {
              commit('SET_AMOUNT_CUST', response.data.data.length)
            } else {
              commit('SET_AMOUNT_CUST', 0)
            }
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    SEARCH_BY_PHONE_EMPL({ commit }, number) {
      return new Promise((resolve, reject) => {
        const options = {
          initialFormData: new FormData(),
          showLeafArrayIndexes: true,
          includeNullValues: false,
          mapping(value) {
            if (typeof value === 'boolean') {
              return +value ? 'true' : 'false'
            }
            return value
          },
        }
        const queryParams = {
          paramPack: {
            Search: number,
            Solution: `${store.getters.USER_STATE_FULL.solution}`,
          },
        }
        const paramPack = jsonformdata(queryParams, options)
        const configOptions = {
          url: `${store.getters.USER_STATE_FULL.url}wolgadata_sfb.search_byphone.emploee.form`,
          method: 'post',
          headers: { 'Content-Type': 'multipart/form-data' },
          data: paramPack,
          withCredentials: true,
        }
        axios(configOptions)
          .then(response => {
            if (response.data.data && response.data.data !== null) {
              commit('SET_AMOUNT_EMPL', response.data.data.length)
            } else {
              commit('SET_AMOUNT_EMPL', 0)
            }
            return resolve(response)
          })
          .catch(error => reject(error))
      })
    },

  },
}

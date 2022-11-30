import axios from '@axios'
import jsonformdata from 'json-form-data'
import store from '@/store'

export default {
  namespaced: true,
  state: {
  },
  getters: {},
  mutations: {},
  actions: {
    SEARCH_BY_PHONE_CONTACT_CUST(ctx, number) {
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
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    SEARCH_BY_PHONE_CUST_MANAGER(ctx, number) {
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
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    SEARCH_BY_PHONE_CUST(ctx, number) {
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
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

  },
}

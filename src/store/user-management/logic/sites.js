import axios from '@/libs/axios'
import jsonformdata from 'json-form-data'

export default {
  namespaced: true,
  state: {
    sites: [],
  },
  getters: {
    getSites(state) {
      return state.sites
    },
  },
  mutations: {
    setSites(state, sites) {
      state.sites = sites
    },
  },
  actions: {
    readSites({ commit }, url) {
      const config = {
        method: 'get',
        url: `${url}wolgadata_siteinfo.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      // commit('setSites', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setSites', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    updateSite({ dispatch }, param) {
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
      const payloadForm = jsonformdata(param.site, options)
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_siteinfo.update.form`,
        withCredentials: true,
        data: payloadForm,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            dispatch('readSites', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    createSite({ dispatch }, param) {
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
      const payloadForm = jsonformdata(param.site, options)
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_siteinfo.add.form`,
        withCredentials: true,
        data: payloadForm,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            dispatch('readSites', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    deleteSite({ dispatch }, param) {
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_siteinfo.delete/${param.id}`,
        withCredentials: true,
        // data: payloadForm,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            dispatch('readSites', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
  },
}

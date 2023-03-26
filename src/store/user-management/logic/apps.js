import axios from '@/libs/axios'
import jsonformdata from 'json-form-data'

export default {
  namespaced: true,
  state: {
    apps: [],
    site2app: [],
    selectApp: [],
  },
  getters: {
    getApps(state) {
      return state.apps
    },
    getSite2App: state => id => {
      if (id !== null && id.length > 0) {
        return state.site2app.filter(t => t.siteId === id)
      }
      return []
    },
    getSelectApp: state => state.selectApp,
  },
  mutations: {
    setApps(state, apps) {
      state.apps = apps
    },
    setSite2App(state, s2p) {
      state.site2app = s2p
    },
    setSelectApp(state, app) {
      state.selectApp = app
    },
  },
  actions: {
    createApp({ dispatch }, param) {
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
      const payloadForm = jsonformdata(param.app, options)
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_solutioninfo.add.form`,
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
            dispatch('readApps', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    readApps({ commit }, url) {
      const config = {
        method: 'get',
        url: `${url}wolgadata_solutioninfo.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      // commit('setApps', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setApps', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    updateApp({ dispatch }, param) {
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
      const payloadForm = jsonformdata(param.app, options)
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_solutioninfo.update.form`,
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
            dispatch('readApps', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    deleteApp({ dispatch }, param) {
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_solutioninfo.delete/${param.id}`,
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
            dispatch('readApps', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // ------
    createApp2Site({ dispatch }, param) {
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
      // /wolgadata_solutiontosite.add.form
      const payloadForm = jsonformdata(param.param, options)
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_solutiontosite.add.form`,
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
            // todo
            if (1 === 3) {
              dispatch('readApps', param.url)
            }
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    readApp2Site({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_solutiontosite.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      commit('setSite2App', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setSite2App', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line no-empty-pattern
    deleteApp2Site({}, param) {
      const config = {
        method: 'post',
        url: `${param.url}/wolgadata_solutiontosite.delete/${param.id}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => resolve(response.data.data))
          .catch(error => reject(error))
      })
    },
    // -------
    getSelectApp({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_solutioninfo.list_lookup`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      commit('setSelectApp', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setSelectApp', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
  },
}

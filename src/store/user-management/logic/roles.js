import axios from '@/libs/axios'
import jsonformdata from 'json-form-data'

export default {
  namespaced: true,
  state: {
    roles: [],
    selectRoles: [],
  },
  getters: {
    getRoles(state) {
      return state.roles
    },
    getSelectRoles: state => id => {
      if (id === undefined || id === null) {
        return []
      }
      return state.selectRoles.filter(item => item.solutionId === id)
    },
  },
  mutations: {
    setRoles(state, roles) {
      state.roles = roles
    },
    setSelectRoles(state, roles) {
      state.selectRoles = roles
    },
  },
  actions: {
    readRole({ commit }, url) {
      const config = {
        method: 'get',
        url: `${url}wolgadata_rolestore.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      // commit('setRoles', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setRoles', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    updateRole({ dispatch }, param) {
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
        url: `${param.url}wolgadata_rolestore.update.form`,
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
    createRole({ dispatch }, param) {
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
        url: `${param.url}wolgadata_rolestore.add.form`,
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
            dispatch('readRole', param.url)
            // dispatch('readSites', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    deleteRole({ dispatch }, param) {
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_rolestore.delete/${param.id}`,
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
            dispatch('readRole', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // ---
    getSelectRole({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_rolestore.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      commit('setSelectRoles', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setSelectRoles', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },

  },
}

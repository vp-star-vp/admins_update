import axios from '@/libs/axios'
import jsonformdata from 'json-form-data'

export default {
  namespaced: true,
  state: {
    permissions: [],
    selectPermission: [],
    RTP: [],
  },
  getters: {
    getPermissions(state) {
      return state.permissions
    },
    getSelectPermission(state) {
      return state.selectPermission
    },
    getRolesToPermission: state => id => state.RTP.filter(r => r.roleId === id),
  },
  mutations: {
    setPermissions(state, permissions) {
      state.permissions = permissions
    },
    setSelectPermission(state, Permission) {
      state.selectPermission = Permission
    },
    setRolesToPermission(state, RTP) {
      state.RTP = RTP
    },
  },
  actions: {
    readPermissions({ commit }, url) {
      const config = {
        method: 'get',
        url: `${url}wolgadata_permissionstore.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      // commit('setPermissions', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setPermissions', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    updatePermission({ dispatch }, param) {
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
        url: `${param.url}wolgadata_permissionstore.update.form`,
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
    createPermission({ dispatch }, param) {
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
        url: `${param.url}wolgadata_permissionstore.add.form`,
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
            dispatch('readPermissions', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    deletePermission({ dispatch }, param) {
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_permissionstore.delete/${param.id}`,
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
            dispatch('readPermissions', param.url)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // -------
    createRolesToPermission({ dispatch }, param) {
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
      const payloadForm = jsonformdata(param.param, options)
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_rolestopermission.add.form`,
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
    readRolesToPermission({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_rolestopermission.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setRolesToPermission', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line no-empty-pattern
    deleteRolesToPermission({ }, param) {
      const config = {
        method: 'post',
        url: `${param.url}wolgadata_rolestopermission.delete/${param.id}`,
        withCredentials: true,
        headers: {
          accept: 'text/plain',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => resolve(response.data.data))
          .catch(error => reject(error))
      })
    },
    // -------
    readSelectPermission({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_permissionstore.list.all?solution=${param.solution}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      commit('setSelectPermission', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            if (response.data.data !== undefined) {
              commit('setSelectPermission', response.data.data)
            } else commit('setSelectPermission', [])
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
  },
}

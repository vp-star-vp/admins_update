import axios from '@/libs/axios'
import jsonformdata from 'json-form-data'
// import jsonformdata from 'json-form-data'

export default {
  namespaced: true,
  state: {
    users: [],
    userRoles: [],
    userPermissions: [],
  },
  getters: {
    getUsers(state) {
      return state.users
    },
    getUserRoles: state => id => {
      if (id !== undefined || id !== null) {
        return state.userRoles.filter(item => item.userId === id)
      }
      return []
    },
    getUserPermissions: state => state.userPermissions,
  },
  mutations: {
    setUsers(state, users) {
      state.users = users
    },
    setUserRoles(state, ur) {
      state.userRoles = ur
    },
    setUserPermissions(state, perm) {
      state.userPermissions = perm
    },
  },
  actions: {
    readUser({ commit }, url) {
      const config = {
        method: 'get',
        url: `${url}wolgadata_registrationinfo.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      commit('setUsers', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setUsers', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line no-empty-pattern
    getFotoUser({}, param) {
      const config = {
        method: 'get',
        url: `${param.url}/wolgadata_emploeeinfo.photo/${param.id}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }

      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line no-empty-pattern
    createRolesToUser({}, param) {
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
        url: `${param.url}wolgadata_rolestousers.add.form`,
        withCredentials: true,
        data: payloadForm,
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
    readRolesToUser({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_rolestousers.list`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setUserRoles', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line no-empty-pattern
    deleteRolesToUser({}, param) {
      const config = {
        method: 'post',
        url: `${param.url}/wolgadata_rolestousers.delete/${param.id}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            // commit('setUserRoles', response.data.data)
            resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    //
    readPermissionsToUser({ commit }, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_permissionstore.list.byuser/${param.id}`,
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      }
      commit('setUserPermissions', [])
      return new Promise((resolve, reject) => {
        axios(config)
          .then(response => {
            commit('setUserPermissions', response.data.data)
            return resolve(response.data.data)
          })
          .catch(error => reject(error))
      })
    },
    // eslint-disable-next-line no-empty-pattern
    emplInfo({}, param) {
      const config = {
        method: 'get',
        url: `${param.url}wolgadata_emploeeinfo.id/${param.id}`,
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

  },
}

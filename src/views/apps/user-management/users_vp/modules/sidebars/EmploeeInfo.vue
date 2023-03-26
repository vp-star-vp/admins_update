<template>
  <pre>
   {{ emplInfo }}
 </pre>
</template>

<script>
import store from '@/store/index'

export default {
  name: 'EmploeeInfo',
  components: {
  },
  props: {
    selectedUser: {
      type: Object,
      default: () => ({
        id: '',
        description: '',
        url: '',
        paramGroupId: null,
        name: '',
        active: true,
        createDate: null,
        bitrixId: 0,
      }),
    },
  },
  data() {
    return {
      emplInfo: {},
    }
  },
  watch: {
    selectedUser(newVal) {
      // const newSite = JSON.parse(JSON.stringify(newVal))
      this.readSite2App(newVal)
    },
  },
  methods: {
    async readSite2App(param) {
      await store.dispatch('userManagement/usersVp/emplInfo', { url: store.getters.USER_STATE_FULL.url, id: param.emploeeId })
        .then(response => { this.emplInfo = response })
    },
  },
}
</script>

<style scoped>
.bt-add{
  margin-top: 22px;
}
</style>

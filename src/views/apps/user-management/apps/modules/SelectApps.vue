<template>
  <b-row>
    <b-col md="12">
      <b-form-group>
        <label>Приложение</label>
        <v-select
          v-model="appDefault"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="$store.getters['userManagement/apps/getSelectApp']"
          label="id"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script>

import { BRow, BCol, BFormGroup } from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store/index'

export default {
  name: 'SelectApps',
  components: {
    BRow,
    BCol,
    BFormGroup,
    vSelect,
  },
  props: {
    appDefault: {
      type: String,
    },
  },
  data() {
    return {
      selected: undefined,
    }
  },
  watch: {
    appDefault: {
      handler(newVal) {
        this.$emit('update', newVal)
      },
      deep: true,
    },
  },
  mounted() {
    this.selectApp()
  },
  methods: {
    async selectApp() {
      await store.dispatch('userManagement/apps/getSelectApp', { url: store.getters.USER_STATE_FULL.url })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

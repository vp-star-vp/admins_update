<template>
  <b-row>
    <b-col md="12">
      <b-form-group>
        <label>Разрешения для приложения <b>  {{ solution }} </b>:</label>
        <v-select
          v-if="$store.getters['userManagement/permissionsVp/getSelectPermission'].length > 0"
          v-model="permission"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="$store.getters['userManagement/permissionsVp/getSelectPermission']"
          label="Name"
        />
        <div v-else>
          <b-badge
            class="badge-glow"
            variant="warning"
          >
            <feather-icon icon="AlertTriangleIcon" />
            Нет связанных разрешений
          </b-badge>
        </div>
      </b-form-group>
    </b-col>
  </b-row>
</template>
<script>

import {
  BRow, BCol, BFormGroup, BBadge,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'

export default {
  name: 'SelectPermissions',
  components: {
    BRow,
    BCol,
    BFormGroup,
    vSelect,
    BBadge,
  },
  props: {
    solution: {
      type: String,
      default: '',
    },
    permission: {
      type: String,
      default: '',
    },
  },
  watch: {
    solution: {
      handler() {
        this.permission = ''
        this.selectPermission()
      },
      deep: true,
    },
    permission: {
      handler(newVal) {
        this.$emit('update', newVal)
      },
      deep: true,
    },
  },
  methods: {
    async selectPermission() {
      await store.dispatch('userManagement/permissionsVp/readSelectPermission', { url: store.getters.USER_STATE_FULL.url, solution: this.solution })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

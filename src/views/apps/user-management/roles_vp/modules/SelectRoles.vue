<template>
  <b-row>
    <b-col md="12">
      <b-form-group v-if="solution!==undefined && solution!==''">
        <label>Роль </label>
        <v-select
          v-if="$store.getters['userManagement/rolesVp/getSelectRoles'](solution).length > 0"
          v-model="permission"
          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
          :options="$store.getters['userManagement/rolesVp/getSelectRoles'](solution)"
          label="name"
        />
        <div v-else>
          <b-badge
            class="badge-glow"
            variant="warning"
          >
            <feather-icon icon="AlertTriangleIcon" />
            Для приложения, нет ролей
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
  mounted() {
    this.selectPermission()
  },
  methods: {
    async selectPermission() {
      console.log(' ++++ ***** setSelectRoles --- ')
      await store.dispatch('userManagement/rolesVp/getSelectRole', { url: store.getters.USER_STATE_FULL.url })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

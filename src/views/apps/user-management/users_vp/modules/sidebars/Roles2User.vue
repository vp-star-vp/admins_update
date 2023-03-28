<template>
  <div>
    <b-form-group v-if="$can('create','users.roles.create')">
      <b-row>
        <b-col cols="4">
          <SelectAppsV2 @update="setSelectSolution" />
        </b-col>
        <b-col cols="5">
          <SelectRoles
            :solution="selectSolution"
            @update="setSelectRole"
          />
        </b-col>
        <b-col cols="3">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            :disabled="selectRole.id === undefined || selectRole.id === ''"
            class="bt-add"
            variant="primary"
            @click="addRolesToUser()"
          >
            Добавить
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
    <b-table
      :fields="columns"
      :items="$store.getters['userManagement/usersVp/getUserRoles'](selectedUser.id)"
      :sort-desc="true"
      no-border-collapse
      responsive
      show-empty
    >
      <template #cell(name)="data">
        <p class="role">
        <feather-icon icon="UsersIcon" />
        {{ data.value }}
        </p>
      </template>
      <template #cell(active)="data">
        <p class="other">
          {{ data.value }}
        </p>
      </template>
      <template #cell(action)="data">
        <b-row>
          <b-col
            align="right"
            cols="12"
          >
            <b-dropdown
              v-b-tooltip.hover
              class="ml-75"
              no-caret
              right
              title="Настройки cвязи"
              toggle-class="p-0"
              variant="link"
            >
              <template #button-content>
                <feather-icon
                  color="#6e6b7b"
                  icon="SettingsIcon"
                  size="14"
                />
              </template>
              <b-dropdown-item
                v-if="$can('create', 'user.role.add')"
                v-b-toggle.sidebar-remove
                @click="delRolesToUser(data.item.id)"
              >
                <feather-icon
                  icon="TrashIcon"
                />
                <span class="align-middle ml-50">Удаление </span>
              </b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
      </template>
    </b-table>
  </div>
</template>

<script>
import store from '@/store/index'
import {
  BTable,
  BButton,
  BFormGroup,
  BDropdown,
  BDropdownItem,
  VBToggle,
  BRow,
  BCol,
} from 'bootstrap-vue'
import SelectAppsV2 from '@/views/apps/user-management/apps/modules/SelectAppsV2.vue'
import SelectRoles from '@/views/apps/user-management/roles_vp/modules/SelectRoles.vue'
import Ripple from 'vue-ripple-directive'

export default {
  name: 'SidebarSite2App',
  components: {
    BTable,
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BDropdown,
    BDropdownItem,
    SelectAppsV2,
    SelectRoles,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
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
      site: {
        id: '',
        description: '',
        url: '',
        paramGroupId: null,
        name: '',
        active: true,
        createDate: null,
        bitrixId: 0,
      },
      columns: [
        {
          label: 'name',
          key: 'name',
          sortable: true,
        },
        {
          label: 'active',
          key: 'active',
          sortable: false,
        },
        {
          label: '',
          key: 'action',
        },
      ],
      selected: {},
      selectSolution: '',
      selectRole: '',
    }
  },
  watch: {
    selectedUser(newVal) {
      const newSite = JSON.parse(JSON.stringify(newVal))
      this.site = newSite
      this.selected = {}
      this.readSite2App()
    /*  this.selectApp() */
    },
  },
  methods: {
    readSite2App() {
      store.dispatch('userManagement/usersVp/readRolesToUser', { url: store.getters.USER_STATE_FULL.url })
    },
    // todo
    add() {
      this.$emit('create-site2-app', JSON.parse(JSON.stringify(this.site)))
      this.$root.$emit('bv::toggle::collapse', 'sidebar-site2-app')
    },
    clear() {
      this.site.name = ''
      this.site.routeName = ''
      this.site.props = []
    },
    async addRolesToUser() {
      await store.dispatch('userManagement/usersVp/createRolesToUser', {
        url: store.getters.USER_STATE_FULL.url,
        param: {
          roleId: this.selectRole.id,
          userId: this.selectedUser.id,
          name: `${this.selectSolution}.${this.selectRole.name}`,
          active: true,
        },
      })
      this.readSite2App()
      this.selected = {}
    },
    async delRolesToUser(id) {
      await store.dispatch('userManagement/usersVp/deleteRolesToUser', {
        url: store.getters.USER_STATE_FULL.url,
        id,
      })
      this.readSite2App()
    },
    setSelectSolution(val) {
      this.selectSolution = val
    },
    setSelectRole(val) {
      this.selectRole = val
    },
  },
}
</script>

<style scoped>
.bt-add{
  margin-top: 22px;
}
.role{
  color: #292080;
  font-weight: 450;
  font-size: 12px;
}
.other{
  font-size: 12px;
}
</style>

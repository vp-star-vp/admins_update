<template>
  <b-sidebar
    id="sidebar-site2-app"
    backdrop
    bg-variant="white"
    right
    shadow
    width="1000px"
  >
    <div class="px-3 py-2">
      <b-card>
      <b-row>
        <b-col cols="5">
<!--          <h6> <feather-icon
            icon="ZapIcon"
            size="14"
          /> Список разрешений</h6>-->

          <label>роль</label>
          <h3> <feather-icon
              icon="UsersIcon"
          /> {{ selectedSite.name }}</h3>
        </b-col>
        <b-col cols="7">
          <b-form-group>
            <b-row>
              <b-col cols="8">
                <SelectPermission
                  :solution="selectedSite.solutionId"
                  @update="permissinToSelect"
                />
              </b-col>
              <b-col cols="4">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  :disabled="selected.Id===undefined"
                  size="sm"
                  style="margin-top: 30px;"
                  variant="primary"
                  @click="addPermissToRole()"
                >
                  Добавить
                </b-button>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        v-if="selectedSite.id!== undefined"
        :fields="columns"
        :items="$store.getters['userManagement/permissionsVp/getRolesToPermission'](selectedSite.id)"
        :sort-desc="true"
        no-border-collapse
        responsive
        show-empty
      >
        <template #cell(name)="data">
          <feather-icon icon="ZapIcon" /> {{ data.item.name }}
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
                  v-b-toggle.sidebar-remove
                  :disabled="!$can('apps-delete', $store.getters.USER_STATE_FULL.userRole)"
                  @click="delAppToSie(data.item.id)"
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
      </b-card>
    </div>
  </b-sidebar>
</template>

<script>
import store from '@/store/index'
import { mapGetters } from 'vuex'
import {
  BCard,
  BTable,
  BSidebar,
  BButton,
  BFormGroup,
  // BCardText,
  BDropdown,
  BDropdownItem,
  VBToggle,
  BRow,
  BCol,
} from 'bootstrap-vue'
import SelectPermission from '@/views/apps/user-management/permissions_vp/modules/SelectPermissions.vue'

export default {
  name: 'SidebarSite2App',
  components: {
    BCard,
    BTable,
    BSidebar,
    BButton,
    BRow,
    BCol,
    BFormGroup,
    // BCardText,
    BDropdown,
    BDropdownItem,
    SelectPermission,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    selectedSite: {
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
  computed: {
    ...mapGetters({
      rows: 'userManagement/apps/getSite2App',
    }),
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
          label: 'id',
          key: 'id',
          sortable: true,
        },
        {
          label: 'permissionId',
          key: 'permissionId',
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
    }
  },
  watch: {
    selectedSite(newVal) {
      const newSite = JSON.parse(JSON.stringify(newVal))
      this.site = newSite
      this.selected = {}
      this.readPermiss2Role()
    },
  },
  methods: {
    async readPermiss2Role() {
      await store.dispatch('userManagement/permissionsVp/readRolesToPermission', { url: store.getters.USER_STATE_FULL.url })
    },
    add() {
      this.$emit('create-site2-app', JSON.parse(JSON.stringify(this.site)))
      this.$root.$emit('bv::toggle::collapse', 'sidebar-site2-app')
    },
    clear() {
      this.site.name = ''
      this.site.routeName = ''
      this.site.props = []
      this.selected = {}
    },
    async addPermissToRole() {
      await store.dispatch('userManagement/permissionsVp/createRolesToPermission', {
        url: store.getters.USER_STATE_FULL.url,
        param: {
          roleId: this.selectedSite.id,
          permissionId: this.selected.Id,
          name: this.selected.Name,
          active: true,
        },
      })
      this.readPermiss2Role()
      this.selected = {}
    },
    async delAppToSie(id) {
      await store.dispatch('userManagement/permissionsVp/deleteRolesToPermission', {
        url: store.getters.USER_STATE_FULL.url,
        id,
      })
      await this.readPermiss2Role()
    },
    permissinToSelect(val) {
      this.selected = val
    },
  },
}
</script>

<style scoped>

</style>

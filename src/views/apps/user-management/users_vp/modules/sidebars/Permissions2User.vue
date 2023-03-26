<template>
  <!--  :fields="columns"-->
  <div>
    <b-row>
      <b-col cols="4">
        <b-form-input
          v-model="search"
        />
      </b-col>
      <b-col cols="2">
        <b-button
          variant="flat-primary"
          @click="readSite2App()"
        >
          <feather-icon
            class="text-muted"
            icon="RefreshCwIcon"
          />
        </b-button>
      </b-col>
    </b-row>
    <b-table
      :fields="columns"
      :filter="search"
      :items="$store.getters['userManagement/usersVp/getUserPermissions']"
      :sort-desc="true"
      no-border-collapse
      show-empty
      style="margin-top: 10px"
    >
      <template #cell(name)="data">
        <p class="user">
          <feather-icon icon="ZapIcon" />
          {{ data.value }}
        </p>
      </template>
      <template #cell(SolutionId)="data">
        <p class="app">
          <feather-icon icon="TrelloIcon" />
          {{ data.value }}
        </p>
      </template>
      <template #cell(Description)="data">
        <p class="other">
          {{ data.value }}
        </p>
      </template>
      <template #cell(PermissionType)="data">
        <p class="other">
          {{ data.value }}
        </p>
      </template>
    </b-table>

  </div>
</template>

<script>
import store from '@/store/index'
import {
  BButton,
  BFormInput,
  BTable,
  BRow, BCol,
  VBToggle,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  name: 'SidebarSite2App',
  components: {
    BTable,
    BButton,
    BFormInput,
    BRow,
    BCol,
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
          label: 'Разрешение',
          key: 'Name',
          sortable: true,
        },
        {
          label: 'Приложение',
          key: 'SolutionId',
          sortable: true,
        },
        {
          label: 'Описание',
          key: 'Description',
          sortable: true,
        },
        {
          label: 'Тип',
          key: 'PermissionType',
          sortable: true,
        },

      ],
      selected: {},
      selectSolution: '',
      selectRole: '',
      search: '',
    }
  },
  watch: {
    selectedUser(newVal) {
      const newSite = JSON.parse(JSON.stringify(newVal))
      this.site = newSite
      this.selected = {}
      this.readSite2App()
    },
  },
  methods: {
    readSite2App() {
      store.dispatch('userManagement/usersVp/readPermissionsToUser', { url: store.getters.USER_STATE_FULL.url, id: this.selectedUser.id })
    },
    clear() {
      this.site.name = ''
      this.site.routeName = ''
      this.site.props = []
    },
  },
}
</script>

<style scoped>
.bt-add{
  margin-top: 22px;
}
.sid{
  font-size: 12px;
}
.permiss{
  color: #292080;
  font-weight: 450;
  font-size: 12px;
}
.app{
  color: #292080;
  font-weight: 400;
  font-size: 12px;
}
.other{
  font-size: 12px;
}
</style>

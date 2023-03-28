<template>
  <div>
    <div class="grid">
      <b-card>
        <Header
          @inputText="getInputText"
          @update="read"
        />
      </b-card>
      <b-card >
        <app-table
          :rows="rows"
          :search-term="search"
          :window-width="windowWidth"
          @delete="deleteApp"
          @pickApp="pickApp"
        />
      </b-card>
    </div>
    <sidebar-view
      :selected-site="selectedSite"
    />
    <sidebar-edit
      :selected-site="selectedSite"
      @update="updateApp"
    />
    <sidebar-add
      @create="createApp"
    />
    <SidebarRole2Permission
      :selected-site="selectedSite"
      @create-site2-app="addTodo"
    />
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'

import {
  BCard,
  VBToggle,
} from 'bootstrap-vue'

// eslint-disable-next-line no-unused-vars
import store from '@/store/index'
import { mapGetters } from 'vuex'

import AppTable from './modules/Table.vue'
import Header from './modules/Header.vue'
import SidebarView from './modules/sidebars/SidebarView.vue'
import SidebarEdit from './modules/sidebars/SidebarEdit.vue'
import SidebarAdd from './modules/sidebars/SidebarAdd.vue'
import SidebarRole2Permission from './modules/sidebars/SidebarRole2Permission.vue'

export default {
  components: {
    BCard,
    AppTable,
    Header,
    SidebarView,
    SidebarEdit,
    SidebarAdd,
    SidebarRole2Permission,
  },
  directives: {
    'b-toggle': VBToggle,
  },

  computed: {
    ...mapGetters({
      rows: 'userManagement/rolesVp/getRoles',
    }),
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  data() {
    return {
      search: '',
      selectedSite: {
        id: '',
        description: '',
        url: '',
        paramGroupId: null,
        name: '',
        active: true,
        createDate: null,
        bitrixId: 0,
      },
    }
  },

  methods: {
    getInputText(ev) {
      this.search = ev
    },
    async createApp(site) {
      await store.dispatch('userManagement/rolesVp/createRole', { url: store.getters.USER_STATE_FULL.url, site })
      await this.read()
    },
    async updateApp(site) {
      await store.dispatch('userManagement/rolesVp/updateRole', { url: store.getters.USER_STATE_FULL.url, site })
      await this.read()
    },
    async deleteApp(siteId) {
      await store.dispatch('userManagement/rolesVp/deleteRole', { url: store.getters.USER_STATE_FULL.url, id: siteId })
      await this.read()
    },
    read() {
      store.dispatch('userManagement/rolesVp/readRole', store.getters.USER_STATE_FULL.url)
    },
    pickApp(data) {
      this.selectedSite = data
    },
  },
  setup() {
    const windowWidth = ref(window.innerWidth)
    const onResize = () => {
      windowWidth.value = window.innerWidth
    }
    store
      .dispatch('userManagement/rolesVp/readRole', store.getters.USER_STATE_FULL.url)
      .catch(() => {
        // console.log('ошибка получения данных')
      })
    return {
      onResize,
      windowWidth,
    }
  },
}
</script>

<style>

</style>

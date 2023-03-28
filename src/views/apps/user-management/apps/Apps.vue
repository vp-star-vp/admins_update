<template>
  <div>
    <div class="grid">
      <b-card>
        <Header
          @inputText="getInputText"
          @update="readSite"
        />
      </b-card>
      <b-card>
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
      :selected-app="selectedApp"
    />
    <sidebar-edit
      :selected-app="selectedApp"
      @update="updateApp"
    />
    <sidebar-add
      @create="createApp"
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

export default {
  components: {
    BCard,
    AppTable,
    Header,
    SidebarView,
    SidebarEdit,
    SidebarAdd,
  },
  directives: {
    'b-toggle': VBToggle,
  },

  computed: {
    ...mapGetters({
      rows: 'userManagement/apps/getApps',
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
      selectedApp: {
        name: '',
        routeName: '',
        props: [],
      },
    }
  },

  methods: {
    getInputText(ev) {
      this.search = ev
    },
    createApp(app) {
      store.dispatch('userManagement/apps/createApp', { url: store.getters.USER_STATE_FULL.url, app })
    },
    updateApp(app) {
      store.dispatch('userManagement/apps/updateApp', { url: store.getters.USER_STATE_FULL.url, app })
    },
    deleteApp(appId) {
      store.dispatch('userManagement/apps/deleteApp', { url: store.getters.USER_STATE_FULL.url, id: appId })
    },
    readSite() {
      store.dispatch('userManagement/apps/readApps', store.getters.USER_STATE_FULL.url)
    },
    pickApp(data) {
      this.selectedApp = data
    },
  },

  setup() {
    const windowWidth = ref(window.innerWidth)

    const onResize = () => {
      windowWidth.value = window.innerWidth
    }

    store
      .dispatch('userManagement/apps/readApps', store.getters.USER_STATE_FULL.url)
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

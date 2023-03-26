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
      <label>сайт</label>
      <h3>{{ selectedSite.name }}</h3>

      <b-card-text>
        <span>Выбери приложение и нажми кнопку <b>добавить</b>.  </span>
        <!--        <code>приложение</code>-->
      </b-card-text>
      <b-form-group>
        <b-row>
          <b-col cols="8">
            <v-select
              v-model="selected"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="$store.getters['userManagement/apps/getSelectApp']"
              label="id"
            />
          </b-col>
          <b-col cols="4">
            <b-button
              :disabled="selected.id===undefined"
              @click="addAppToSie()"
            >
              Добавить
            </b-button>
          </b-col>
        </b-row>
      </b-form-group>
      <b-row v-if="1===3">
        <b-col cols="2">
          <div class="link-buttons">
            <b-button
              @click="add"
            >
              Изменить
            </b-button>
            <b-button
              v-b-toggle.sidebar-site2-app
            >
              Закрыть
            </b-button>
          </div>
        </b-col>
      </b-row>
      <br>
      <h6> <feather-icon
        icon="GitMergeIcon"
        size="14"
      /> Список приложений</h6>
      <br>
      <b-table
        :fields="columns"
        :items="$store.getters['userManagement/apps/getSite2App'](selectedSite.id)"
        :sort-desc="true"
        no-border-collapse
        responsive
        show-empty
      >
        <template #table-colgroup="scope">
          <col
            v-for="field in scope.fields"
            :key="field.key"
            :style="{ width: field.key === 'name' ? '100px' : '30px' }"
          >
        </template>
        <template #cell(solutionId)="data">
          <feather-icon icon="TrelloIcon" />
          {{ data.value }}
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
    </div>
  </b-sidebar>
</template>

<script>
import store from '@/store/index'
import { mapGetters } from 'vuex'
import {
  BTable,
  BSidebar,
  BButton,
  BFormGroup,
  BCardText,
  BDropdown,
  BDropdownItem,
  VBToggle,
  BRow,
  BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  name: 'SidebarSite2App',
  components: {
    BTable,
    BSidebar,
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BCardText,
    BDropdown,
    BDropdownItem,
    vSelect,
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
          label: 'APP_ID',
          key: 'solutionId',
          sortable: true,
        },
        /* {
          label: 'id',
          key: 'id',
          sortable: true,
        }, */
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
    }
  },
  watch: {
    selectedSite(newVal) {
      const newSite = JSON.parse(JSON.stringify(newVal))
      this.site = newSite
      this.selected = {}
      this.readSite2App()
      this.selectApp()
    },
  },
  methods: {
    readSite2App() {
      store.dispatch('userManagement/apps/readApp2Site', { url: store.getters.USER_STATE_FULL.url })
    },
    selectApp() {
      store.dispatch('userManagement/apps/getSelectApp', { url: store.getters.USER_STATE_FULL.url })
    },
    add() {
      this.$emit('create-site2-app', JSON.parse(JSON.stringify(this.site)))
      this.$root.$emit('bv::toggle::collapse', 'sidebar-site2-app')
    },
    clear() {
      this.site.name = ''
      this.site.routeName = ''
      this.site.props = []
    },
    async addAppToSie() {
      await store.dispatch('userManagement/apps/createApp2Site', {
        url: store.getters.USER_STATE_FULL.url,
        param: {
          solutionId: this.selected.id,
          siteId: this.selectedSite.id,
          name: this.selected.name,
          active: true,
        },
      })
      this.readSite2App()
      this.selected = {}
    },
    async delAppToSie(id) {
      await store.dispatch('userManagement/apps/deleteApp2Site', {
        url: store.getters.USER_STATE_FULL.url,
        id,
      })
      this.readSite2App()
    },
  },
}
</script>

<style scoped>

</style>

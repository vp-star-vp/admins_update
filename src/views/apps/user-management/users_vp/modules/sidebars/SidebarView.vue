<template>
  <!-- sidebar view -->
  <b-sidebar
    id="sidebar-view"
    backdrop
    bg-variant="white"
    right
    shadow
    width="1350px"
  >
    <div class="sidebar-edit">
      <b-tabs>
        <b-tab active>
          <template #title>
            <feather-icon icon="HomeIcon" />
            <span>Основная</span>
          </template>
          <b-card-text>
            <b-row>
              <b-col cols="8">
                <b-card>
                  <h3>Роли пользователя</h3>
                  <Roles2User :selected-user="selectedSite" />
                </b-card>
              </b-col>
              <b-col cols="4">
                <b-card>
                  <h3>{{ selectedSite.name }}</h3>
                  <b-img
                    v-if="url.length > 0"
                    :src="url"
                    fluid
                    thumbnail
                    width="150px"
                  />
                </b-card>
                <b-card>
                  <h5>Зарегистрирован. инф. </h5>
                  <pre style="font-size: 11px;">
                 {{ selectedSite }}
            </pre>
                </b-card>
              </b-col>
            </b-row>
          </b-card-text>
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="ZapIcon" />
            <span>Разрешения</span>
          </template>
          <b-card>
            <Permissions2User :selected-user="selectedSite" />
            </b-card>
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="UserIcon" />
            <span>Информ. о сотруднике</span>
          </template>
          <b-card-text>
            <b-card>
            <EmploeeInfo :selected-user="selectedSite" />
            </b-card>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </div>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BCard,
  BImg,
  BRow,
  BCol,
  BTabs, BTab,
  VBToggle,

} from 'bootstrap-vue'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import Roles2User from './Roles2User.vue'
import Permissions2User from './Permissions2User.vue'
import EmploeeInfo from './EmploeeInfo.vue'

export default {
  components: {
    BSidebar,
    BCard,
    BImg,
    BRow,
    BCol,
    Roles2User,
    Permissions2User,
    EmploeeInfo,
    BTabs,
    BTab,
  },
  directives: {
    'b-toggle': VBToggle,
    Ripple,
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
  data() {
    return {
      url: '',
    }
  },
  computed: {
    app() {
      return this.selectedSite
    },
  },
  watch: {
    selectedSite(newVal) {
      const newSite = JSON.parse(JSON.stringify(newVal))
      this.site = newSite
      this.getAvatar()
    },
  },
  methods: {
    async getAvatar() {
      this.url = ''
      await store
        .dispatch('userManagement/usersVp/getFotoUser', { url: store.getters.USER_STATE_FULL.url, id: this.selectedSite.email })
        .then(response => {
          if (response.data && response.data !== '') {
            this.url = response.data
          }
        })
        .catch(() => {
          console.log('ошибка получения данных')
        })
    },
  },

}
</script>

<style scoped>
.sidebar-edit {
  padding: 1em;
}
.link-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.link-text svg {
  margin-bottom: 0.5rem;
}
.link-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}
.vs__actions {
  padding: 0;
}

.mb-0 {
  margin-bottom: 0;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>

<template>
  <b-table
    :busy="busy"
    :fields="columns"
    :filter="searchTerm"
    :items="rows"
    :sort-desc="true"
    no-border-collapse
    responsive
    show-empty
  >
    <!--    sticky-header="clamp(10vh, 55vh, 55vh)"-->
    <template #cell(id)="data">
      <p class="site">
        <feather-icon icon="GlobeIcon" />
        {{ data.value }}
      </p>
    </template>
    <template #cell(name)="data">
      <div class="other">
        <b-link
          :href="data.item.url"
          target="_blank"
        >
          <feather-icon icon="ExternalLinkIcon" /> {{ data.item.name }}
        </b-link>
      </div>
    </template>
    <template #cell(description)="data">
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
            title="Настройки сайта"
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
              v-b-toggle.sidebar-view
              :disabled="!$can('apps-read', $store.getters.USER_STATE_FULL.userRole)"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="EyeIcon"
              />
              <span class="align-middle ml-50">Просмотр </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-edit
              :disabled="!$can('apps-update', $store.getters.USER_STATE_FULL.userRole)"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="Edit2Icon"
              />
              <span class="align-middle ml-50">Редактирование </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-if="$can('delete', 'site')"
              v-b-toggle.sidebar-remove
              @click="deleteApp(data.item)"
            >
              <feather-icon
                icon="TrashIcon"
              />
              <span class="align-middle ml-50">Удаление </span>
            </b-dropdown-item>
            <hr>
            <b-dropdown-item
              v-b-toggle.sidebar-site2-app
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="TrelloIcon"
              />
              <span class="align-middle ml-50">Приложения </span>
            </b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </template>
  </b-table>
</template>

<script>
import {
  BTable,
  // BButtonGroup,
  // BButton,
  BLink,
  BDropdown,
  VBToggle,
  BDropdownItem,
  VBTooltip,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BLink,
    BDropdown,
    BDropdownItem,
  },
  directives: {
    'b-toggle': VBToggle,
    'b-tooltip': VBTooltip,
  },

  props: {
    busy: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Array,
      default() {
        return []
      },
    },
    windowWidth: {
      type: Number,
      default: window.innerWidth,
    },
    searchTerm: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      // minWidth: 200,
      columns: [
        {
          label: 'id',
          key: 'id',
          sortable: true,
        },
        {
          label: 'Cайт',
          key: 'name',
          sortable: true,
        },
        /*  {
          label: 'url',
          key: 'url',
          sortable: false,
        }, */
        {
          label: 'description',
          key: 'description',
          sortable: true,
        },
        /*   {
          label: 'apps',
          key: 'appscnt',
          sortable: false,
        }, */
        {
          label: 'site action',
          key: 'action',
          sortable: false,
        },

      ],
    }
  },
  methods: {
    deleteApp(appId) {
      this.$emit('delete', appId.id)
    },
  },

}
</script>

<style>
.site{
  color: #292080;
  font-weight: 450;
  font-size: 13px;
}
.app{
  color: #292080;
  font-weight: 400;
  font-size: 13px;
}
.other{
  font-size: 13px;
}
</style>

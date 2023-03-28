<template>
  <b-table
    :fields="columns"
    :filter="searchTerm"
    :items="rows"
    :sort-desc="true"
    hover
    no-border-collapse
    responsive
    show-empty
    sticky-header="clamp(10vh, 80vh, 70vh)"
    style="min-height:clamp(10vh, 80vh, 70vh)"
  >
    <!--    sticky-header="clamp(10vh, 55vh, 55vh)"-->
    <template #cell(id)="data">
      <p class="app">
        <feather-icon icon="TrelloIcon" />
        {{ data.value }}
      </p>
    </template>
    <template #cell(name)="data">
      <p class="app2">
        {{ data.value }}
      </p>
    </template>
    <template #cell(support)="data">
      <div class="other">
        <feather-icon
          v-if="data.value"
          icon="CheckIcon"
        />
      </div>
    </template>
    <template #cell(url)="data">
      <p class="other">
        {{ data.value }}
      </p>
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
              :disabled="!$can('read', 'apps.read')"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="EyeIcon"
              />
              <span class="align-middle ml-50">Просмотр </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-edit
              :disabled="!$can('update', 'apps.update')"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="Edit2Icon"
              />
              <span class="align-middle ml-50">Редактирование </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-remove
              :disabled="!$can('delete', 'apps.delete')"
              @click="deleteApp(data.item)"
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
</template>

<script>
import {
  BTable,
  BDropdown,
  BDropdownItem,
  VBToggle,
  // BBadge,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BDropdown,
    BDropdownItem,
    // BBadge,
  },
  directives: {
    'b-toggle': VBToggle,
  },

  props: {
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
      // minWidth: 100,
      columns: [
        {
          label: 'id',
          key: 'id',
          sortable: true,
        },
        {
          label: 'Имя',
          key: 'name',
          sortable: true,
        },
        {
          label: 'url',
          key: 'url',
          sortable: false,
        },
        {
          label: 'support',
          key: 'support',
          sortable: true,
        },
        {
          label: 'description',
          key: 'description',
          sortable: true,
        },
        {
          label: 'Управление',
          key: 'action',
          sortable: false,
        },
      ],
    }
  },
  methods: {
    deleteApp(app) {
      this.$emit('delete', app.id)
    },
  },
}
</script>

<style>
.app{
  color: #292080;
  font-weight: 500;
  font-size: 13px;
}
.app2{
  color: #292080;
  font-weight: 400;
  font-size: 13px;
}
.other{
  font-size: 13px;
}
</style>

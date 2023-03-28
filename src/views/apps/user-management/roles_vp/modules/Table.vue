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
    style="min-height: 300px;"
  >
    <template #table-colgroup="scope">
      <col
        v-for="field in scope.fields"
        :key="field.key"
        :style="{ width: field.key === 'description' ? '200px' : '40px' }"
      >
    </template>
    <template #cell(name)="data">
      <p class="roles">
        <feather-icon icon="UsersIcon" />
        {{ data.item.name }}
      </p>
    </template>
    <template #cell(solutionId)="data">
      <p class="app">
        <feather-icon icon="TrelloIcon" />
        {{ data.item.solutionId }}
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
              :disabled="!$can('read', 'roles.read')"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="EyeIcon"
              />
              <span class="align-middle ml-50">Просмотр </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-edit
              :disabled="!$can('update', 'roles.update')"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="Edit2Icon"
              />
              <span class="align-middle ml-50">Редактирование </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-remove
              :disabled="!$can('delete', 'roles.delete')"
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
              v-b-tooltip.hover
              :disabled="!$can('create', 'roles.permissions.create')"
              style="color: #ea5455"
              title="Настройки разрешений"
              variant="link"
              @click="$emit('pickApp', data.item)"
            >Настройка разрешений</b-dropdown-item>
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
  VBToggle,
  BDropdownItem,
  VBTooltip,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
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
      columns: [

        {
          label: 'Роль',
          key: 'name',
          sortable: true,
        },
        {
          label: 'Описание',
          key: 'description',
          sortable: true,
        },
        {
          label: 'Приложение',
          key: 'solutionId',
          sortable: true,
        },
        {
          label: 'настройка',
          key: 'action',
          sortable: false,
        },

      ],
    }
  },

  methods: {
    deleteApp(role) {
      this.$emit('delete', role.id)
    },
  },

}
</script>

<style>

.roles{
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

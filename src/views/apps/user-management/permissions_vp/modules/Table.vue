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
    sticky-header="clamp(10vh, 80vh, 70vh)"
    style="min-height:clamp(10vh, 80vh, 70vh)"
  >
    <template #cell(permissons)="data">
      <p
        v-b-toggle.sidebar-site2-app
        v-b-tooltip.hover
        style="color: #ea5455"
        title="Настройки разрешений"
        variant="link"
        @click="$emit('pickApp', data.item)"
      >
        <feather-icon
          color="#6e6b7b"
          icon="SettingsIcon"
          size="14"
        />
      </p>
    </template>
    <template #cell(name)="data">
      <p class="permiss">
        <feather-icon icon="ZapIcon" />
        {{ data.item.name }}
      </p>
    </template>
    <template #cell(functionalityName)="data">
      <p class="app">
        {{ data.value }}
      </p>
    </template>
    <template #cell(permissionType)="data">
      <b-badge
        v-if="data.value===0"
        variant="success"
      >
        create
      </b-badge>
      <b-badge
        v-if="data.value===1"
        variant="primary"
      >
        read
      </b-badge>
      <b-badge
        v-if="data.value===2"
        variant="info"
      >
        update
      </b-badge>
      <b-badge
        v-if="data.value===3"
        variant="danger"
      >
        delete
      </b-badge>
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
            title="Настройки"
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
              v-if="$can('read', 'permissions.read')"
              v-b-toggle.sidebar-view
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="EyeIcon"
              />
              <span class="align-middle ml-50">Просмотр </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-if="$can('update', 'permissions.update')"
              v-b-toggle.sidebar-edit
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="Edit2Icon"
              />
              <span class="align-middle ml-50">Редактирование </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-if="$can('delete', 'permissions.delete')"
              v-b-toggle.sidebar-remove
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
  VBToggle,
  BDropdownItem,
  BBadge,
  VBTooltip,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BDropdown,
    BDropdownItem,
    BBadge,
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
          label: 'Разрешение',
          key: 'name',
          sortable: true,
        },
        {
          label: ' Функ. имя',
          key: 'functionalityName',
          sortable: true,
        },
        {
          label: 'Разрешение',
          key: 'name',
          sortable: true,
        },
        {
          label: 'Описание',
          key: 'description',
          sortable: true,
        },
        {
          label: 'Тип',
          key: 'permissionType',
          sortable: true,
        },
        {
          label: 'Приложение',
          key: 'solutionId',
          sortable: true,
        },
        {
          label: 'Настройки',
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
.permiss{
  color: #292080;
  font-weight: 500;
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

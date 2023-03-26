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
    <!--    <template #cell(permissons)="data">
      <p
        v-b-toggle.sidebar-site2-app
        v-b-tooltip.hover
        style="color: #ea5455"
        variant="link"
        title="Настройки разрешений"
        @click="$emit('pickApp', data.item)"
      >

        <feather-icon
          color="#6e6b7b"
          icon="SettingsIcon"
          size="14"
        />
      </p>
      &lt;!&ndash;      <b-dropdown
        v-b-tooltip.hover
        variant="link"
        no-caret
        toggle-class="p-0"
        right
        class="ml-75"
        title="Настройка приложений"
      >
        <p>
          3
          <feather-icon
            color="#6e6b7b"
            icon="GitMergeIcon"
            size="14"
          />

        </p>

        <template #button-content>

          3
          <feather-icon
            color="#6e6b7b"
            icon="GitMergeIcon"
            size="14"
          />
        </template>
        <b-dropdown-item
          v-b-toggle.sidebar-site2-app
          :disabled="!$can('apps-read', $store.getters.USER_STATE_FULL.userRole)"
          @click="$emit('pickApp', data.item)"
        >
          <feather-icon
            icon="ListIcon"
          />
          <span class="align-middle ml-50">Привязанные приложения </span>
        </b-dropdown-item>
        <b-dropdown-item
          v-b-toggle.sidebar-view
          :disabled="!$can('apps-read', $store.getters.USER_STATE_FULL.userRole)"
          @click="$emit('pickApp', data.item)"
        >
          <feather-icon
            icon="PlusSquareIcon"
          />
          <span class="align-middle ml-50">Добавить приложение </span>
        </b-dropdown-item>
        <b-dropdown-item
          v-b-toggle.sidebar-view
          :disabled="!$can('apps-read', $store.getters.USER_STATE_FULL.userRole)"
          @click="$emit('pickApp', data.item)"
        >
          <feather-icon
            icon="MinusSquareIcon"
          />
          <span class="align-middle ml-50">Удалить приложение </span>
        </b-dropdown-item>
      </b-dropdown>&ndash;&gt;
      <div v-if="1===3">
        <p style="color: #ea5455">
          3
          <feather-icon
            icon="Share2Icon"
          />
        </p>
        <p> {{ data.item }} </p>
      </div>
    </template>-->
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
              v-if="$can('read', 'role.read')"
              v-b-toggle.sidebar-view
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="EyeIcon"
              />
              <span class="align-middle ml-50">Просмотр </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-edit
              :disabled="!$can('update', 'role.update')"
              @click="$emit('pickApp', data.item)"
            >
              <feather-icon
                icon="Edit2Icon"
              />
              <span class="align-middle ml-50">Редактирование </span>
            </b-dropdown-item>
            <b-dropdown-item
              v-b-toggle.sidebar-remove
              :disabled="!$can('delete', 'role.delete')"
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

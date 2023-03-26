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
    @row-selected="onRowSelected"
  >
    <!--    sticky-header="clamp(10vh, 55vh, 55vh)"-->

<!--    <template #table-busy>-->
      <!--      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle" />
        <strong> Загрузка...</strong>
      </div>-->
<!--    </template>-->
    <template #cell(id)="data">
      <p class="sid">
        {{ data.value }}
      </p>
    </template>
    <template #cell(email)="data">
      <p class="sid">
        {{ data.value }}
      </p>
    </template>
    <template #cell(email)="data">
      <p class="sid">
        {{ data.value }}
      </p>
    </template>
    <template #cell(defaultRBU)="data">
      <p class="sid">
        {{ data.value }}
      </p>
    </template>
    <!--    <template #cell(email)="data">
      <p class="sid">
        {{ data.value }}
      </p>
    </template>
    <template #cell(defaultRBU)="data">
      <p class="sid">
        {{ data.value }}
      </p>
    </template>-->
    <template #cell(name)="data">
      <p class="user">
        <feather-icon icon="UserIcon" /> {{ data.item.name }}
      </p>
      <!--      {{!$can('apps-read', $store.getters.USER_STATE_FULL.userRole)}}-->
    </template>
    <!--    :disabled="!$can('apps-read', $store.getters.USER_STATE_FULL.userRole)"-->
    <template #cell(action)="data">
      <b-row>
        <b-col
          align="right"
          cols="12"
        >
          <feather-icon
            v-b-toggle.sidebar-view
            v-b-tooltip.hover
            color="#6e6b7b"
            icon="SettingsIcon"
            size="14"
            title="Настройки пользователя"
            @click="$emit('pickApp', data.item)"
          />
        </b-col>
      </b-row>
    </template>
  </b-table>
</template>

<script>
import {
  BTable,
  VBToggle,
  VBTooltip,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
  },
  directives: {
    'b-toggle': VBToggle,
    'b-tooltip': VBTooltip,
  },

  props: {
    busy: {
      type: Boolean,
      default: true,
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
          label: 'Имя',
          key: 'name',
          sortable: true,
        },
        {
          label: 'id',
          key: 'id',
          sortable: true,
        },
        {
          label: 'email',
          key: 'email',
          sortable: true,
        },

        {
          label: 'defaultRBU',
          key: 'defaultRBU',
          sortable: true,
        },

        {
          label: 'action',
          key: 'action',
          sortable: false,
        },

      ],
    }
  },

  methods: {
    deleteApp(appId) {
      this.$emit('delete', appId)
    },
  },

}
</script>

<style>
/*.sid{
  font-size: 13px;
}*/
.user{
  color: #292080;
  font-weight: 500;
  font-size: 13px;
}
.sid{
  color: #292080;
  font-weight: 400;
  font-size: 13px;
}
</style>

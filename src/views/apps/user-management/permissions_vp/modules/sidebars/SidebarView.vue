<template>
  <!-- sidebar view -->
  <b-sidebar
    id="sidebar-view"
    backdrop
    bg-variant="white"
    right
    shadow
    width="600px"
  >
    <div class="sidebar-edit">
      <p> <feather-icon
        icon="EyeIcon"
        size="12"
      /> Разрешение</p>
      <hr>
      <b-form
        novalidate
        @submit.prevent
      >
        <b-row>
          <b-col cols="12">
            <b-form-group
              label="id"
              label-for="h-id"
            >
              <p
                id="h-id"
                class="text-primary"
                style="overflow-wrap: break-word"
              >
                {{ app.id }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="имя"
              label-for="h-name"
            >
              <p
                id="h-name"
                class="text-primary"
              >
                {{ app.name }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="URL"
              label-for="h-routeName"
            >
              <p
                id="h-routeName"
                class="text-primary"
                style="overflow-wrap: break-word"
              >
                {{ app.apiFunction }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="description"
              label-for="h-description"
            >
              <p
                id="h-description"
                class="text-primary"
                style="overflow-wrap: break-word"
              >
                {{ app.description }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="active"
              label-for="h-active"
            >
              <p
                id="h-active"
                class="text-primary"
                style="overflow-wrap: break-word"
              >
                {{ app.active }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="12">
            <b-form-group
              label="createDate"
              label-for="h-createDate"
            >
              <p
                id="h-createDate"
                class="text-primary"
                style="overflow-wrap: break-word"
              >
                {{ app.createDate }}
              </p>
            </b-form-group>
          </b-col>
          <b-col cols="12">
          <hr>
          <b-button
            v-b-toggle.collapse-1
            v-ripple.400="'rgba(113, 102, 240, 0.15)'"
            size="sm"
            variant="primary"
          >

            JSON
          </b-button>
          </b-col>
          <b-col cols="12">
          <b-collapse
            id="collapse-1"
            class="mt-2"
          >
            <pre>
          {{ selectedSite }}
            </pre>
          </b-collapse>
          </b-col>
        </b-row>
      </b-form>
      <hr>
    </div>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BCollapse,
  BButton,
  VBToggle,
  BFormGroup,
  BRow,
  BCol,
  BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BSidebar,
    BCollapse,
    BButton,
    BFormGroup,
    BRow,
    BCol,
    BForm,
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
  computed: {
    app() {
      return this.selectedSite
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

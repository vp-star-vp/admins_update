<template>
  <!-- sidebar edit -->
  <b-sidebar
    id="sidebar-edit"
    backdrop
    bg-variant="white"
    right
    shadow
  >
    <div class="sidebar-edit">
      <p>  <feather-icon
        icon="EditIcon"
        size="16"
      /> Редактирование</p>
      <hr>
      <validation-observer ref="simpleRulesEdit">
        <b-form
          novalidate
          @submit.prevent
        >
          <b-row>

            <b-col cols="12">
              <b-form-group
                label="ID"
                label-for="h-id"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Add1"
                  rules="required"
                >
                  <b-form-input
                    id="h-id"
                    v-model="app.id"
                    :state="errors.length > 0 ? false:null"
                    placeholder="app_id"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Имя приложения"
                label-for="h-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Add2"
                  rules="required"
                >
                  <b-form-input
                    id="h-name"
                    v-model="app.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="app_name"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="URL"
                label-for="h-url"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Add3"
                  rules="required"
                >
                  <b-form-input
                    id="h-url"
                    v-model="app.url"
                    :state="errors.length > 0 ? false:null"
                    placeholder="app_url"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group>
                <b-form-checkbox
                  v-model="app.support"
                  :indeterminate.sync="indeterminate"
                >
                  Support
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Описание"
                label-for="h-url"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Add4"
                  rules="required"
                >
                  <b-form-textarea
                    id="h-description"
                    v-model="app.description"
                    :state="errors.length > 0 ? false:null"
                    placeholder="..."
                    rows="3"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <hr>
      <div class="link-buttons">
        <b-button
          variant="outline-warning"
          @click="validationFormUpdate"
        >
          Изменить
        </b-button>
        <b-button
          v-b-toggle.sidebar-edit
          variant="outline-primary"
        >
          Закрыть
        </b-button>
      </div>
    </div>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BButton,
  VBToggle,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BFormTextarea,
  BFormCheckbox,
  // BFormTags,
} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'

export default {
  components: {
    BSidebar,
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormTextarea,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    selectedApp: {
      type: Object,
      default: () => ({
        id: '',
        description: '',
        url: '',
        paramGroupId: null,
        name: '',
        support: false,
        active: true,
        createDate: null,
        bitrixId: 0,
      }),
    },
  },

  current() {
    return {
      required,
    }
  },

  data() {
    return {
      app: {
        id: '',
        description: '',
        url: '',
        paramGroupId: null,
        name: '',
        support: false,
        active: true,
        createDate: null,
        bitrixId: 0,
      },
    }
  },
  watch: {
    selectedApp(newVal) {
      const newApp = JSON.parse(JSON.stringify(newVal))
      this.app = newApp
    },
  },

  methods: {
    validationFormUpdate() {
      this.$refs.simpleRulesEdit.validate().then(success => {
        if (success) {
          this.$emit('update', JSON.parse(JSON.stringify(this.app)))
          this.$root.$emit('bv::toggle::collapse', 'sidebar-edit')
        }
      })
    },
    clear() {
      this.app.id = ''
      this.app.description = ''
      this.app.url = ''
      this.app.name = ''
      this.app.support = false
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

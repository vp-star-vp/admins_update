<template>
  <!-- sidebar create -->
  <b-sidebar
    id="sidebar-add"
    backdrop
    bg-variant="white"
    right
    shadow
    @shown="clear"
  >
    <div class="sidebar-edit">
      <p>
        <feather-icon
          icon="PlusCircleIcon"
          size="16"
        /> Новое приложение</p>
      <hr>
      <validation-observer ref="simpleRulesAdd">
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
              <b-form-group
              >
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
          variant="outline-success"
          @click="validationFormCreate"
        >
          Добавить
        </b-button>
        <b-button
          v-b-toggle.sidebar-add
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

  methods: {
    validationFormCreate() {
      this.$refs.simpleRulesAdd.validate().then(success => {
        if (success) {
          this.$emit('create', this.app)
          this.$root.$emit('bv::toggle::collapse', 'sidebar-add')
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

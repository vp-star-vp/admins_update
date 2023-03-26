<template>
  <!-- sidebar create -->
  <b-sidebar
    id="sidebar-add"
    backdrop
    bg-variant="white"
    right
    shadow
    width="700px"
    @shown="clear"
  >
    <div class="sidebar-edit">
      <p>  <feather-icon
        icon="PlusCircleIcon"
        size="14"
      /> Новая разрешение</p>
      <hr>
      <validation-observer ref="simpleRulesAdd">
        <b-form
          novalidate
          @submit.prevent
        >
          <b-row>
            <b-col cols="12">
              <b-form-group
                label="Имя разрешения"
                label-for="h-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Add2"
                  rules="required"
                >
                  <b-form-input
                    id="h-name"
                    v-model="role.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="имя_разреш."
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                  label="Имя функциональности"
                  label-for="h-name"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Add21"
                    rules="required"
                >
                  <b-form-input
                      id="h-fname"
                      v-model="role.functionalityName"
                      :state="errors.length > 0 ? false:null"
                      placeholder="имя_функциональности"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                  label="URL API Function"
                  label-for="h-apiname"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Add21"
                    rules="required"
                >
                  <b-form-input
                      id="h-apiname"
                      v-model="role.apiFunction"
                      :state="errors.length > 0 ? false:null"
                      placeholder="url_apiFunction"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <SelectAppV2
                @update="AppFill"
              />
            </b-col>
            <b-col cols="12">
              <label>Тип</label>
              <validation-provider
                #default="{ errors }"
                name="Add5"
                rules="required"
              >
                <v-select
                  v-model="role.permissionType"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="type"
                  :reduce="type => type.value"
                  :state="errors.length > 0 ? false:null"
                  label="name"
                />
              </validation-provider>
              <br>
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
                    v-model="role.description"
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
import SelectAppV2 from '@/views/apps/user-management/apps/modules/SelectAppsV2.vue'

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
    ValidationProvider,
    ValidationObserver,
    SelectAppV2,
    vSelect,
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
      role: {
        description: '',
        solutionId: '',
        name: '',
        functionalityName: '',
        apiFunction: '',
        permissionType: '',
        active: true,
      },
      //  0 - create, 1 - read, 2 - update,  3 - delete
      type: [
        {
          value: 0,
          name: 'create',
        },
        {
          value: 1,
          name: 'read',
        },
        {
          value: 2,
          name: 'update',
        },
        {
          value: 3,
          name: 'delete',
        },
      ],
      typeSelect: {},
    }
  },

  methods: {
    validationFormCreate() {
      this.$refs.simpleRulesAdd.validate().then(success => {
        if (success) {
          this.$emit('create', this.role)
          this.$root.$emit('bv::toggle::collapse', 'sidebar-add')
        }
      })
    },
    clear() {
      this.role.description = ''
      this.role.name = ''
      // this.role.solutionId = ''
    },
    AppFill(param) {
      this.role.solutionId = param
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

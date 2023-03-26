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
      <p> <feather-icon
        icon="EditIcon"
        size="12"
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
                label="id"
                label-for="h-id"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Edit1"
                  rules="required"
                >
                  <b-form-input
                    id="h-id"
                    v-model="site.id"
                    :state="errors.length > 0 ? false:null"
                    disabled="true"
                    placeholder="id_site"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="Роль"
                label-for="h-Name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Edit2"
                  rules="required"
                >
                  <b-form-input
                    id="h-Name"
                    v-model="site.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="name_site"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
<!--              <SelectApp
                :app-default="site.solutionId"
                @update="updateSolutionId"
              />
              <hr>-->
<!--              SelectApp2-->
              <SelectAppV2
                :app-default="site.solutionId"
                @update="updateSolutionId"
              />
            </b-col>

            <!--            <b-col cols="12">
              <b-form-group
                label="Приложение"
                label-for="h-app"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Edit4"
                  rules="required"
                >
                  <b-form-input
                    id="h-app"
                    v-model="site.solutionId"
                    placeholder="h_app"
                    :state="errors.length > 0 ? false:null"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>-->
            <b-col cols="12">
              <b-form-group>
                <b-form-checkbox
                  v-model="site.active"
                  :indeterminate.sync="indeterminate"
                >
                  Active
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
                    v-model="site.description"
                    :state="errors.length > 0 ? false:null"
                    placeholder="..."
                    rows="5"
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
} from 'bootstrap-vue'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required } from '@validations'
// import SelectApp from '@/views/apps/user-management/apps/modules/SelectApps.vue'
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
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
    // SelectApp,
    SelectAppV2,
    // BFormTags,
  },
  directives: {
    'b-toggle': VBToggle,
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
  current() {
    return {
      required,
    }
  },
  data() {
    return {
      site: {
        id: '',
        description: '',
        url: '',
        paramGroupId: null,
        name: '',
        active: true,
        createDate: null,
        bitrixId: 0,
      },
      test: '',
    }
  },
  watch: {
    selectedSite(newVal) {
      const newSite = JSON.parse(JSON.stringify(newVal))
      this.site = newSite
    },
  },
  methods: {
    validationFormUpdate() {
      this.$refs.simpleRulesEdit.validate().then(success => {
        if (success) {
          this.$emit('update', JSON.parse(JSON.stringify(this.site)))
          this.$root.$emit('bv::toggle::collapse', 'sidebar-edit')
        }
      })
    },
    clear() {
      this.site.name = ''
      this.site.routeName = ''
      this.site.props = []
    },
    updateSolutionId(param) {
      this.site.solutionId = param
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

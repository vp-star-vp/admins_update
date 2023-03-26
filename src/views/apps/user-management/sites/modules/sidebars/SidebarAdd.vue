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
      <p>  <feather-icon
        icon="PlusCircleIcon"
        size="14"
      /> Новый сайт</p>
      <hr>
      <validation-observer ref="simpleRulesAdd">
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
                  name="Add1"
                  rules="required"
                >
                  <b-form-input
                    id="h-id"
                    v-model="site.id"
                    :state="errors.length > 0 ? false:null"
                    placeholder="site_id"
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="имя cайта"
                label-for="h-name"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Add2"
                  rules="required"
                >
                  <b-form-input
                    id="h-name"
                    v-model="site.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="site_name"
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
                    v-model="site.url"
                    :state="errors.length > 0 ? false:null"
                    placeholder="https://..."
                  />
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group
                label="описание"
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
    }
  },

  methods: {
    validationFormCreate() {
      this.$refs.simpleRulesAdd.validate().then(success => {
        if (success) {
          this.$emit('create', this.site)
          this.$root.$emit('bv::toggle::collapse', 'sidebar-add')
        }
      })
    },
    clear() {
      this.site.id = ''
      this.site.description = ''
      this.site.url = ''
      this.site.name = ''
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

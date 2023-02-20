<template>
  <div v-if="$can('read', 'contact')">
    <div class="sticky">
      <b-row>
        <b-col cols="12">
          <b-card>
            <b-media>
              <template #aside>
                <b-img
                  alt="placeholder"
                  src="../../../assets/images/logo/men_find.png"
                  width="70"
                />
              </template>
              <h5 class="mt-0">
                GetContact
              </h5>
              <label>
                Поиск контактных лиц среди дилеров компании OCS.
              </label>
            </b-media>
            <b-row>
              <b-col cols="6">
                <b-input-group style="margin-left: 85px; margin-top: -15px; max-width: 600px;">
                  <b-form-input
                    v-model="numberLoc"
                    placeholder="поиск по моб. нормеру, email, имени, фамилии "
                  />
                  <b-input-group-append>
                    <b-button
                      variant="outline-primary"
                      :disabled="inputCheck"
                      @click="temp()"
                    >
                      Найти
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
                <label
                  v-if="inputCheck"
                  style="margin-left: 85px; color: #ea5455"
                >Длина номера должна быть больше 3 символов</label>
              </b-col>
              <b-col
                cols="6"
                class="text-right"
              >
                <p class="login"> {{$store.getters['USER_STATE'].name}}, {{$store.getters['USER_STATE'].rbu}}</p>
                <div  class="linkGC">
                <b-link
                  target="_blank"
                  :href="$store.getters['app-contact/AMOUNT'].faqUrl"
                >
                  <feather-icon icon="ExternalLinkIcon" /> GetContact 1.5.2
                </b-link>
                </div>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <b-row style="margin-top: 10px;">
      <b-col cols="8">
        <b-card>
          <b-tabs>
            <b-tab>
              <template #title>
                <feather-icon />
                <span>Контакты дилеров</span>
                <b-badge
                  pill
                  variant="primary"
                  class="hd"
                >{{ $store.getters['app-contact/AMOUNT'].amountContact }}
                </b-badge>
              </template>
              <ContactAccountList :number="number" />
            </b-tab>
            <b-tab>
              <template #title>
                <feather-icon />
                <span>Ответственные сейлы </span>
                <b-badge
                  pill
                  variant="primary"
                  class="hd"
                >{{ $store.getters['app-contact/AMOUNT'].amountSale }}
                </b-badge>
              </template>
              <ContactAccountManagerList :number="number" />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col cols="4">
        <b-tabs>
          <b-tab>
            <template #title>
              <feather-icon />
              <span>Сотрудник OCS</span>
              <b-badge
                pill
                variant="primary"
                class="hd"
              >{{ $store.getters['app-contact/AMOUNT'].amountEmpl }}
              </b-badge>
            </template>
            <EmplList :number="number" />
          </b-tab>
          <b-tab>
            <template #title>
              <feather-icon />
              <span>Дилеры</span>
              <b-badge
                pill
                variant="primary"
                class="hd"
              >{{ $store.getters['app-contact/AMOUNT'].amountCust }}
              </b-badge>
            </template>
            <AccountList :number="number" />
          </b-tab>
        </b-tabs>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BTabs, BTab, BFormInput, BRow, BCol, BCard, BInputGroup, BButton, BInputGroupAppend, BMedia, BImg, BBadge, BLink,
} from 'bootstrap-vue'
import store from '@/store'
import {
  ref, watch, onUnmounted,
} from '@vue/composition-api'
import { useRouter } from '@core/utils/utils'
import ContactAccountList from './ContactAccountList.vue'
import ContactAccountManagerList from './ContactAccountManagerList.vue'
import AccountList from './AccountList.vue'
import EmplList from './EmplList.vue'
import contactStore from './contatcStoreModule'

export default {
  name: 'Contact',
  components: {
    ContactAccountList,
    ContactAccountManagerList,
    AccountList,
    EmplList,
    BTabs,
    BTab,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BButton,
    BInputGroupAppend,
    BMedia,
    BImg,
    BBadge,
    BLink,
  },

  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-contact'
    const { route } = useRouter()
    const number = ref()
    const numberLoc = ref('78005553999')
    const inputCheck = ref(false)

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, contactStore)
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    if (route.value.params.number) {
      numberLoc.value = route.value.params.number
    }

    function temp() {
      if (/\d/.test(numberLoc.value) && !/[a-z]/.test(numberLoc.value) && !/[\u0400-\u04FF]/.test(numberLoc.value)) {
        number.value = numberLoc.value.replace(/\D/g, '')
      } else {
        number.value = numberLoc.value
      }
    }

    function checkVal(val) {
      if (val.length > 3) {
        return false
      }
      return true
    }

    watch([numberLoc], () => {
      inputCheck.value = checkVal(numberLoc.value)
    })

    temp()
    return {
      temp,
      number,
      numberLoc,
      inputCheck,
    }
  },
}
</script>

<style scoped>
  .sticky {
    position: sticky;
    top: 0;
    min-height: 2em;
    z-index: 1;
  }
  .hd{
    margin-left: 10px;
  }
  .login{
    margin-top: -65px;

 /*   color: #7367f0;*/
  }
  .linkGC{
    margin-top: 50px;
  }
</style>

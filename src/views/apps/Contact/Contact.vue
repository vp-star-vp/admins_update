<template>
  <div>
    <div class="sticky">
      <b-row>
        <b-col cols="12">
          <b-card>
            <b-media>
              <template #aside>
                <b-img
                  alt="placeholder"
                  src="../../../assets/images/logo/icon.jpg"
                  width="45"
                />
              </template>
              <h5 class="mt-0">
                GetContact
              </h5>
              <p>
                Поиск контактных лиц среди дилеров компании OCS, для поиска используются данные из ИС DAX.
              </p>
            </b-media>
            <b-row>
              <b-col cols="4">
                <b-input-group style="margin-left: 58px;">
                  <b-form-input
                    v-model="numberLoc"
                    placeholder="поиск контакта по телефонному номеру"
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
                <label v-if="inputCheck" style="margin-left: 58px; color: #ea5455">Длина номера должна быть больше 3 символов</label>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <!--      <b-row>-->
      <!--        <b-col cols="8">-->
      <!--          <b-input-group>-->
      <!--            <b-form-input-->
      <!--              v-model="numberLoc"-->
      <!--              placeholder="поиск контакта по телефонному номеру"-->
      <!--            />-->
      <!--            <b-input-group-append>-->
      <!--              <b-button-->
      <!--                variant="outline-primary"-->
      <!--                @click="temp()"-->
      <!--              >-->
      <!--                Найти-->
      <!--              </b-button>-->
      <!--            </b-input-group-append>-->
      <!--          </b-input-group>-->
      <!--        </b-col>-->
      <!--      </b-row>-->
    </div>
    <b-row style="margin-top: 10px;">
      <b-col cols="8">
        <b-card>
          <b-tabs>
            <b-tab>
              <template #title>
                <feather-icon />
                <span>Контакты</span>
              </template>
              <ContactAccountList :number="number" />
            </b-tab>
            <b-tab>
              <template #title>
                <feather-icon />
                <span>Сейлы </span>
              </template>
              <ContactAccountManagerList :number="number" />
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      <b-col cols="4">
        <AccountList :number="number" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BTabs, BTab, BFormInput, BRow, BCol, BCard, BInputGroup, BButton, BInputGroupAppend, BMedia, BImg,
} from 'bootstrap-vue'
import {
  ref, watch,
} from '@vue/composition-api'
import { useRouter } from '@core/utils/utils'
import ContactAccountList from './ContactAccountList.vue'
import ContactAccountManagerList from './ContactAccountManagerList.vue'
import AccountList from './AccountList.vue'

export default {
  name: 'Contact',
  components: {
    ContactAccountList,
    ContactAccountManagerList,
    AccountList,
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
  },

  setup() {
    const { route } = useRouter()
    const number = ref()
    const numberLoc = ref('78005553999')
    const inputCheck = ref(false)

    if (route.value.params.number) {
      numberLoc.value = route.value.params.number
    }

    function temp() {
      number.value = numberLoc.value
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
</style>

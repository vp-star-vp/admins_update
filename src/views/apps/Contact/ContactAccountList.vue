<template>
  <div>
    <b-table
      :items="data"
      :fields="tableColumns"
      small
      fixed
      style="max-height: 400px; font-size: 13px;color: #1b2337"
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: field.key === 'ContactTel' || field.key === 'ContactTelLocal' || field.key === 'ContactTelLocal' ? '40px' : '60px' }"
        >
      </template>
      <template #cell(CustName)="data">
        {{ data.item.CustName }}
        <p class="id">
          <template v-if="data.item.CustCity.length>0">
            {{ data.item.CustCity }},

          </template>
          код DAX: {{ data.item.CustId }}
        </p>
      </template>
      <template #cell(ContactName)="data">
        {{ data.item.ContactName }} ++
        <p class="id">
          {{ data.item.ContactTitle }}
        </p>
        <p class="email">
          {{ data.item.ContactEmail }}
        </p>
      </template>
      <template #cell(ContactTel)="data">

        <p class="phone">
          <template v-if="data.item.ContactTel.length>0">
            общ:
            <feather-icon
              icon="PhoneIcon"
              class="phone"
            />
            {{ data.item.ContactTel }}
          </template>
          <template v-if="data.item.ContactTelLocal.length>0">
            , доб: {{ data.item.ContactTelLocal }}
          </template>
        </p>

        <p
          v-if="data.item.ContactCellular.length>0"
          class="phone"
        >
          моб.     <feather-icon
            icon="PhoneIcon"
            class="phone"
          /> {{ data.item.ContactCellular }}
        </p>
      </template>
      <!--     <template #cell(ContactName)="data">
            {{data.item.ContactName}}
            <p class="id">
                {{data.item.ContactTitle}}
            </p>
            <p class="email">
                {{data.item.ContactEmail}}
            </p>
        </template>-->
    </b-table>
  </div>
</template>

<script>

import store from '@/store'
import {
  BTable,
} from 'bootstrap-vue'
import {
  ref, onUnmounted, toRefs, watch,
} from '@vue/composition-api'
import contactStore from './contatcStoreModule'

export default {
  name: 'ContactAccountList',
  components: {
    BTable,
  },
  props: {
    number: {
      type: String,
      default: '+79174339210',
    },
  },
  setup(props) {
    const USER_APP_STORE_MODULE_NAME = 'app-contact'
    const data = ref([])
    const tableColumns = [
      { key: 'ContactName', label: 'Контакт', sortable: true },
      { key: 'CustName', label: 'Клиент', sortable: true },
      { key: 'ContactTel', label: 'Телефон', sortable: true },
    ]
    const {
      number,
    } = toRefs(props)
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, contactStore)
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
    /*    store
      .dispatch('app-contact/SEARCH_BY_PHONE_CONTACT_CUST', number.value)
      .then(response => {
        data.value = response.data.data
      }) */

    function getData() {
      store
        .dispatch('app-contact/SEARCH_BY_PHONE_CONTACT_CUST', number.value)
        .then(response => {
          data.value = response.data.data
        })
    }
    getData()

    watch([number], () => {
      getData()
    }, { deep: true })

    return {
      data,
      tableColumns,
      number,
    }
  },
}
</script>

<style scoped>
    .id{
        font-weight: 400;
        font-size: 10px;
        color: rgb(109, 109, 131);
        margin-left: 5px;
        margin-bottom: 0px;
        padding-top: 5px;

    }
     .email{
        font-weight: 500;
        font-size: 10px;
        color: rgba(14, 38, 218, 0.92);
        margin-left: 5px;
        margin-top: 0px;
        padding-top: 0px;
    }
    .phone{
        font-weight: 400;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 0px;
        padding-top: 0px;
        margin-bottom: 0px;
    }
    .city{
        font-weight: 400;
        font-size: 12px;
        margin-left: 5px;
        margin-top: 0px;
        margin-bottom: 0px;
        padding-top: 0px;
    }
</style>

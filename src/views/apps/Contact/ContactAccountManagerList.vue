<template>
  <div>
    <b-table
      :items="data"
      :fields="tableColumns"
      small
      fixed
      style="max-height: 400px; font-size: 13px;color: #1b2337"
    >
      <template #cell(CustName)="data">
        {{ data.item.CustName }}
        <p class="id">
          {{ data.item.CustId }}
        </p>
      </template>
      <template #cell(SM_Name)="data">
        <b-avatar
          :src="data.item.SM_Url"
        />
        {{ data.item.SM_Name }}
        <p class="id">
          {{ data.item.SM_JobName }}
        </p>
        <p class="email">
          тел.: {{ data.item.SM_Tel }}, {{ data.item.SM_Email }}
        </p>
      </template>
      <template #cell(RBU)="data">
        {{ data.item.RBU }}
        <p class="city">
          {{ data.item.Marketing_CityName }},  {{ data.item.Marketing_District }}
        </p>
      </template>
    </b-table>
  </div>
</template>

<script>

import store from '@/store'
import {
  BTable,
  BAvatar,
} from 'bootstrap-vue'
import {
  ref, onUnmounted, toRefs, watch,
} from '@vue/composition-api'
import contactStore from './contatcStoreModule'

export default {
  name: 'ContactAccountList',
  components: {
    BTable,
    BAvatar,
  },
  props: {
    number: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const USER_APP_STORE_MODULE_NAME = 'app-contact'
    const data = ref([])
    const tableColumns = [
      // { key: 'ContactName', label: 'Контакт', sortable: true },
      // { key: 'CustName', label: 'Клиент', sortable: true },
      { key: 'SM_Name', label: 'Сейл', sortable: true },
      { key: 'CustName', label: 'Клиент', sortable: true },
      { key: 'RBU', label: 'РБЮ / Маркет. город', sortable: true },
      // { key: 'ContactTel', label: 'Телефон', sortable: true },
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

    function getData() {
      store
        .dispatch('app-contact/SEARCH_BY_PHONE_CUST_MANAGER', number.value)
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

<template>
  <!-- <b-card-group columns>-->
  <div>
    <b-card
      v-for="(item) in data"
      :key="item.CustId"
      style="min-width: 300px;"
    >
      <b-card-text>
        <p class="name">
          {{ item.CustNameFull }}
        </p>
        <p class="id">
            <b>{{ item.CustCity }}</b>, код DAX: <b> {{ item.CustId }} </b>,   контактов:  <b-badge
            pill
            variant="primary"
          >
            {{ item.ContactsCnt }}
          </b-badge></p>
        <!--    <p class="id">
                контактов:  <b-badge
                  pill
                  variant="primary"
                >
                  {{ item.ContactsCnt }}
                </b-badge>
              </p>-->
      </b-card-text>
    </b-card>
  </div>
  <!--</b-card-group>-->
</template>

<script>

import store from '@/store'
import {
  BCard, /* BCardGroup, /* BRow, BCol, */ BBadge,
} from 'bootstrap-vue'
import {
  ref, onUnmounted, toRefs, watch,
} from '@vue/composition-api'
import contactStore from './contatcStoreModule'

export default {
  name: 'ContactAccountList',
  components: {
    BCard, /* BRow, BCol, */ BBadge, // BCardGroup,
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
    const {
      number,
    } = toRefs(props)

    const account = ref([
      {
        id: 'К000121',
        name: 'Партнер 1',
        contactAnum: 2,
      },
      {
        id: 'К000123',
        name: 'Партнер 2',
        contactAnum: 1,
      },
      {
        id: 'К000124',
        name: 'Партнер 3',
        contactAnum: 2,
      },
      {
        id: 'К000125',
        name: 'Партнер 3',
        contactAnum: 2,
      },
    ])
    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, contactStore)
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    function getData() {
      store
        .dispatch('app-contact/SEARCH_BY_PHONE_CUST', number.value)
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
      number,
      account,
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
    .header{
      font-weight: 400;
      font-size: 12px;

      margin-top: 0px;
      margin-bottom: 0px;
    }
    .name{
      font-weight: 500;
      margin-left: 5px;
      margin-bottom: 0px;
      margin-top: 0px;
      padding-top: 0px;
      font-size: 13px;
      color: #1b2337
    }

</style>

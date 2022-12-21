<template>
      <div class="text-center">
        <h2 class="mb-1">
          <br>
          <br>
          Ресурс вам не доступен.
        </h2>
        <p class="mb-3">
          <br>
          <br>
          <b> {{$store.getters['USER_STATE'].name}} </b>,  если вам требуется доступ к данному ресурсу, вам необходимо написать заявку на <b>helpdesk!</b>
          <br>
          <br>
          В описании к заявки нужно указать чтобы вас включили в группу  Active Directory: <b> {{$store.getters['USER_STATE_FULL'].groupADAccess}} </b>.
        </p>
        <b-form
          v-if="1==3"
          inline
          class="row justify-content-center m-0 mb-2"
          @submit.prevent
        >
          <b-form-input
            v-if="1==3"
            id="notify-email"
            class="col-12 col-md-5 mb-1 mr-md-2"
            type="text"
            placeholder="john@example.com"
          />

          <b-button
            variant="primary"
            class="mb-1 btn-sm-block"
            type="submit"
          >
            Notify
          </b-button>
        </b-form>

        <b-img
          fluid
          :src="imgUrl"
          alt="Coming soon page"
        />
      </div>
</template>

<script>
/* eslint-disable global-require */
import {
  /* BLink, */ BForm, BFormInput, BButton, BImg,
} from 'bootstrap-vue'
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    // VuexyLogo,
    // BLink,
    BForm,
    BButton,
    BFormInput,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/coming-soon.svg'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/coming-soon-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>

<template>
  <div class="controls">
    <div class="mr-auto p-2 bd-highlight">
      <h3> Сайты </h3>
    </div>
    <div class="p-1 bd-highlight">
      <b-form-input
        v-model="search"
        @input="inputText()"
      />
    </div>
    <div class=" p-1 bd-highlight">
      <b-button
        v-if="$can('create', 'sites.create')"
        v-b-toggle.sidebar-add
        variant="outline-primary"
      >
        Новый сайт
      </b-button>
    </div>
    <div class="p-1 bd-highlight">
      <b-button
        variant="flat-primary"
        @click="$emit('update')"
      >
        <feather-icon
          class="text-muted"
          icon="RefreshCwIcon"
        />
      </b-button>
    </div>
  </div>
</template>

<script>
import {
  BButton,
  VBToggle,
  BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BFormInput,
  },
  directives: {
    'b-toggle': VBToggle,
  },
  props: {
    appSelected: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    inputText() {
      this.$emit('inputText', this.search)
    },
  },
}
</script>

<style scoped>
  .controls {
    display: flex;
    gap: 1em;
  }
</style>

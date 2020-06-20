<template>
    <div v-show="display">
      <div class="modal-backdrop fade show"></div>
      <div class="modal modal-blur fade d-block show overflow-auto" :id="id" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
          <div class="modal-content">
            <button type="button" class="close" @click="hidden" aria-label="Close">
              <x-circle-icon class="icon"/>
            </button>
            <div class="modal-header" v-if="$slots.header">
              <slot name="header"/>
            </div>
            <div class="modal-body" v-if="$slots.default">
              <slot/>
            </div>
            <div class="modal-footer" v-if="$slots.footer">
              <slot name="footer"/>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { XCircleIcon } from 'vue-feather-icons'

export default {
  name: 'BaseModal',
  props: {
    id: { type: String, default: () => `modal-${Date.now() * Math.random()}` },
    display: { type: Boolean, default: false },
    size: { type: String, default: 'sm' },
    title: { type: String, default: 'Title' }
  },
  components: {
    XCircleIcon
  },
  data () {
    return { }
  },
  methods: {
    shown () {
      this.$emit('update:display', true)
    },
    hidden () {
      this.$emit('update:display', false)
    }
  },
  watch: {
    display (newValue) {
      if (newValue) this.shown()
      else this.hidden()
    }
  }
}
</script>

<style scoped>

</style>

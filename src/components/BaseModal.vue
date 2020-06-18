<template>
    <div v-show="display">
      <div class="modal-backdrop fade show"></div>
      <div class="modal modal-blur fade d-block show overflow-auto" :id="id" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header" v-if="$slots.header">
              <slot name="header"/>
            </div>
            <div class="modal-body">
              <div class="container-fluid p-0" v-if="$slots.default">
                <slot/>
              </div>
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
export default {
  name: 'BaseModal',
  props: {
    id: { type: String, default: () => `modal-${Date.now() * Math.random()}` },
    display: { type: Boolean, default: false },
    size: { type: String, default: 'sm' },
    title: { type: String, default: 'Title' }
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

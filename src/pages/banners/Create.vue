<template>
  <div id="CreateBanner">
    <Form/>
    <div class="btn-list">
      <button @click="create" class="btn btn-primary">Create</button>
      <router-link :to="{name: 'banners.index'}" class="btn btn-secondary" tag="button">Cancel</router-link>
    </div>
  </div>
</template>

<script>
import Form from './Form'

export default {
  name: 'Create',
  components: { Form },
  methods: {
    create () {

    }
  }
}
</script>

<style scoped>

</style>

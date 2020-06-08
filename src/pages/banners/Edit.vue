<template>
  <div id="UpdateBanner">
    <h1>UpdateBanner</h1>
    <Form :value="attributes"/>
    <button @click="update" class="btn btn-primary">Update</button>
  </div>
</template>

<script>
import Banner from '@/models/Banner'
import Form from './Form'

export default {
  name: 'Edit',
  beforeRouteEnter: async (to, from, next) => {
    to.meta['model'] = await Banner.find(to.params['id'])
    return next()
  },
  components: {
    Form
  },
  data () {
    return {
      model: null,
      attributes: null
    }
  },
  created () {
    this.model = this.$route.meta['model']
    this.attributes = this.model.getAttributes()
  },
  methods: {
    update () {
      this.model.update({ title: '123' })
    }
  }
}
</script>

<style scoped>

</style>

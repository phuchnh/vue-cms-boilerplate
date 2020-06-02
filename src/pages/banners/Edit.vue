<template>
  <div id="UpdateBanner">
    <h1>UpdateBanner</h1>
    <Form :value="model"/>
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
      model: null
    }
  },
  created () {
    this.model = this.$route.meta['model']
  }
}
</script>

<style scoped>

</style>

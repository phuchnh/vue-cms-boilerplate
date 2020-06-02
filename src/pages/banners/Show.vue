<template>
  <div id="BannerShow">
    <router-link :to="{name: 'banners.edit', params: { id: model.id } }" class="btn btn-primary" tag="button">
      Update Banner
    </router-link>
    <pre>{{ model }}</pre>
  </div>
</template>

<script>
import Banner from '@/models/Banner'

export default {
  name: 'Show',
  async beforeRouteEnter (to, from, next) {
    to.meta['model'] = await Banner.find(to.params['id'])
    return next()
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

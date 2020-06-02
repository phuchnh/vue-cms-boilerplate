<template>
  <ol class="breadcrumb" aria-label="breadcrumbs">
    <li class="breadcrumb-item" v-for="(item, index) in breadcrumbs" :key="index" :class="isActive(item.name)">
      <router-link :to="{name: item.name }" tag="a">{{ item.title }}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      defaultValue: [
        { title: 'Dashboard', name: 'home' }
      ]
    }
  },
  computed: {
    breadcrumbs () {
      return [...this.defaultValue, ...this.$route.meta.breadcrumbs]
    }
  },
  methods: {
    isActive (name) {
      return {
        'active': name === this.$route.name
      }
    }
  }
}
</script>

<style scoped>

</style>

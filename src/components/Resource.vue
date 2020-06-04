<template>
  <div id="Resource">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            {{title}}
          </h2>
        </div>
        <!-- Page title actions -->
        <div class="col-auto ml-auto d-print-none">
          <div class="d-sm-inline">
            <Breadcrumb/>
          </div>
        </div>
      </div>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import last from 'lodash-es/last'

export default {
  name: 'Resource',
  components: {
    Breadcrumb
  },
  computed: {
    title () {
      return last(this.$route.meta.breadcrumbs).title
    }
  }
}
</script>

<style scoped type="scss">
</style>

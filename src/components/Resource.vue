<template>
  <div id="Resource">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">
            Dashboard
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
    <slot>
      <router-view v-if="true"/>
    </slot>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Resource',
  components: {
    Breadcrumb
  }
}
</script>

<style scoped>

</style>

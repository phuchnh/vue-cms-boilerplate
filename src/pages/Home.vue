<template>
  <div id="Home">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col-auto">
          <h2 class="page-title">{{title}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'

export default {
  name: 'Home',
  data () {
    return {
      title: 'Home'
    }
  },
  components: {
    Breadcrumb
  }
}
</script>

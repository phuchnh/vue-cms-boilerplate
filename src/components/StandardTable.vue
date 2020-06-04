<template>
  <div class="card card-sm shadow my-4">
    <div class="card-body">
      <a-table :data-source="dataSource" :loading="loading" :row-key="record => record.id" tableLayout="auto">
        <slot/>
      </a-table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'StandardTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Object,
      default () {
        return {}
      }
    },
    dataSource: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>

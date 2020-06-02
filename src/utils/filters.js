import Vue from 'vue'
import * as moment from 'moment-timezone'

Vue.filter('formatDate', function (value, format = 'LLLL') {
  let date = moment(value)
  if (!date.isValid()) return ''
  return date.format(format)
})

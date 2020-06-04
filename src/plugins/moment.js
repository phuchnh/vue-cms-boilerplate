import Vue from 'vue'
import * as moment from 'moment-timezone'
moment.locale('ja')
moment.tz.setDefault('Japan')
Vue.prototype.moment = moment

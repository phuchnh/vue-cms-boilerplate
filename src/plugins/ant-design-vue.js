import Vue from 'vue'
import { message, Progress, Table, Tabs, Pagination } from 'ant-design-vue'
Vue.use(Tabs)
Vue.use(Table)
Vue.use(Progress)
Vue.use(Pagination)
Vue.prototype.$message = message

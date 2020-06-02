import { HomeIcon, SunIcon } from 'vue-feather-icons'

export const navigations = [
  { id: 'home', type: 'item', title: 'Home', routeName: 'home', icon: HomeIcon, exact: true },
  { id: 'banner', type: 'item', title: 'Banner', routeName: 'banners.index', icon: SunIcon, exact: false }
]

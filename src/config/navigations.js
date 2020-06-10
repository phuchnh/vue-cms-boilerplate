import { HomeIcon, NavigationIcon, FileIcon } from 'vue-feather-icons'

export const navigations = [
  { id: 'home', type: 'item', title: 'Home', routeName: 'home', icon: HomeIcon, exact: true },
  { id: 'banners', type: 'item', title: 'Banners', routeName: 'banners.index', icon: NavigationIcon, exact: false },
  { id: 'files', type: 'item', title: 'Files', routeName: 'files.index', icon: FileIcon, exact: false }
]

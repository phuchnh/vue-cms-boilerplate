import Resource from '@/components/Resource'
import { AuthGuard, LoginGuard, ResolveGuard } from '@/router/guards'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: page('Login.vue'),
    meta: { layout: 'auth' },
    beforeEnter: ResolveGuard([LoginGuard])
  },
  {
    path: '/',
    name: 'home',
    component: page('Home.vue'),
    beforeEnter: ResolveGuard([AuthGuard])
  },
  {
    path: '/banners',
    component: Resource,
    children: [
      {
        path: '',
        name: 'banners.index',
        component: page('banners/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          breadcrumbs: [
            { title: 'Banner List', name: 'banners.index' }
          ]
        }
      },
      {
        path: '/banners/create',
        name: 'banners.create',
        component: page('banners/Create.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          breadcrumbs: [
            { title: 'Banner List', name: 'banners.index' },
            { title: 'Banner Create', name: 'banners.create' }
          ]
        }
      },
      {
        path: '/banners/:id',
        name: 'banners.show',
        component: page('banners/Show.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          breadcrumbs: [
            { title: 'Banner List', name: 'banners.index' },
            { title: 'Banner Show', name: 'banners.show' }
          ]
        }
      },
      {
        path: '/banners/:id/edit',
        name: 'banners.edit',
        component: page('banners/Edit.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          breadcrumbs: [
            { title: 'Banner List', name: 'banners.index' },
            { title: 'Banner Edit', name: 'banners.edit' }
          ]
        }
      }
    ]
  },
  {
    path: '/files',
    component: Resource,
    children: [
      {
        path: '',
        name: 'files.index',
        component: page('files/Index.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          breadcrumbs: [
            { title: 'File List', name: 'files.index' }
          ]
        }
      },
      {
        path: '/files/upload',
        name: 'files.upload',
        component: page('files/Upload.vue'),
        beforeEnter: ResolveGuard([AuthGuard]),
        meta: {
          breadcrumbs: [
            { title: 'File List', name: 'files.index' },
            { title: 'File Upload', name: 'files.upload' }
          ]
        }
      }
    ]
  }
]

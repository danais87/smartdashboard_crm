import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'login',
      component: () => import('@/views/dashboard/auth/login')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/dashboard/auth/login')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import( /* webpackChunkName: "signup" */ '@/views/dashboard/auth/signup.vue')
    }, {
      path: '/confirmSignup',
      name: 'confirmSignup',
      component: () => import( /* webpackChunkName: "confirmSignup" */ '@/views/dashboard/auth/confirmSignup.vue')
    }, {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import( /* webpackChunkName: "forgotPassword" */ '@/views/dashboard/auth/forgotPassword.vue')
    },
    {
      path: '/index',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '/index',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: '/pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Notifications',
          path: '/components/notifications',
          component: () => import('@/views/dashboard/component/Notifications'),
        },
        {
          name: 'Icons',
          path: '/components/icons',
          component: () => import('@/views/dashboard/component/Icons'),
        },
        {
          name: 'Typography',
          path: '/components/typography',
          component: () => import('@/views/dashboard/component/Typography'),
        },
        // Tables
        {
          name: 'Regular Tables',
          path: '/tables/regular-tables',
          component: () => import('@/views/dashboard/tables/RegularTables'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: '/maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
        // Upgrade
        {
          name: 'Upgrade',
          path: 'upgrade',
          component: () => import('@/views/dashboard/Upgrade'),
        },
        //menu
        {
          name: 'Customers',
          path: '/menu/customer',
          component: () => import('@/views/dashboard/menu/LeadsList'),
        },
        {
          name: 'Organization',
          path: '/menu/organization',
          component: () => import('@/views/dashboard/menu/CompanyList'),
        },
        {
          name: 'Setting',
          path: '/menu/setting',
          component: () => import('@/views/dashboard/menu/SettingList'),
        },
        {
          name: 'Products',
          path: '/menu/products',
          component: () => import('@/views/dashboard/menu/ServiceList'),
        },
        {
          name: 'Quotes',
          path: '/menu/quotes',
          component: () => import('@/views/dashboard/menu/QuoteList'),
        },
        {
          name: 'Invoices',
          path: '/menu/invoice',
          component: () => import('@/views/dashboard/menu/InvoiceList'),
        },
        {
          name: "Payment",
          path: '/payment',
          component: () => import('@/views/dashboard/component/Payment')
        },
        {
          path: "/dashlist",
          name: "Dash Quote",
          component: () => import('@/views/dashboard/menu/DashList.vue')
        },
        {
          path: "/tablequote",
          name: "Table Quote",
          component: () => import('@/views/dashboard/menu/TableQuoteList.vue')
        },
        {
          name: 'Quotes',
          path: '/quotes',
          component: () => import('@/views/dashboard/menu/QuoteList'),
        },
        {
          name: 'Payments',
          path: '/menu/payments',
          component: () => import('@/views/dashboard/menu/PaymentsList'),
        },
        {
          name: 'Task Monitor',
          path: '/menu/task',
          component: () => import('@/views/dashboard/menu/TaskMonitorList'),
        },

      ],
    }
  ],
})
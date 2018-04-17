import Vue from 'vue'
import Router from 'vue-router'

//lazy loading for router components
const NotFoundComponent = () =>
  import ('@/components/NotFoundComponent')
const indexPage = () =>
  import ('@/pages/indexPage')
const DetailPage = () =>
  import ('@/pages/DetailPage')
const DetailStatistics = () =>
  import ('@/components/DetailStatistics')
const DetailForecast = () =>
  import ('@/components/DetailForecast')
const DetailAnalysis = () =>
  import ('@/components/DetailAnalysis')
const DetailPublish = () =>
  import ('@/components/DetailPublish')
Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: '/',
  routes: [{
      path: '/(index.html)?',
      name: 'home',
      component: indexPage
    },
    {
      path: '/detail',
      name: 'detail',
      component: DetailPage,
      redirect: '/detail/statistics',
      children: [{
          path: 'statistics',
          component: DetailStatistics
        },
        {
          path: 'forecast',
          component: DetailForecast
        },
        {
          path: 'analysis',
          component: DetailAnalysis
        },
        {
          path: 'publish',
          component: DetailPublish
        }
      ]
    },
    {
      path: '*',
      name: 'notFound',
      component: NotFoundComponent
    }
  ],
  scrollBehavior: function (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

export default router;

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Calendar from '@/components/Calendar'
import AsyncComputed from 'vue-async-computed'
 
Vue.use(AsyncComputed)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Calendar',
      name: 'HelloWorld',
      component: Calendar
    }
  ]
})

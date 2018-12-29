import Vue from 'vue'
import Router from 'vue-router'
import Lottery from '@/components/Lottery'
import HelloWorld from '@/components/HelloWorld'
import Draw from '@/components/Draw'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Lottery',
      component: Lottery
    },
    {
      path: '/helloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/draw',
      name: 'Draw',
      component: Draw
    },
  ]
})

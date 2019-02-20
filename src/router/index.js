import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/Home'
import home2 from '@/components/Home2'
import sell from '@/components/Sell'
import login from '@/components/Login'
import Client from '@/components/Client'
import Purc from '@/components/Purc'
import Service from '@/components/Service'
import Goods from '@/components/Goods'
import Order from '@/components/Order'
import Return from '@/components/Return'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/Login'
    },
    {
      path:'/Login',
      name:'login',
      component:login
    },
    {
      path: '/Home',
      name: 'home',
      component: home,
      children:[
        {path:'/Sell',component:sell},
        {path:'/Home2',component:home2},
        {path:'/Client',component:Client},
        {path:'/Purc',component:Purc},
        {path:'/Goods',component:Goods},
        {path:'/Order',component:Order},
        {path:'/Service',component:Service},
        {path:'/Return',component:Return},
        {path:'/', redirect:'/Home2'}
      ]
    }

  ]
})

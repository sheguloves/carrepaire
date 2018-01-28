import Vue from 'vue';
import Router from 'vue-router';
import Orders from '../components/Orders.vue';
import OrderCreate from '../components/OrderCreate.vue';
import OrderEdit from '../components/OrderEdit.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/orders',
      component: Orders
    },
    {
      path: '/order/create',
      component: OrderCreate
    },
    {
      path: '/order/:id',
      component: OrderEdit
    },
    {
      path: '*',
      redirect: '/orders'
    }
  ]
});

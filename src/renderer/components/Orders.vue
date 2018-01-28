<template>
  <div class="container">
    <div class="columns" v-show="(!orders || orders.length <= 0) && searchtext === ''">
      <div class="column">
        <div class="text-center">
          <span>当前没有任何记录，请<a class="c-hand" v-on:click="tianjia">添加</a></span>
        </div>
      </div>
    </div>
    <div class="columns" v-show="(orders && orders.length > 0) || searchtext !== ''">
      <section class="column col-lg-12" style="text-align: right;">
        <div class="input-group input-inline">
          <input class="form-input" placeholder="搜索" v-model="searchtext">
        </div>
      </section>
    </div>
    <div class="columns" v-show="(orders && orders.length > 0) || searchtext !== ''">
      <div class="column">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>客户名称</th>
              <th>车型</th>
              <th>车号</th>
              <th>电话</th>
              <th>接修日期</th>
              <th>结算日起</th>
              <th>总价</th>
              <th>实际估算</th>
              <th>备注</th>
              <th class="text-center" style="width: 100px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders">
              <td>{{order.kehumingcheng}}</td>
              <td>{{order.chexing}}</td>
              <td>{{order.chehao}}</td>
              <td>{{order.dianhua}}</td>
              <td>{{order.jiexiuriqi.nian}}.{{order.jiexiuriqi.yue}}.{{order.jiexiuriqi.ri}}</td>
              <td>{{order.jiesuanriqi.nian}}.{{order.jiesuanriqi.yue}}.{{order.jiesuanriqi.ri}}</td>
              <td>{{order.zongjia}}</td>
              <td>{{order.shijigusuan}}</td>
              <td>{{order.beizhu}}</td>
              <td>
                <a class="c-hand" v-on:click="chakan(order)">修改</a>
                <a class="c-hand" v-on:click="shanchu(order)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        searchtext: ''
      }
    },
    computed: {
      orders: function() {
        const list = this.$store.state.Order.orders;
        if (this.searchtext !== '') {
          return list.filter((item) => {
            return item.kehumingcheng.indexOf(this.searchtext) !== -1 ||
            item.chexing.indexOf(this.searchtext) !== -1 ||
            item.chehao.indexOf(this.searchtext) !== -1 ||
            item.dianhua.indexOf(this.searchtext) !== -1 ||
            item.beizhu.indexOf(this.searchtext) !== -1;
          });
        } else {
          return list;
        }
      }
    },
    methods: {
      chakan: function(order) {
        const id = order.id;
        this.$router.push({ path: `/order/${id}` });
      },
      shanchu: function(order) {
        this.$store.dispatch('deleteOrder', order);
      },
      tianjia: function() {
        this.$router.push({ path: '/order/create' });
      }
    }
  }
</script>

<style>
</style>

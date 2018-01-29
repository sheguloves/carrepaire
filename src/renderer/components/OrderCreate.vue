<template>
  <div class="container">
    <div class="columns">
      <div class="column col-lg-12">
        <div class="input-group">
          <span class="input-group-addon">店名</span>
          <input class="form-input" v-model="order.dianming">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column col-3">
        <div class="input-group">
          <span class="input-group-addon">客户名称</span>
          <input class="form-input" v-model="order.kehumingcheng">
        </div>
      </div>
      <div class="column col-4">
        <div class="input-group">
          <span class="input-group-addon">里程</span>
          <input class="form-input" type="number" v-model.number="order.licheng">
        </div>
      </div>
      <div class="column col-5">
        <div class="input-group">
          <span class="input-group-addon">车型</span>
          <input class="form-input" v-model="order.chexing">
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column col-3">
        <div class="input-group">
          <span class="input-group-addon">车号</span>
          <input class="form-input" v-model="order.chehao">
        </div>
      </div>
      <div class="column col-4">
        <div class="input-group">
          <span class="input-group-addon">电话</span>
          <input class="form-input" v-model="order.dianhua">
        </div>
      </div>
      <div class="column col-5">
        <div class="input-group">
          <span class="input-group-addon">接修日期</span>
          <input class="form-input" type="number" v-model.number="order.jiexiuriqi.nian">
          <span class="input-group-addon">年</span>
          <input class="form-input" type="number" v-model.number="order.jiexiuriqi.yue">
          <span class="input-group-addon">月</span>
          <input class="form-input" type="number" v-model.number="order.jiexiuriqi.ri">
          <span class="input-group-addon">日</span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th style="width: 150px;">配件名称</th>
              <th style="width: 210px;">厂家</th>
              <th style="width: 80px;">数量</th>
              <th style="width: 80px;">单价</th>
              <th style="width: 100px;">总价</th>
              <th>备注</th>
              <th class="text-center" style="width: 100px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in order.peijian">
              <td>{{index + 1}}</td>
              <td v-if="bianjizhong !== index">{{item.mingcheng}}</td>
              <td v-if="bianjizhong === index">
                <input class="form-input input-sm" v-model="item.mingcheng">
              </td>
              <td v-if="bianjizhong !== index">{{item.changjia}}</td>
              <td v-if="bianjizhong === index">
                <input class="form-input input-sm" v-model="item.changjia">
              </td>
              <td v-if="bianjizhong !== index">{{item.shuliang}}</td>
              <td v-if="bianjizhong === index">
                <input class="form-input input-sm" type="number" v-model.number="item.shuliang">
              </td>
              <td v-if="bianjizhong !== index">{{item.danjia}}</td>
              <td v-if="bianjizhong === index">
                <input class="form-input input-sm" type="number" v-model.number="item.danjia">
              </td>
              <td>{{item.danjia * item.shuliang}}</td>
              <td v-if="bianjizhong !== index">{{item.beizhu}}</td>
              <td v-if="bianjizhong === index">
                <textarea class="form-input input-sm" v-model="item.beizhu"></textarea>
              </td>
              <td>
                  <a v-show="bianjizhong === -1" class="c-hand" v-on:click="bianjizhong = index;">修改</a>
                  <a class="c-hand" v-show="bianjizhong === index" v-on:click="bianjizhong = -1;">保存</a>
                  <a v-show="bianjizhong === index || bianjizhong === -1" class="c-hand" v-on:click="shanchu(index)">删除</a>
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <div class="text-center">
                  <span v-show="!order.peijian || order.peijian.length <= 0">当前没有任何配件，请</span><a class="c-hand" v-show="bianjizhong === -1" v-on:click="tianjiapeijian">添加</a>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="5">工时费</td>
              <td colspan="3">
                <input type="number" class="form-input" v-model.number="order.gongshifei">
              </td>
            </tr>
            <tr>
              <td colspan="5">合计</td>
              <td colspan="3" style="padding-left: .8rem;">{{heji}}</td>
            </tr>
            <tr>
              <td colspan="5">实际估算</td>
              <td colspan="3">
                <input type="number" class="form-input" v-model.number="order.shijigusuan">
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <label>建议下次保养：</label>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    机油：
                    <input type="checkbox" v-model="order.jianyi.jiyou">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    机滤：
                    <input type="checkbox" v-model="order.jianyi.jilv">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    空滤：
                    <input type="checkbox" v-model="order.jianyi.konglv">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    空调滤：
                    <input type="checkbox" v-model="order.jianyi.kongtiaolv">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    气油滤：
                    <input type="checkbox" v-model="order.jianyi.qiyoulv">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    刹车油：
                    <input type="checkbox" v-model="order.jianyi.shacheyou">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    助力油：
                    <input type="checkbox" v-model="order.jianyi.zhuliyou">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    变速箱油：
                    <input type="checkbox" v-model="order.jianyi.biansuxiangyou">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    正时套装：
                    <input type="checkbox" v-model="order.jianyi.zhengshitaozhuang">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    防冻液：
                    <input type="checkbox" v-model="order.jianyi.fangdongye">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    刹车片：
                    <input type="checkbox" v-model="order.jianyi.shachepian">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    清洗节气门：
                    <input type="checkbox" v-model="order.jianyi.qingxijieqimen">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    清洗喷油嘴：
                    <input type="checkbox" v-model="order.jianyi.qingxipenyouzui">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div class="form-group d-inline-block">
                  <label class="form-checkbox">
                    清洗三元催化：
                    <input type="checkbox" v-model="order.jianyi.qingxisanyuancuihua">
                    <i class="form-icon"></i>
                  </label>
                </div>
                <div style="padding-top: 15px; margin-bottom: 5px; text-align: right;">
                  <div class="form-group">
                    <label class="form-checkbox">
                      <input type="checkbox" checked onclick="return false;">
                      <i class="form-icon" style="left: 0; right: auto;"></i> 为需要
                    </label>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colspan="8">
                <textarea class="form-input" rows="3" v-model.trim="order.beizhu" placeholder="添加备注..."></textarea>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="columns">
      <div class="column col-5 col-ml-auto">
        <div class="input-group">
          <span class="input-group-addon">结算日期</span>
          <input class="form-input" type="number" v-model.number="order.jiesuanriqi.nian">
          <span class="input-group-addon">年</span>
          <input class="form-input" type="number" v-model.number="order.jiesuanriqi.yue">
          <span class="input-group-addon">月</span>
          <input class="form-input" type="number" v-model.number="order.jiesuanriqi.ri">
          <span class="input-group-addon">日</span>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column" style="text-align: right;">
        <button class="btn btn-lg" v-on:click="baocun">保存</button>
        <button class="btn btn-lg" v-on:click="quxiao">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
  const peijian = {
    mingcheng: '',
    changjia: '',
    shuliang: 1,
    danjia: 0,
    beizhu: ''
  }
  export default {
    data() {
      return {
        bianjizhong: -1,
        order: {
          dianming: '',
          chehao: '',
          licheng: 0,
          chexing: '',
          kehumingcheng: '',
          dianhua: '',
          jiexiuriqi: {
            nian: 0,
            yue: 0,
            ri: 0
          },
          jiesuanriqi: {
            nian: 0,
            yue: 0,
            ri: 0
          },
          peijian: [],
          gongshifei: 0,
          shijigusuan: 0,
          jianyi: {
            jiyou: false,
            jilv: false,
            konglv: false,
            kongtiaolv: false,
            qiyoulv: false,
            shacheyou: false,
            zhuliyou: false,
            biansuxiangyou: false,
            zhengshitaozhuang: false,
            fangdongye: false,
            shachepian: false,
            qingxijieqimen: false,
            qingxipenyouzui: false,
            qingxisanyuancuihua: false
          },
          beizhu: ''
        }
      }
    },
    computed: {
      heji: function() {
        const peijianfei = this.order.peijian.reduce(function(peijianfei, item) {
          peijianfei += item.danjia * item.shuliang;
          return peijianfei;
        }, 0);
        return this.order.gongshifei + peijianfei;
      }
    },
    methods: {
      tianjiapeijian: function() {
        this.order.peijian.push({
          ...peijian
        });
        this.bianjizhong = this.order.peijian.length - 1;
      },
      shanchu: function(index) {
        this.order.peijian.splice(index, 1);
        this.bianjizhong = -1;
      },
      baocun: function() {
        this.$store.dispatch('addOrder', this.order);
        this.$router.push({
          path: '/orders'
        });
      },
      quxiao: function() {
        this.$router.push({
          path: '/orders'
        });
      }
    }
  }
</script>

<style>

</style>

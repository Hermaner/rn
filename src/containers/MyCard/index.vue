<!-- 首页 -->

<template>
  <div class="memberCard">
    <div class="top flex-wrp flexColumn jacenter">
      <div class="cardView">
        <img :src="card" class="cardbg" />
        <img :src="imgUrl" class="cardLogo" />
        <div class="label flex-wrp acenter memCur" v-if="isMember"><i class="iconfont icon-huiyuanjulebu"></i>荣誉会员</div>
        <div class="label flex-wrp acenter" v-else><div>对不起，您还不是平台会员<span v-if="!phone" @click="goPage('bindPhone')">请先绑定手机号</span></div></div>
        <div class="cardNum" v-if="isMember">卡号：{{phone}}</div>
      </div>
    </div>
    <div class="cardTips">
    充值达500成平台会员 <br />
    平台会员可享生日优惠、商品优惠、限时优惠等
    </div>
    <div class="icons flex-wrp">
      <div class="flex-item flex-wrp flexColumn jacenter">
        <i class="iconfont icon-qian1"></i>
        <div>余额<span>{{private.balance}}元</span></div>
      </div>
      <div class="flex-item flex-wrp flexColumn jacenter" @click="goPage('myReChange')">
        <i class="iconfont icon-form"></i>
        充值记录
      </div>
      <div class="flex-item flex-wrp flexColumn jacenter" @click="goPage('pwdSet')">
        <i class="iconfont icon-guanli"></i>
        密码设置
      </div>
    </div>
    <div class="lister flex-wrp">
      <div class="list" v-for="(item, index) in items" :key="index">
        <div class="listCon" @click="changeTab(index)" :class="{listConCur:item.cur}">
          <div class="p1">
            {{item.name}}
          </div>
          <div class="p2">
            售价{{item.salesPrice}}元
          </div>
          <div class="jicon" v-if="item.endDate">限时</div>
        </div>
      </div>
    </div>
    <div class="btn" @click="pay">微信支付</div>
  </div>
</template>

<script>
import Api from '@/api/index.js'
import { Indicator, Toast } from 'mint-ui'

const { GetMemberRechargeService, GetAppToWeiXinJsApiSign, PayWinXinService, CreateOrderService, GetMemberPrivateService } = Api
export default {
  components: {
  },
  data () {
    return {
      imgUrl: '',
      phone: '',
      isMember: false,
      items: [],
      tabIndex: 0,
      card: require('./pic.png'),
      private: {},
      account: '0.00'
    }
  },
  props: {},
  watch: {},
  methods: {
    goPage (path) {
      this.$router.push({
        path: `/${path}`
      })
    },
    GetMemberPrivateService () {
      Indicator.open()
      GetMemberPrivateService({
        memberId: localStorage.getItem('memberId')
      }).then(res => {
        console.log(res)
        Indicator.close()
        if (res.isSuccess) {
          this.private = res.data
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(err => {
        Indicator.close()
        console.log(err)
      })
    },
    GetMemberRechargeService () {
      Indicator.open()
      GetMemberRechargeService().then(res => {
        console.log(res)
        Indicator.close()
        if (res.isSuccess) {
          res.data.forEach((item) => {
            item.cur = false
          })
          res.data[0].cur = true
          this.items = res.data
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(err => {
        Indicator.close()
        console.log(err)
      })
    },
    CreateOrderService () {
      CreateOrderService({
        memberId: localStorage.getItem('memberId'),
        amount: this.items[this.tabIndex].salesPrice,
        mrId: this.items[this.tabIndex].id,
        typeId: '4'
      }).then(res => {
        console.log(res)
        Indicator.close()
        if (res.isSuccess) {
          this.wxPay(res.data.orderId)
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(err => {
        Indicator.close()
        console.log(err)
      })
    },
    setWXconfig () {
      const jsapiTicketSignUrl = location.href.split('#')[0]
      GetAppToWeiXinJsApiSign({
        jsapiTicketSignUrl
      }).then(res => {
        console.log(res)
        Indicator.close()
        if (res.isSuccess) {
          const params = res.data
          window.wx.config({
            appId: params.appId,
            timestamp: params.timestamp,
            nonceStr: params.nonceStr,
            signature: params.signature,
            jsApiList: [
              'chooseWXPay'
            ]
          })
          window.wx.error((res) => {
            console.log(res)
          })
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(err => {
        Indicator.close()
        console.log(err)
      })
    },
    wxPay (orderId) {
      Indicator.open()
      PayWinXinService({
        orderId
      }).then(res => {
        console.log(res)
        Indicator.close()
        if (res.isSuccess) {
          const signMap = res.data
          window.wx.ready(() => {
            window.wx.chooseWXPay({
              timestamp: signMap.timeStamp,
              nonceStr: signMap.nonceStr,
              package: signMap.package,
              signType: 'MD5',
              paySign: signMap.paySign,
              success: (res) => {
                console.log(res)
              },
              fail: (res) => {
                console.log(JSON.stringify(res))
              }
            })
          })
        } else {
          Toast({
            message: res.msg,
            position: 'bottom',
            duration: 3000
          })
        }
      }).catch(err => {
        Indicator.close()
        console.log(err)
      })
    },
    changeTab (index) {
      if (this.tabIndex === index) {
        return
      }
      this.items[index].cur = true
      this.items[this.tabIndex].cur = false
      this.tabIndex = index
    },
    pay () {
      if (!this.phone) {
        Toast({
          message: '请先绑定手机号',
          position: 'bottom',
          duration: 3000
        })
      }
      this.CreateOrderService()
    }
  },
  filters: {},
  computed: {},
  created () {
    document.title = this.$route.name
    this.imgUrl = localStorage.getItem('imgUrl')
    this.phone = localStorage.getItem('phone')
    this.GetMemberPrivateService()
    this.GetMemberRechargeService()
  },
  mounted () {
  },
  destroyed () {}
}
</script>

<style lang="scss">
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';
@import '~@/variables.scss';
.memberCard {
  .top {
    background:#fff;
    .cardView{
      margin:20px 20px 0;
      position:relative;
      .cardbg{
        display:block;width:100%;
      }
      .cardLogo{
        position:absolute;
        width:60px;height:60px;border-radius:50%;display:block;top:20px;right:20px;
      }
      .label{
        line-height:24px;color:#fff;font-size:12px;position:absolute;left:50%;top:50%;
        width:100px;padding:10px;margin-top:-22px;margin-left:-60px;
        text-align:center;
        .iconfont{
          margin-right:5px;
          color:#f4b447;
          font-size:25px;
        }
        span{
          display:block;color:$mColor;
        }
      }
      .memCur{
        color:#f4b447;font-size:16px;border:1px solid #f4b447;border-radius:5px;
      }
      .cardNum{
        position:absolute;
        border-radius:4px;bottom:15px;left:20px;
        font-size:14px;color:#f4b447;
      }
    }
  }
  .cardTips{
    padding: 10px 25px 10px 25px;
    line-height:24px;color:#666;font-size:13px;
    background:#fff;
  }
  .lister{
    flex-wrap:wrap;
    margin-top:5px;background:#fff;
    .list{
      width:50%;
      .listCon{
        position:relative;
        overflow:hidden;
        margin:10px;
        background:#fff;
        padding:7px 0;
        text-align:Center;
        border:1px solid #ddd;border-radius:8px;
        font-size:14px;line-height:26px;
        .p1{
          color:$mColor;
        }
        .p2{
          color:#666
        }
        .jicon{
          background:$mColor;
          color:#fff;font-size:12px;text-align:center;line-height:20px;position:absolute;width:60px;z-index:99;
          transform:rotate(-45deg);left:-23px;top:-10px;padding-top:15px;box-shadow:6px 0 7px #888;
        }
      }
      .listConCur{
        border-color:$mColor;
      }
    }
  }
  .btn{
    background:#28b925;line-height:50px;border-radius:4px;margin:10px 20px;color:#fff;font-size:16px;text-align:center;
  }
  .icons{
    background:#fff;padding-bottom:10px;color:#666;font-size:12px;
    .iconfont{
      font-size:20px;color:#888;margin-bottom:4px;
    }
    span{
      color:$mColor;padding-left:4px;font-size:14px;
    }
  }
}
</style>

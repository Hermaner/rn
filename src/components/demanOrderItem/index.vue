<!-- 商家列表 组件 -->

<template>
  <div class="demandOrderItem" @click="goDetail()">
    <div class="top flex-wrp jacenter">
      <div class="name flex-item">
        {{data.demandCategoryName}}
      </div>
    </div>
    <div class="mid">
      <div class="detail">{{data.detail}}</div>
      <div class="close flex-wrp">
        <div class="flex-item">截止日期：{{data.closingDate.substr(0,10)}}</div>
        <div class="label">
          {{computeDate(data.modiDate)}}
        </div>
      </div>
      <div class="price flex-wrp jacenter">
        <div class="label">费用</div>{{data.servicesPrice ? `${data.servicesPrice}元` : '再议'}}
      </div>
    </div>
    <div class="bom flex-wrp jacenter">
      <img v-lazy="data.memberInfo.imgUrl">
      <div class="nick">{{decodeURI(data.memberInfo.nickName)}}</div>
      <div class="flex-item">{{data.provinceName}}{{data.cityName}}</div>
      {{data.distance > 200 ? `${(data.distance/1000).toFixed(2)}km` : '小于200m'}}
    </div>
  </div>
</template>

<script>
import Star from '@/components/base/star/star'

export default {
  components: {
    Star
  },
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {},
  methods: {
    computeDate (time) {
      let target = (new Date().getTime() - new Date(time).getTime()) / 1000 / 60
      if (target < 60) {
        target = parseInt(target)
        return `${target}分钟前`
      } else if (target >= 60 && target < (24 * 60)) {
        target = parseInt(target / 60)
        return `${target}小时前`
      } else {
        return time.substr(0, 10)
      }
    },
    goDetail () {
      this.$router.push({
        path: '/demandOrderDetail',
        query: {
          item: JSON.stringify(this.data)
        }
      })
    }
  },
  filters: {},
  computed: {},
  created () {},
  mounted () {},
  destroyed () {}
}
</script>

<style lang="scss">
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';
@import '~@/variables.scss';

.demandOrderItem {
  overflow: hidden;
  background:#fff;
  position:relative;
  margin-bottom:5px;
  >.top{
    height:20px;padding:10px 10px 0;
    .name{
      font-size:14px;color:$mColor;
    }
  }
  .mid{
    padding:2px 10px 5px;
    font-size:12px;color:#666;
    .detail{
      color:#444;
      line-height:20px;padding:6px 0;
    }
    .close{

    }
    .label{
      color:#ff0000;font-size:12px;
    }
    .price{
      position:absolute;
      background:$mColor;
      height:30px;border-radius: 15px 0 0 15px;
      padding:0 10px 0 8px;right:0;top:6px;
      color:#fff;
      font-size:15px;
      .label{
        background:#fff;font-size:12px;color:$mColor;border-radius:15px;padding:3px 5px;margin-right:3px;
      }
    }
  }
  .bom{
    font-size:12px;
    color:#888;
    line-height:38px;
    border-top:1px solid #e4e4e4;
    padding:0 10px;
    img{
      width:30px;height:30px;display:block;border-radius:50%;margin-right:5px;
    }
    .nick{
      padding-right:5px;
    }
    .label{
      span{
        color:$mColor;
        font-size:16px;
      }
    }
  }
}
</style>

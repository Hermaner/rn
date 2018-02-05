<!-- 种类单个 组件 -->

<template>
  <div class="evalItem flex-wrp">
    <div class="right flex-item">
      <div class="top flex-wrp jacenter">
        <img :src="item.memberInfo.imgUrl">
        <div class="flex-item flex-wrp jacenter">
          <div class="flex-item">
          <div>周撒旦</div>
          <div class="flex-wrp">
            <div style="padding-right:8px;">
              服务
              <star-rating
                size='0.5'
                color='#f67348'
                :score='5'
                maxScore='5'
                :readOnly=true
              />
            </div>
            <div>
              态度
              <star-rating
                size='0.5'
                color='#f67348'
                :score='5'
                maxScore='5'
                :readOnly=true
              />
            </div>
          </div>
          </div>
          <div style="text-align:right"><div>2018-01-01</div><span class="rik">装修</span></div>
        </div>
      </div>
      <div class="con">
        <div class="label">
        用户默认好评
        </div>
        <div class="flex-wrp" style="flex-wrap:wrap">
        <img src="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLHhNibLUZuoB2ib3a4WicvOPyicmmiaHxEfwHfkE07F5gg49RaLJhFc2OPQLViby1IOT2qsQlWZOEz8Qw/0">
        <img src="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLHhNibLUZuoB2ib3a4WicvOPyicmmiaHxEfwHfkE07F5gg49RaLJhFc2OPQLViby1IOT2qsQlWZOEz8Qw/0">
        <img src="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJLHhNibLUZuoB2ib3a4WicvOPyicmmiaHxEfwHfkE07F5gg49RaLJhFc2OPQLViby1IOT2qsQlWZOEz8Qw/0">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rate'

export default {
  components: {
    StarRating
  },
  data () {
    return {}
  },
  props: {
    item: {
      type: Object
    }
  },
  methods: {
    toList () {
      this.$emit('toList')
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';
@import '~@/variables.scss';

.evalItem{
padding:10px;
background:#fff;
margin-bottom:5px;
.top{
  height:35px;color:#666;font-size:12px;
  img{
    width:35px;height:35px;border-radius:50%;margin-right:6px;display:block;
  }
  .rik{
    background:$mColor;
    color:#fff;font-size:12px;
    border-radius:2px;
    display:inline-block;
    margin-top:2px;
    padding:0px 3px;
  }
}
.con{
  padding-top:5px;
  .label{
    font-size:12px;color:#666;line-height:18px;padding-bottom:3px;
  }
  img{
    display:block;width:60px;height:60px;margin:0 5px 5px 0;
  }
}
}
</style>

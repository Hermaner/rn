<!-- 种类单个 组件 -->

<template>
  <div class="evalItem flex-wrp">
    <div class="right flex-item">
      <div class="top flex-wrp jacenter">
        <img :src="item.memberInfo.imgUrl">
        <div class="flex-item flex-wrp jacenter">
          <div class="flex-item flex-wrp flexColumn">
          <div class="flex-wrp"><div class="flex-item">{{decodeURI(item.memberInfo.userName)}}</div><div>
            {{item.modiDate}}
          </div></div>
          <div class="flex-wrp starLabel">
            <div>
              态度
              <star-rating
                size='0.6'
                color='#f67348'
                :score='item.attitudeScore'
                maxScore='5'
                :readOnly=true
              />
            </div>
            <div>
              质量
              <star-rating
                size='0.6'
                color='#f67348'
                :score='item.qualityScore'
                maxScore='5'
                :readOnly=true
              />
            </div>
          </div>
          </div>
        </div>
      </div>
      <div class="con">
        <div class="label">
        {{item.content}}
        </div>
        <div class="flex-wrp" style="flex-wrap:wrap" v-if="item.imgUrl.length>0">
        <img v-for="(list, index) in item.imgUrl.split(',')" :src="list">
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
  height:40px;color:#666;font-size:12px;
  img{
    width:40px;height:40px;border-radius:50%;margin-right:5px;display:block;
  }
}
.starLabel{
  color:#999;
  >div{
    padding-right:8px;
  }
}
.con{
  padding-top:6px;
  .label{
    font-size:12px;color:#666;line-height:18px;padding-bottom:3px;
  }
  img{
    display:block;width:60px;height:60px;margin:0 5px 5px 0;
  }
}
}
</style>

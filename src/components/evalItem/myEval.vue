<!-- 种类单个 组件 -->

<template>
  <div class="evalItem flex-wrp">
    <div class="right flex-item">
      <div class="top">
        {{item.modiDate}}
      </div>
      <div class="con">
        <div class="flex-wrp">
          <div class="starList">
            态度
            <star-rating
              size='0.5'
              color='#f67348'
              :score='item.attitudeScore'
              maxScore='5'
              :readOnly=true
            />
          </div>
          <div class="starList">
            质量
            <star-rating
              size='0.5'
              color='#f67348'
              :score='item.qualityScore'
              maxScore='5'
              :readOnly=true
            />
          </div>
        </div>
        <div class="label" v-if="item.content">
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

<style lang="scss" scoped>
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.evalItem{
padding:10px;
background:#fff;
margin-bottom:5px;
.top{
  height:20px;color:#666;font-size:12px;line-height:20px;
  img{
    width:40px;height:40px;border-radius:50%;margin-right:10px;display:block;
  }
}
.starList{
  color:#666;font-size:12px;padding-right:10px;
}
.con{
  .label{
    font-size:12px;color:#666;line-height:18px;padding-bottom:3px;
  }
  img{
    display:block;width:60px;height:60px;margin:0 5px 5px 0;
  }
}
}
</style>

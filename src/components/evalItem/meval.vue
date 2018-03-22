<!-- 种类单个 组件 -->

<template>
  <div class="meval">
    <div class="top flex-wrp">
      <div class="img">
        <img :src="item.memberInfo.imgUrl">
      </div>
      <div class="info flex-item flex-wrp flexColumn">
        <div class="flex-wrp">
          <div class="name flex-item">
            {{decodeURI(item.memberInfo.userName)}}
          </div>
          <div style="color:#888;">
            {{item.modiDate}}
          </div>
        </div>
        <div>
          <div class="type flex-wrp flex-item acenter">
            <span>{{item.servicesTypeName}}</span>
          </div>
          <div class="star flex-wrp">
            <div class="flex-item flex-wrp acenter">
              <span style="padding-right:2px;color:#888">态度</span>
              <star-rating
                size='0.8'
                color='#ff0000'
                :score='item.attitudeScore || 5'
                maxScore='5'
                :readOnly=true
              >
              </star-rating>
              <span style="padding-left:4px;color:#ff0000">{{item.masterStarLevel || 5}}分</span>
            </div>
            <div class="flex-item flex-wrp acenter">
              <span style="padding-right:2px;color:#888">质量</span>
              <star-rating
                size='0.8'
                color='#ff0000'
                :score='item.qualityScore || 5'
                maxScore='5'
                :readOnly=true
              >
              </star-rating>
              <span style="padding-left:4px;color:#ff0000">{{item.masterStarLevel || 5}}分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="ads">{{item.address}}</div>
      {{item.content || '该用户没有留下太多信息'}}
    </div>
    <div class="bom flex-wrp" v-if="item.imgUrl">
      <img @click="showImg(item)" :src="item" v-for="(item, index) in item.imgUrl.split(',')" :key="index" />
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
    },
    showImg (img) {
      this.$emit('showImg', img)
    }
  }
}
</script>

<style lang="scss">
@import '~@/assets/scss/const.scss';
@import '~@/assets/scss/mixin.scss';

.meval{
  padding-bottom:5px;
  margin:0 3px 5px;
  overflow:hidden;
  background:#fff;
  .top{
    padding:10px 5px;
    .img{
      width:60px;height:60px;
      margin-right:8px;
      img {
        width:100%;
        height:100%;
        border-radius:50%;
      }
    }
    .info{
      font-size:12px;
      .name{
        color:#666;
      }
      .type{
        padding: 4px 0;
        span{
          line-height:20px;color:#fff;background:#8A2BE2;border-radius:5px;padding:0 6px;
          display:inline-block;
        }
      }
      .star{

      }
    }
    .right{
      font-size:12px;color:#999;
    }
  }
  .mid{
    font-size:12px;color:#666;line-height:20px;padding:8px 10px 0;border-top:1px dashed #eee;position:relative;
    &:before, &:after{
      position:absolute;
      content: '';
      top:-5px;
      display:block;
      background:#eee;
      width:10px;height:10px;border-radius:50%;
    }
    &:before{
      left:-5px;
    }
    &:after{
      right:-5px;
    }
    .ads{
      color:#999;
    }
  }
  .bom{
    flex-wrap:wrap;
    padding-left:10px;
    img{
      width:60px;height:60px;margin: 4px 4px 0 0;display:block;
    }
  }
}
</style>

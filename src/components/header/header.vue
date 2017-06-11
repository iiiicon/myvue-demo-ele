<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avator">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="supports-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade" mode="out-in">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="supports-item" v-for="(item,index) in seller.supports">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import star from '@/components/star/star';

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  components: {
    star
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  }
};
</script>

<style lang="stylus">
  @import '../../common/stylus/mixin.styl'

  .header
    position: relative
    overflow: hidden
    background: rgba(7, 17, 27, .4)
    color: #fff
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      .avator
        display: inline-block
        vertical-align: top
        img
          border-radius: 2px        
      .content
        display: inline-block
        margin-left: 16px    
        .title
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('./images/brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('./images/decrease_1')
            &.discount
              bg-image('./images/discount_1')
            &.guarantee
              bg-image('./images/guarantee_1')
            &.invoice
              bg-image('./images/invoice_1')
            &.special
              bg-image('./images/special_1')
          .text
            color: #fff
            line-height: 12px
            font-size: 10px
      .supports-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 10px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0, 0, 0, .2)
        text-align: center
        .count
          vertical-align: top
          font-size: 10px
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px
          font-size: 10px
    .bulletin-wrapper
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background: rgba(7, 17, 27, .2)
      .bulletin-title
        display: inline-block
        vertical-align: top
        width: 22px
        height: 12px
        margin-top: 8px 
        bg-image('./images/bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
        font-size: 10px
      .bulletin-text 
        vertical-align: top
        margin: 0 4px
        font-size: 10px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
      img
        width: 100%
        height: 100%
    .detail
      position: fixed
      z-index: 100
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: rgba(7, 17, 27, .8)
      backdrop-filter: blur(10px)
      .detail-wrapper
        width: 100%;
        min-height: 100%
        .detail-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            font-size: 16px
            text-align: center
            font-size: 16px 
            font-weight: 700
          .star-wrapper
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title
            display: flex
            width: 80%
            margin: 28px auto 24px auto
            .line
              flex: 1
              position: relative
              top: -6px
              border-bottom: 1px solid rgba(255,255,255,0.2)
            .text
              padding: 0 12px
              font-weight: 700
              font-size: 14px 
          .supports
            width: 80%
            margin: 0 auto
            .supports-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px;
                height: 16px
                vertical-align: top
                margin-right: 6px;
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('./images/decrease_2')
                &.discount
                  bg-image('./images/discount_2')
                &.guarantee
                  bg-image('./images/guarantee_2')
                &.invoice
                  bg-image('./images/invoice_2')
                &.special
                  bg-image('./images/special_2')
              .text
                line-height: 16px
                font-size: 12px
      .detail-close
        position: relative
        margin: -64px auto 0 auto
        width: 32px
        height: 32px
        font-size: 32px
        clear: both


          




</style>

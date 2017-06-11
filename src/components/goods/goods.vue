<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" @click="selecteItem(index, $event)" class="menu-item" :class="currentIndex===index ? 'current' : ''">
          <span class="text border-1px">
            <text-icon :item="item" :sizeClass="'small'"></text-icon>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="foods-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="foods-item border-1px">
              <div class="food-icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="food-content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" v-on:cartAdd="cartAdd"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import textIcon from '@/components/text-icon/text-icon';
import shopCart from '@/components/shopcart/shopcart';
import cartcontrol from '@/components/cartcontorl/cartcontrol';

const ERR_OK = 0;

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];

    this.$http.get('/api/goods').then((res) => {
      res = res.body;
      if (res.errno === ERR_OK) {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  computed: {
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectFood = food;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach((item) => {
        item.foods.forEach((food) => {
          let count = food.count;
          if (count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
          return i;
        }
      }
      return 0;
    }
  },
  components: {
    'text-icon': textIcon,
    'shopcart': shopCart,
    'cartcontrol': cartcontrol
  },
  mounted() {
  },
  methods: {
    cartAdd(target) {
      // console.log(target);
      this.$nextTick(() => {
        this.$refs.shopcart.dropDown(target);
      });
    },
    selecteItem(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodWrapper, {
        click: true,
        probeType: 3
      });
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.floor(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (var i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    hideList() {
    }
  }
};
</script>

<style lang="stylus">
  @import "../../common/stylus/mixin"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding:0 12px
        line-height:14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #ffffff
          font-weight: 700
          .text
            border-none()
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7, 17, 27, .1))
    .foods-wrapper 
      flex: 1
      .foods-list
        .title
          height: 26px
          line-height: 26px
          padding-left: 14px
          font-size: 12px
          border-left: 2px solid #d9dde1 
          background: #f3f5f7
          color: rgb(147, 153, 159)
        .foods-item
          display: flex
          padding: 18px
          // margin-bottom: 18px
          border-1px(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
            margin-bottom: 0
          .food-icon
            flex: 0 0 57px
            img
              width: 100%
          .food-content
            position: relative
            flex: 1
            margin-left: 10px
            .name
              font-size: 12px
              line-height: 14px
              margin-top: 2px
              color: rgb(7, 17, 27)
            .desc
              font-size: 10px
              line-height: 12px
              color: rgb(147, 153, 159)
              margin-top: 8px
            .extra
              margin-top: 8px
              line-height: 10px
              span
                font-size: 12px
                color: rgb(147, 153, 159)
                &.count
                  margin-right: 12px
            .price
              line-height: 24px
              font-size: 12px
              .old
                text-decoration: line-through
                font-size: 10px
                color: rgb(147, 153, 159)
              .now
                margin-right: 8px
                font-size: 14px
                color: rgb(240, 20 ,20)

            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: -6px
</style>

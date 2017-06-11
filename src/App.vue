<template>
  <div id="app">
    <zs-header :seller="seller"></zs-header>
    <div class="tab border-1px">
      <div class="tabitem">
        <router-link to="/" exact>产品</router-link>
      </div>
      <div class="tabitem">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tabitem" router-link to="/seller">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view :seller="seller" keep-alive></router-view>
    </div>
    <div class="footer">
      <!--i am footer-->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { urlParse } from '@/common/js/util';
import header from '@/components/header/header';

const ERR_OK = 0;

export default {
  data() {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse();
          return queryParam.id;
        })()
      }
    };
  },
  created() {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        // this.seller = response.data;
        console.log(`id is ${this.seller.id}`);
        this.seller = Object.assign({}, this.seller, response.data);
      }
    });
  },
  components: {
    'zs-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7, 17, 27, .1))
      .tabitem
        flex: 1
        text-align: center
        & > a 
          display: block
          font-size: 14px
          color: #333
          &.router-link-active
              color: rgb(240, 20, 20)
        
</style>

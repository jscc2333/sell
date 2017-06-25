<template>
  <div>
    <transition name="move">
      <div class="food" v-show="showFlag" ref="food">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back">
              <i class="icon-arrow_lift" @click="hide"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="sell-rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span v-show="food.oldPrice" class="old">{{food.oldPrice}}</span>
            </div>
            <div class="cartcontrol-wrapper" v-if="food.count > 0">
              <cartcontrol :food="food"></cartcontrol>
            </div>
            <div class="buy" v-else @click="increaseFirst($event)">加入购物车</div>
          </div>
          <split></split>
          <div class="info">
            <h1 class="title">商品介绍</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
            <div class="rating-wrapper">
              <ul v-if="food.ratings && food.ratings.length">
                <li v-for="(rating,ratingIndex) in food.ratings" :key="ratingIndex" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
                  <div class="user">
                    <span class="user-name">{{rating.username}}</span>
                    <img :src="rating.avatar" class="avatar" width="12" length="12">
                  </div>
                  <div class="time">{{rating.rateTime | formatDate}}</div>
                  <div class="text">
                    <i :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>
                    {{rating.text}}
                  </div>
                </li>
              </ul>
              <div v-else class="no-rating">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
import split from '../split/split';
import ratingselect from '../ratingselect/ratingselect';
import {formatDate} from '../../common/js/date.js';

const POSITIVE = 0;
const NEGTIVE = 1;
const ALL = 2;

export default {
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  created() {
    this.$root.eventHub.$on('ratingtypeSelect', (type) => {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }).$on('onlyContentToggle', (contentType) => {
      this.onlyContent = contentType;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    });
  },
  components: {
    cartcontrol: cartcontrol,
    split: split,
    ratingselect: ratingselect
  },
  methods: {
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    increaseFirst(event) {
      if (!event._constructed) {
        return;
      }
      Vue.set(this.food, 'count', 1);
      this.$root.eventHub.$emit('cartIncrease', event.target);
    },
    needShow(rateType, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return this.selectType === rateType;
      }
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  }
};
</script>
 
<style lang="less">
@import '../../common/less/mixin.less';

.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  z-index: 30;
  width: 100%;
  background: #fff;
  transition: all .4s linear;
  transform: translate3d(0, 0, 0);
  &.move-enter,
  &.move-leave-active {
    transform: translate3d(100%, 0, 0)
  }
  .image-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .back {
      position: absolute;
      left: 0;
      top: 10px;
      z-index: 50;
      .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
  .content {
    padding: 18px;
    font-size: 0;
    position: relative;
    .title {
      line-height: 14px;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
    }
    .detail {
      line-height: 10px;
      margin-bottom: 18px;
      .sell-count,
      .sell-rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .sell-count {
        margin-right: 12px;
      }
    }
    .price {
      line-height: 24px;
      font-weight: 700;
      .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
      }
      .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      bottom: 12px;
      right: 12px;
    }
    .buy {
      position: absolute;
      right: 18px;
      bottom: 18px;
      z-index: 10;
      height: 24px;
      line-height: 24px;
      padding: 0 12px;
      box-sizing: border-box;
      border-radius: 12px;
      font-size: 10px;
      color: rgb(255, 255, 255);
      background: rgb(0, 160, 220);
    }
  }
  .info {
    padding: 18px;
    .title {
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
      margin-bottom: 6px;
    }
    .text {
      padding: 0 8px;
      line-height: 24px;
      font-size: 12px;
      font-weight: 200;
      color: rgb(77, 85, 93);
    }
  }
  .rating {
    padding-top: 18px;
    .title {
      line-height: 14px;
      margin-left: 18px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .rating-wrapper {
      .rating-item {
        position: relative;
        padding: 16px 0;
        margin: 0 18px;
        .border-1px(rgba(7, 17, 27, 0.1));
        .user {
          position: absolute;
          top: 16px;
          right: 0;
          line-height: 12px;
          .user-name {
            display: inline-block;
            vertical-align: top;
            font-size: 10px;
            color: rgb(147, 153, 159);
            margin-right: 6px;
          }
          .avatar {
            border-radius: 50%;
          }
        }
        .time {
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .text {
          margin-top: 6px;
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .icon-thumb_up,
          .icon-thumb_down {
            margin-right: 4px;
            line-height: 24px;
            font-size: 12px;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }
        }
      }
      .no-rating {
        padding: 16px 0;
        margin: 0 18px;
        font-size: 12px;
        color: rgb(147, 153, 159);
      }
    }
  }
}
</style>

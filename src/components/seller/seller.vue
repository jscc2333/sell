<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="overview-top">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="count">({{seller.ratingCount}})</span>
            <span class="count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite" @click="toggleFavorite">
            <i class="icon-favorite" :class="{'active':favorite}"></i>
            <span class="text">{{favoriteText}}</span>
          </div>
        </div>
        <div class="overview-bot">
          <ul class="remark">
            <li class="block">
              <h2 class="title">起送价</h2>
              <div class="content">
                <span class="stress">{{seller.minPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2 class="title">商家配送</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryPrice}}</span>元
              </div>
            </li>
            <li class="block">
              <h2 class="title">平均配送时间</h2>
              <div class="content">
                <span class="stress">{{seller.deliveryTime}}</span>分钟
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <split></split>
    <div class="bulletin">
      <h1 class="title">公告与活动</h1>
      <div class="content-wrapper">
        <p class="text">{{seller.bulletin}}</p>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="supports-item" v-for="(item,index) in seller.supports" :key="index">
          <icon :type="seller.supports[index].type" :size="4"></icon>
          <span class="text">{{seller.supports[index].description}}</span>
        </li>
      </ul>
    </div>
    <split></split>
    <div class="pics">
      <h1 class="title">商家实景</h1>
  
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import split from '../split/split';
import star from '../star/star';
import icon from '../icon/icon';
import { loadFromLocal, saveToLocal } from '../../common/js/store';

export default {
  data() {
    return {
      favorite: (() => {
        return loadFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    split: split,
    star: star,
    icon: icon
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '收藏';
    }
  },
  watch: {
    seller() {
      this._initScroll();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    _initScroll() {
      if (!this.scroll) {
        console.log('init');
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    }
  }
};
</script>

<style lang="less">
@import '../../common/less/mixin.less';
.seller {
  .seller-content {
    padding: 18px;
    .overview {
      .overview-top {
        position: relative;
        .name {
          margin-bottom: 8px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          padding-bottom: 18px;
          .border-1px(rgba(7, 17, 27, 0.1));
          .count {
            display: inline-block;
            vertical-align: top;
            line-height: 18px;
            font-size: 10px;
            color: rgb(77, 85, 93);
            &:first-child {
              margin: 0 12px 0 8px;
            }
          }
        }
        .favorite {
          position: absolute;
          top: 0;
          right: 0;
          text-align: center;
          .icon-favorite {
            display: block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(147, 153, 159);
            &.active {
              color: rgb(240, 20, 20);
            }
          }
          .text {
            line-height: 10px;
            font-size: 10px;
            color: rgb(77, 85, 93);
          }
        }
      }
      .overview-bot {
        padding-top: 18px;
        .remark {
          display: flex;
          .block {
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7, 17, 27, 0.1);
            &:last-child {
              border: none;
            }
            .title {
              line-height: 10px;
              font-size: 10px;
              color: rgb(147, 153, 159);
              margin-bottom: 4px;
            }
            .content {
              line-height: 24px;
              font-size: 10px;
              font-weight: 200;
              color: rgb(7, 17, 27);
              .stress {
                font-size: 24px;
              }
            }
          }
        }
      }
    }
  }
  .bulletin {
    padding: 18px 18px 0 18px;
    .title {
      margin-bottom: 8px;
      line-height: 14px;
      font-size: 14px;
      color: rgb(7, 17, 27);
    }
    .content-wrapper {
      padding: 0 12px 16px 12px;
      .border-1px(rgba(7, 17, 27, 0.1));
      .text {
        line-height: 24px;
        font-size: 12px;
        font-weight: 200;
        color: rgb(240, 20, 20);
      }
    }
    .supports {
      .supports-item {
        padding: 16px 12px;
        font-size: 0;
        .border-1px(rgba(7, 17, 27, 0.1));
        &:last-child {
          border: none;
        }
        .text {
          display: inline-block;
          vertical-align: top;
          margin-left: 6px;
          line-height: 16px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
        }
      }
    }
  }
}
</style>

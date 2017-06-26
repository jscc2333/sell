<template>
  <div class="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="24" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="24" :score="seller.score"></star>
            <span class="score">{{seller.score}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
    </div>
    <split></split>
    <ratingselect :ratings="ratings" :selectType="selectType" :only-content="onlyContent" :desc="desc"></ratingselect>'
    <div class="rating-wrapper">
      <ul v-if="ratings && ratings.length">
        <li v-for="(rating,ratingIndex) in ratings" :key="ratingIndex" class="rating-item" v-show="needShow(rating.rateType,rating.text)">
          <div class="avatar">
            <img :src="rating.avatar" width="28" height="28">
          </div>
          <div class="content">
            <h1 class="username">{{rating.username}}</h1>
            <div class="star-wrapper">
              <star :size="24" :score="rating.score"></star>
              <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
            </div>
            <p class="text">{{rating.text}}</p>
            <div class="recommend" v-show="rating.recommend  && rating.recommend.length">
              <i :class="{'icon-thumb_up':rating.rateType === 0,'icon-thumb_down':rating.rateType === 1}"></i>
              <span class="item" v-for="(item,index) in rating.recommend" :key="index">{{item}}</span>
            </div>
            <div class="time">{{rating.rateTime | formatDate}}</div>
          </div>
        </li>
      </ul>
      <div v-else class="no-ratings">暂无评价</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import ratingselect from '../ratingselect/ratingselect';
import split from '../split/split';
import star from '../star/star';
import { formatDate } from '../../common/js/date.js';

const ERR_OK = 0;
const POSITIVE = 0;
const NEGTIVE = 1;
const ALL = 2;

export default {
  data() {
    return {
      ratings: [],
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '满意',
        negative: '不满意'
      }
    };
  },
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    ratingselect: ratingselect,
    split: split,
    star: star
  },
  created() {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;
      if (response.errno === ERR_OK) {
        response.data.forEach((rating) => {
          this.ratings.push(rating);
        });
      }
    });
    this.$root.eventHub.$on('ratingtypeSelect', (type) => {
      this.selectType = type;
    }).$on('onlyContentToggle', (contentType) => {
      this.onlyContent = contentType;
    });
  },
  methods: {
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

.ratings {
  .ratings-content {
    padding: 18px 0;
    .overview {
      display: flex;
      .overview-left {
        flex: 0 0 137.5px;
        box-sizing: border-box;
        padding: 6px 24px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        .score {
          margin-bottom: 6px;
          line-height: 28px;
          font-size: 24px;
          color: rgb(256, 153, 0);
        }
        .title {
          line-height: 12px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          margin-bottom: 8px;
        }
        .rank {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
      .overview-right {
        flex: 1;
        padding: 6px 24px;
        box-sizing: border-box;
        .score-wrapper {
          margin-bottom: 8px;
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            margin-right: 12px;
          }
          .score {
            margin-left: 12px;
            line-height: 18px;
            font-size: 12px;
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          .title {
            line-height: 18px;
            font-size: 12px;
            color: rgb(7, 17, 27);
            margin-right: 12px;
          }
          .delivery {
            line-height: 18px;
            font-size: 12px;
            color: rgb(147, 153, 159)
          }
        }
      }
    }
  }
  .rating-wrapper {
    padding: 0 18px;
    .rating-item {
      display: flex;
      padding: 18px 0;
      .border-1px(rgba(7, 17, 27, 0.1));
      .avatar {
        flex: 0 0 28px;
        margin-right: 12px;
        width: 28px;
        img {
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        flex: 1;
        .username {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }
        .star-wrapper {
          margin-bottom: 6px;
          .delivery {
            margin-left: 6px;
            line-height: 12px;
            font-size: 10px;
            font-weight: 200;
            color: rgb(147, 153, 159);
          }
        }
        .text {
          margin-bottom: 8px;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
        .recommend {
          line-height: 16px;
          font-size: 0;
          .icon-thumb_up,
          .icon-thumb_down {
            display: inline-block;
            vertical-align: top;
            margin:2px 8px 0 0;
            font-size: 12px;
          }
          .icon-thumb_up {
            color: rgb(0, 160, 220);
          }
          .icon-thumb_down {
            color: rgb(183, 187, 191);
          }
          .item {
            display: inline-block;
            padding: 0 6px;
            margin-right: 8px;
            width: 30px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            background: #fff;
            font-size: 9px;
            color: rgb(147, 153, 159);
          }
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          font-weight: 200;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>

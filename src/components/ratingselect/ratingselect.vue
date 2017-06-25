<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block all" :class="{'active':d_selectType === 2}" @click="select(2,$event)">
        {{desc.all}}
        <span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" :class="{'active':d_selectType === 0}" @click="select(0,$event)">
        {{desc.positive}}
        <span class="count">{{positives.length}}</span>
      </span>
      <span class="block negative" :class="{'active':d_selectType === 1}" @click="select(1,$event)">
        {{desc.negative}}
        <span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" :class="{'on':onlyContent}" @click="toggleContent($event)">
      <i class="icon-check_circle"></i>
      <span class="text">只查看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0;
const NEGTIVE = 1;
const ALL = 2;

export default {
  data() {
    return {
      d_selectType: this.selectType,
      d_onlyContent: this.onlyContent
    };
  },
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGTIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.d_selectType = type;
      this.$root.eventHub.$emit('ratingtypeSelect', type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.d_onlyContent = !this.d_onlyContent;
      this.$root.eventHub.$emit('onlyContentToggle', this.d_onlyContent);
    }
  }
};
</script>

<style lang="less">
@import '../../common/less/mixin.less';

.ratingselect {
  .rating-type {
    padding: 18px 0;
    margin: 0 18px;
    font-size: 0;
    .border-1px(rgba(7, 17, 27, 0.1));
    .block {
      display: inline-block;
      padding: 8px 12px;
      margin-right: 8px;
      line-height: 16px;
      border-radius: 1px;
      font-size: 12px;
      color: rgb(77, 58, 93);
      &.active {
        color: #fff;
      }
      &.all {
        background: rgba(0, 160, 200, 0.2);
        &.active {
          background: rgb(0, 160, 220);
        }
      }
      &.positive {
        background: rgba(0, 160, 220, 0.2);
        &.active {
          background: rgb(0, 160, 200);
        }
      }
      &.negative {
        margin-right: 0;
        background: rgba(77, 85, 93, 0.2);
        &.active {
          background: rgb(77, 85, 93);
        }
      }
      .count {
        margin-left: 2px;
        line-height: 16px;
        font-size: 10px;
      }
    }
  }
  .switch {
    padding: 12px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    color: rgb(147, 153, 159);
    line-height: 24px;
    font-size: 0;
    &.on {
      .icon-check_circle {
        color: #00c850;
      }
    }
    .icon-check_circle {
      display: inline-block;
      font-size: 24px;
      margin-right: 4px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      font-size: 12px;
    }
  }
}
</style>

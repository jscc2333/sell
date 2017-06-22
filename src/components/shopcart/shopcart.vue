<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
          <div v-for="ball in balls" v-show="ball.show" :key="ball" class="ball">
            <transition name="drop-inner">
              <div class="inner inner-hook"></div>
            </transition>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: []
    };
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{
          price: 0,
          count: 0
        }];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach((food) => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        return `还需￥${this.minPrice - this.totalPrice}元起送`;
      } else {
        return '去结算';
      }
    },
    payClass() {
      if (this.totalPrice >= this.minPrice) {
        return 'enough';
      } else {
        return 'not-enough';
      }
    }
  },
  created() {
    this.$root.eventHub.$on('cartIncrease', (el) => {
      this.drop(el);
    });
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(Window.innerHeight - rect.top - 22);
          el.display.style = '';
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.Transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName('inner-hook')[0];
          console.log(inner);
          inner.style.webkitTransform = `translate3d(${x},0,0)`;
          inner.style.Transform = `translate3d(${x},0,0)`;
          console.log('run to here');
        }
      }
    },
    enter(el, done) {
      let rf = el.offestHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = `translate3d(0,0,0)`;
        el.style.Transform = `translate3d(0,0,0)`;
        let inner = el.getElementsByClassName('inner-hook')[0];
        inner.style.webkitTransform = `translate3d(0,0,0)`;
        inner.style.Transform = `translate3d(0,0,0)`;
        console.log('run to here');
      });
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = 'none';
        console.log('run to here');
      }
    }
  }
};
</script>

<style lang="less">
.shopcart {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 50;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0; // opacity: 0.1;
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.highlight {
            background: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.highlight {
              color: #fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
        }
      }
      .display {
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
      }
      .price {
        .display;
        padding-right: 12px;
        margin-top: 12px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        box-sizing: border-box;
        font-size: 16px;
        font-weight: 700;
        &.highlight {
          color: #fff;
        }
      }
      .desc {
        .display;
        margin: 12px 0 0 12px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
        &.enough {
          color: #fff;
          background: #00b43c;
        }
        &.not-enough {
          background: #2b333b;
        }
      }
    }
    .ball-container {
      .drop-enter,
      .drop-inner {
        opacity: 0;
      }
      .drop-enter-active,
      .drop-inner-active {
        transition: all .4s ease;
      }
      .ball {
        position: fixed;
        left: 32px;
        bottom: 22px;
        z-index: 200;
        .inner {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(0, 160, 200);
        }
      }
    }
  }
}
</style>

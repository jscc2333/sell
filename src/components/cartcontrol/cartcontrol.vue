<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart($event)">
        <transition name="inner">
          <span class="inner icon-remove_circle_outline" v-show="food.count>0"></span>
        </transition>
      </div>
    </transition>
    <div class=" cart-count " v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click.stop="increaseCart($event)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';

export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    decreaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (this.food.count > 0) {
        this.food.count--;
      }
    },
    increaseCart(event) {
      if (!event._constructed) {
        return;
      }
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1);
      } else {
        this.food.count++;
      }
      this.$root.eventHub.$emit('cartIncrease', event.target);
    }
  }
};
</script>

<style lang="less">
.cartcontrol {
  font-size: 0;
  .display {
    display: inline-block;
    padding: 6px;
  }
  .font {
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
  .cart-decrease {
    .display;
    &.fade-enter,
    &.fade-leave-active {
      transform: translate3d(24px, 0, 0);
      opacity: 0;
    }
    &.fade-enter-active,
    &.fade-leave-active {
      transition: all .4s linear;
    }
    .inner {
      display: inline-block;
      .font;
      &.inner-enter-active,
      &.inner-leave-active {
        transition: all 0.4s linear;
        transform: rotate(0)
      }
      &.inner-enter,
      &.inner-leave-active {
        opacity: 0;
        transform: rotate(180deg)
      }
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding: 6px 0;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-increase {
    .display;
    .font;
  }
}
</style>

<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart()">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class=" cart-count " v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase icon-add_circle" @click="increaseCart()"></div>
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
    decreaseCart() {
      if (this.food.count > 0) {
        this.food.count--;
      }
    },
    increaseCart() {
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
  .move-enter {
    transform: translate3d(24px, 0, 0);
    opacity: 0;
  }
  .move-enter-active {
    transition: all .4s linear;
  }
  .move-leave-active {
    transform: translate3d(24px, 0, 0);
    transition: all .3s linear;
  }
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
    .inner {
      .font;
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

<template>
  <span :class="classMap[type]" class="icon"></span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    type: {
      type: Number
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style lang="less">
@import '../../common/less/mixin';

.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  vertical-align: top;
  margin-right: 6px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  &.decrease {
    .bg-image('decrease_2', 'header');
  }
  &.discount {
    .bg-image('discount_2', 'header');
  }
  &.guarantee {
    .bg-image('guarantee_2', 'header');
  }
  &.invoice {
    .bg-image('invoice_2', 'header');
  }
  &.special {
    .bg-image('special_2', 'header');
  }
}
</style>

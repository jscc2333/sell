<template>
  <span :class="[classMap[type]+size,'size'+size]" class="icon">
  </span>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    type: {
      type: Number
    },
    size: {
      type: Number
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    console.log(this.size);
  }
};
</script>

<style lang="less">
@import '../../common/less/mixin';

.icon {
  display: inline-block;
  vertical-align: top;
  background-repeat: no-repeat;
  &.size1 {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    &.decrease1 {
      .bg-image('decrease_1', 'icon');
    }
    &.discount1 {
      .bg-image('discount_1', 'icon');
    }
    &.guarantee1 {
      .bg-image('guarantee_1', 'icon');
    }
    &.invoice1 {
      .bg-image('invoice_1', 'icon');
    }
    &.special1 {
      .bg-image('special_1', 'icon');
    }
  }
  &.size2 {
    width: 16px;
    height: 16px;
    margin-right: 6px;
    background-size: 16px 16px;
    &.decrease2 {
      .bg-image('decrease_2', 'icon');
    }
    &.discount2 {
      .bg-image('discount_2', 'icon');
    }
    &.guarantee2 {
      .bg-image('guarantee_2', 'icon');
    }
    &.invoice2 {
      .bg-image('invoice_2', 'icon');
    }
    &.special2 {
      .bg-image('special_2', 'icon');
    }
  }
  &.size3 {
    width: 12px;
    height: 12px;
    margin-right: 4px;
    background-size: 12px 12px;
    &.decrease3 {
      .bg-image('decrease_3', 'icon');
    }
    &.discount3 {
      .bg-image('discount_3', 'icon');
    }
    &.guarantee3 {
      .bg-image('guarantee_3', 'icon');
    }
    &.invoice3 {
      .bg-image('invoice_3', 'icon');
    }
    &.special3 {
      .bg-image('special_3', 'icon');
    }
  }
}
</style>

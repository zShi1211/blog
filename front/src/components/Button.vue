<template>
  <button @click="onClick">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style scoped lang='scss'>
@import "@/assets/css/common.scss";
button {
  background: transparent;
  border: none;
  outline: none;
  text-align: center;
  padding: 7px 10px;
  border-radius: 5px;
  font-weight: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;
  @include click();
}
</style>
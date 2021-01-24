<template>
  <div class="tooltip">
    <div class="tooltipText">
      <slot name="tooltipText" />
    </div>
    <div class="tooltipMessage">
      <slot name="tooltipMessage" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.tooltip {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
  .tooltipText {
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  &:hover .tooltipMessage {
    opacity: 1;
    visibility: visible;
  }
  .tooltipMessage {
    position: absolute;
    top: calc(-100% - 10px);
    background: #fff;
    padding: 6px 10px;
    border-radius: 5px;
    left: 50%;
    transform: translateX(-50%);
    visibility: hidden;
    opacity: 0;
    transition: all 0.5s;
    &::before {
      content: "";
      border: 5px solid transparent;
      border-top-color: #fff;
      left: 50%;
      bottom: 0;
      position: absolute;
      transform: translate(-50%, 9px);
    }
  }
}
</style>
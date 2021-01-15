<template>
  <div class="section">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style scoped >
.section {
  width: 960px;
  margin: 0 auto;
  box-sizing: border-box;
}

@media (max-width: 992px) {
  .section {
    width: 720px;
  }
}

@media (max-width: 768px) {
  .section {
    width: 540px;
  }
}
@media (max-width: 576px) {
  .section {
    width: 100%;
    padding: 0 15px;
  }
}
</style>
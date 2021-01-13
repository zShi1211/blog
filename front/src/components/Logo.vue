<template>
  <Button>
    <router-link tag="h1" to="/">SHIISME</router-link>
  </Button>
</template>

<script>
import Button from "@/components/Button";
export default {
  components: {
    Button,
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/css/common.scss";
h1 {
  font-weight: bold;
  font-size: 22px;
  cursor: pointer;
  border-radius: 4px;
  user-select: none;
}
</style>
<template>
  <div class="wrapper">
    <div class="sun"></div>
    <div class="moon">
      <svg>
        <polygon id="star" points="0 -10 2 -2 10 0 2 2 0 10 -2 2 -10 0 -2 -2" fill="white"></polygon>
      </svg>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang='scss'>
.wrapper {
  //   background: linear-gradient(
  //     180deg,
  //     rgba(102, 204, 255, 0.635) 0%,
  //     #fff 40%,
  //     #fff 100%
  //   );
  background: rgb(245, 135, 135);
  width: 100vw;
  height: 100vh;
  position: relative;
}

.sun {
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  left: 200px;
  top: 200px;
  box-shadow: inset 0 0 10px 5px yellow, inset 0 0 15px 5px yellow,
    inset 0 0 20px 5px yellow, inset 0 0 70px 5px yellow, 0 0 10px 10px yellow,
    0 0 20px 15px yellow, 0 0 30px 20px yellow, 0 0 50px 30px yellow,
    0 0 80px 10px yellow, 0 0 110px 10px yellow, 0 0 150px 10px yellow,
    0 0 200px 10px yellow, 0 0 300px 10px yellow, 0 0 400px 10px yellow,
    0 0 500px 10px yellow;
}

.moon {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 200px;
  top: 200px;
}
</style>
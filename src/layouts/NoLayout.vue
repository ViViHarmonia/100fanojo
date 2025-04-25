<template>
  <q-layout view="lHh Lpr lFf">

    <div class="center">

    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {

}
</script>
<style lang="">
.body {
  background-color: #fdf2ea;
  background-image: url("/bg/ph.png"), url("/bg/ph.png");
  background-size: 75px;
  background-repeat: repeat, repeat;
  background-position-x: center, 23px;
  background-position-y: center, 70px;

}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

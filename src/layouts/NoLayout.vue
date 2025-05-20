<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {

}
</script>
<style lang="scss">
body {
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdf2ea;
  background-image: url("/bg/ph.png");
  background-size: 75px;
  background-repeat: repeat, repeat;
  background-position-x: center;
  background-position-y: center;

}
</style>

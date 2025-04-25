<template>
  <div>
    {{ characterchosen.name }}
  </div>
</template>
<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import { sections } from 'src/composables/groups'
import { girlfriends } from 'src/composables/girlfriends'
import { galeria } from 'src/composables/gallery'
import { otherArtists } from 'src/composables/groups'
import { useRoute } from "vue-router";

const route = useRoute()

const characterchosen = ref({})

watch(
  () => route.params.characterid,
  (newId, oldId) => {
    data()
  }
)

function data() {
  var charcode = route.params.characterid
  console.log(charcode)
  for (let gorl of girlfriends) {
    if (gorl.char == charcode) {
      characterchosen.value = gorl
    }
  }
}
onMounted(() => {
  data()
});

</script>
<style lang="">

</style>

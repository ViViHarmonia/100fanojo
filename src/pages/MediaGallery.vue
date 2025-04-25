<template>
  <div>
    {{ categorychosen.label }}
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

const categorychosen = ref({})

watch(
  () => route.params.category,
  (newId, oldId) => {
    data()
  }
)

function data() {
  var tagcode = route.params.category
  console.log(tagcode)
  for (let sect of sections) {
    if (sect.tag == tagcode) {
      categorychosen.value = sect
    }
  }
}
onMounted(() => {
  data()
});

</script>
<style lang="">

</style>

<template>
  <div class="center">
    <div class="row q-pa-xs items-center align-center justify-center" v-if="subcategories.length > 1">
      <div class="col-xs-auto q-pa-xs" v-for="subcat in subcategories">
        <q-btn color="pink-4" @click="subcatChoice(subcat.subtag)">{{
          subcat.label }}</q-btn>
      </div>

    </div>
    <div v-if="subcategories.length > 0 && subcategory == ''">
      <div v-for="sub in subcategories">
        <div class="col-xs-12">
          <div class="row items-center align-center justify-center text-h5 q-py-md"
            style="background-color: #ff86a8aa;">{{ sub.label }}</div>
          <div class="row q-pa-xs items-center align-center justify-center">
            <div v-for="image in filteredGallery">
              <div class="col-auto image q-pa-xs" v-if="image.subsct == sub.subtag">
                <img :src="image.url" style="max-height: 200px;">
                <div class="caption" v-if="image.label != ''"><span>{{ image.label }}</span></div>
                <q-btn class="open" dense round icon="fullscreen" size="sm" ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row q-pa-xs items align-center justify-center">
        <div v-for="image in filteredGallery">
          <div class="col-auto image q-pa-xs" v-if="image.subsct == subcategory">
            <img :src="image.url" style="max-height: 200px;">
            <div class="caption" v-if="image.label != ''"><span>{{ image.label
            }}</span></div>
            <q-btn class="open" dense round icon="fullscreen" size="sm"></q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
  <q-dialog v-model="fullscreenImageDialog">
    <q-card class="bigimage">
      <div>
        <q-img :src="fullscreenImageUrl" style="width: 600px; max-height: 100%; height:fit-content" fit="contain" />
        <q-btn @click="fullscreenImageUrl = ''; fullscreenImageDialog = false" icon="close"></q-btn>
      </div>

    </q-card>

  </q-dialog>
</template>
<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import { sections, subAnimeArts, otherArtists, birthdayStuffs, chibiTypes, dateVersions, merchCollabEvents, promoArts, gameEvents } from 'src/composables/groups'
import { galeria } from 'src/composables/gallery'
import { useRoute } from "vue-router";

const route = useRoute()

const fullscreenImageUrl = ref("")
const fullscreenImageDialog = ref(false)
const categorychosen = ref({})
const subcategories = ref([])

const subcategory = ref("")
const filteredGallery = ref([])
watch(
  () => route.params.category,
  (newId, oldId) => {
    data()
  }
)
function openImage(url) {
  fullscreenImageUrl.value = url;
  fullscreenImageDialog.value = true
}
async function data() {
  var tagcode = route.params.category
  for (let sect of sections) {
    if (sect.tag == tagcode) {
      categorychosen.value = sect
    }
  }
  subsectionSwitch()
  filterGallery()
}
function subcatChoice(subtag) {
  if (subcategory.value == '' || subcategory.value != subtag) {
    subcategory.value = subtag
  } else {
    subcategory.value = ''
  }
  console.log(subcategory.value)
}
function subsectionSwitch() {
  subcategories.value = []
  subcategory.value = ''
  switch (categorychosen.value.tag) {
    case "anime":
      subcategories.value = subAnimeArts
      break
    case "other":
      subcategories.value = otherArtists
      break
    case "bday":
      subcategories.value = birthdayStuffs
      break
    case "chibi":
      subcategories.value = chibiTypes
      break
    case "date":
      subcategories.value = dateVersions
      break
    case "colab":
      subcategories.value = merchCollabEvents
      break
    case "promo":
      subcategories.value = promoArts
      break
    case "game":
      subcategories.value = gameEvents
      break
  }
  if (subcategories.value.length == 0) {
    subcategory.value = "NONE"
  }

}
function filterGallery() {
  filteredGallery.value = []
  for (var i = 0; i < galeria.length; i++) {
    if (galeria[i].sect == categorychosen.value.tag) {
      filteredGallery.value.push(galeria[i])
    }
  }
}
onMounted(() => {
  data()
});

</script>
<style lang="scss">
.image {
  position: relative;
}

img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.caption {
  background-color: #00000055;
  color: white;
  width: 100%;
  left: 50%;
  opacity: 0;
  position: absolute;
  bottom: -20px;
  transform: translate(-50%, -50%);
  transition: opacity 0.6s;
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  padding: 20px 0px 20px 0px;

}

.open {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 16px;
  top: 16px;
  opacity: 0;
  background-color: #ff5683;
  color: white;
}


.image:hover .caption {
  opacity: 1;
}

.image:hover .open {
  opacity: 1;
}
</style>

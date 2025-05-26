<template>
  <div class="centerGallery">
    <div v-if="subcategories.length > 1">
      <div class="row q-pa-xs items-center align-center justify-center" v-if="$q.screen.gt.sm">
        <div v-for="subcat in subcategories">
          <div class="col-xs-auto q-pa-xs" v-if="subcat.subtag != 'NONE'">
            <q-btn :color="subcategory.subtag == subcat.subtag ? 'white' : 'pink-4'"
              :text-color="subcategory.subtag == subcat.subtag ? 'pink-4' : 'white'"
              @click="subcatChoice(subcat.subtag)">{{
                subcat.label }}</q-btn>
          </div>
        </div>

      </div>
      <div class="row q-pa-xs align-center justify-center" v-else style="width: 100%;">
        <div class="col-xs-12 q-pa-xs">
          <q-select bg-color="pink-4" color="white" dark filled v-model="subcategory" :options="subcategories"
            option-label="label" dense option-value="subtag" @update:model-value="filterGallery()"
            style="width: 100%;"></q-select>
        </div>
      </div>
    </div>

    <div class="row items-center align-center justify-center h6 q-pa-sm" v-if="categorychosen.desc != ''">{{
      categorychosen.desc }}</div>
    <div id="rowIfsubsectionsAndUnchosen" v-if="subcategories.length > 0 && subcategory.subtag == 'NONE'"
      class="row q-pa-xs items-center align-center justify-center"
      style="flex-direction: column !important; flex-wrap: nowrap !important ;width: 100%;">
      <div v-for="sub in subcategories" style="width: 100%;">
        <div class="col-xs-12" v-if="sub.subtag != 'NONE'">
          <div class="row items-center align-center justify-center text-h5 q-py-md"
            style="background-color: #ff86a8aa;">{{ sub.label }}</div>
          <div class="row items-center align-center justify-center text-body1 q-pa-sm" v-if="sub.desc != ''"
            style="background-color: #ff86a8cc;">{{ sub.desc
            }}</div>
          <div class="row q-pa-xs items-center align-center justify-center">
            <div v-for="image in filteredGallery">
              <div class="col-auto image q-pa-xs" v-if="image.subsct == sub.subtag">
                <img :src="image.url" style="max-height: 200px;">
                <div class="caption" v-if="image.label != ''"><span>{{ image.label }}</span></div>
                <q-btn class="open" dense round icon="fullscreen" size="sm" @click="openImage(image)"></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="rowIfsubsectionsAndChosen" v-else-if="subcategories.length > 0 && subcategory.subtag != 'NONE'"
      class="row q-pa-xs items-center align-center justify-center"
      style="flex-direction: column !important; flex-wrap: nowrap !important ;width: 100%;">
      <div class="row items-center align-center justify-center text-body1 q-pa-sm" v-if="subcategory.desc != ''"
        style="background-color: #ff86a8cc;">{{ subcategory.desc }}</div>
      <div class="row q-pa-xs items-center align-center justify-center">
        <div v-for="image in filteredGallery">
          <div class="col-auto image q-pa-xs">
            <img :src="image.url" style="max-height: 200px;">
            <div class="caption" v-if="image.label != ''"><span>{{ image.label
                }}</span></div>
            <q-btn class="open" dense round icon="fullscreen" size="sm" @click="openImage(image)"></q-btn>
          </div>
        </div>
      </div>
    </div>
    <div id="rowIfNoSubsections" class="row q-pa-xs items-center align-center justify-center" v-else
      style="width: 100%;">
      <div v-for="image in filteredGallery">
        <div class="col-auto image q-pa-xs">
          <img :src="image.url" style="max-height: 200px;">
          <div class="caption" v-if="image.label != ''"><span>{{ image.label }}</span></div>
          <q-btn class="open" dense round icon="fullscreen" size="sm" @click="openImage(image)"></q-btn>
        </div>
      </div>

    </div>
  </div>
  <q-dialog v-model="fullscreenImageDialog" maximized @keyup.left="imageMove(2)" @keyup.right="imageMove(1)"
    @keyup.x="fullscreenImageDialog = false">
    <q-carousel control-color="pink-4" animated swipeable fullscreen v-model="slide" infinite>
      <q-carousel-slide v-for="(img, v) in filteredGallery" :name="v" :key="v">
        <div class="fit" style="width: 100%; display: flex; align-items: center; justify-content: center;">
          <q-img :src="img.url" style="max-height: 100%" fit="contain" />
        </div>
      </q-carousel-slide>
      <template v-slot:control>
        <q-carousel-control position="top-right" :offset="[16, 16]" class="text-white rounded-borders"
          v-if="filteredGallery[slide].label != ''"
          style="background: rgba(0, 0, 0, .3); padding: 4px 8px; opacity: .8;">
          <div>{{ filteredGallery[slide].label }}</div>
        </q-carousel-control>
        <q-carousel-control position="top-left" :offset="[16, 16]" style="padding: 4px 8px;">
          <q-btn color="pink-4" @click="fullscreenImageDialog = false" icon="close" padding="xs"
            style="opacity: .6;"></q-btn>
        </q-carousel-control>
        <q-carousel-control position="bottom-left" :offset="[16, 16]" style="padding: 4px 8px;">
          <q-btn color="pink-4" @click="imageMove(2)" icon="arrow_back" round style="opacity: .6;"></q-btn>
        </q-carousel-control>
        <q-carousel-control position="bottom-right" :offset="[16, 16]" style="padding: 4px 8px;">
          <q-btn color="pink-4" @click="imageMove(1)" icon="arrow_forward" round style="opacity: .6;"></q-btn>
        </q-carousel-control>
      </template>
    </q-carousel>

  </q-dialog>

</template>
<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import { sections, subAnimeArts, otherArtists, birthdayStuffs, chibiTypes, dateVersions, merchCollabEvents, promoArts, gameEvents, sheetKinds } from 'src/composables/groups'
import { galeria } from 'src/composables/gallery'
import { useRoute } from "vue-router";
import { useQuasar } from 'quasar'

const route = useRoute()

const fullscreenImageDialog = ref(false)
const categorychosen = ref({})
const subcategories = ref([])

const subcategory = ref({ label: "ALL", subtag: "NONE" })
const filteredGallery = ref([])
const subfilteredGallery = ref([])
const slide = ref(0)
const $q = useQuasar()
watch(
  () => route.params.category,
  (newId, oldId) => {
    data()
  }
)

function openImage(image) {
  for (var i = 0; i < filteredGallery.value.length; i++) {
    if (filteredGallery.value[i].url == image.url) {
      slide.value = i
    }
  }
  fullscreenImageDialog.value = true
}
function imageMove(direction) {
  var tempGallery = filteredGallery.value

  switch (direction) {
    case 1:
      if (slide.value + 1 > tempGallery.length - 1) {
        slide.value = 0
      } else {
        slide.value++
      }
      break
    case 2:
      if (slide.value - 1 < 0) {
        slide.value = tempGallery.length - 1
      } else {
        slide.value--
      } break
  }
}
async function data() {
  var tagcode = route.params.category
  for (let sect of sections) {
    if (sect.tag == tagcode) {
      categorychosen.value = sect
    }
  }
  subsectionSwitch()
}
function subcatChoice(subtag) {
  subfilteredGallery.value = []
  if (subcategory.subtag == 'NONE' || subcategory.value.subtag != subtag) {
    for (var i = 0; i < subcategories.value.length; i++) {
      if (subcategories.value[i].subtag == subtag) {
        subcategory.value = subcategories.value[i]
      }
    }

  } else {
    subcategory.value = { label: "ALL", subtag: "NONE" }
  }
  filterGallery()
}
function subsectionSwitch() {
  subcategories.value = []
  subcategory.value = { label: "ALL", subtag: "NONE" }
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
    case "sheet":
      subcategories.value = sheetKinds
      break
  }
  if (subcategories.value.length == 0) {
    subcategory.value = { label: "ALL", subtag: "NONE" }
  } else {
    subcategories.value.splice(0, 0, { label: "ALL", subtag: "NONE" })
  }
  filterGallery()

}
function filterGallery() {
  filteredGallery.value = []
  let tempGallery = []
  for (var i = 0; i < galeria.length; i++) {
    if (galeria[i].sect == categorychosen.value.tag) {
      tempGallery.push(galeria[i])
    }
  }
  if (subcategories.value.length > 0 && subcategory.value.subtag != 'NONE') {
    for (var i = 0; i < tempGallery.length; i++) {
      if (tempGallery[i].subsct == subcategory.value.subtag) {
        filteredGallery.value.push(tempGallery[i])
      }
    }
    console.log("entro al if")
  } else if (subcategories.value.length > 0 && subcategory.value.subtag == 'NONE') {
    for (var i = 0; i < subcategories.value.length; i++) {
      for (var j = 0; j < tempGallery.length; j++) {
        if (subcategories.value[i].subtag == tempGallery[j].subsct) {
          filteredGallery.value.push(tempGallery[j])
        }
      }
    }
    console.log("entro al else if")
  } else {
    filteredGallery.value = tempGallery
    console.log("entro al else")
  }
}
onMounted(() => {
  data()

  $q.screen.setSizes({ sm: 400, md: 500, lg: 1000, xl: 2000 })
});

</script>
<style lang="scss" scoped>
.image {
  position: relative;
}

img {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.centerGallery {
  display: flex;
  justify-items: center;
  justify-content: start;
  align-items: center;
  height: 100vh;
  width: 100%;
  flex-direction: column;
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
  text-align: center;

}


.open {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 16px;
  top: 16px;
  opacity: 0;
  background-color: #ff5683aa;
  color: white;
}

.q-carousel {
  background-color: #00000000 !important;
}

.q-carousel__slide {
  padding: 0px !important;
}

.image:hover .caption {
  opacity: 1;
}

.image:hover .open {
  opacity: 1;
}
</style>

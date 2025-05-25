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
    <div style="width: 100%; display: flex; align-items: center; justify-content: center; position: relative;">
      <q-img :src="fullscreenImage.url" style="width: 100%; max-height: 100%; object-fit: cover" fit="contain" />
      <div class="captionFull" v-if="fullscreenImage.label != ''">{{ fullscreenImage.label }}</div>
      <q-btn @click="fullscreenImage = {}; fullscreenImageDialog = false" icon="close" class="close"
        padding="none"></q-btn>
      <q-btn @click="imageMove(2)" icon="arrow_back" class="prev" round></q-btn>
      <q-btn @click="imageMove(1)" icon="arrow_forward" class="next" round></q-btn>
    </div>
  </q-dialog>

</template>
<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import { sections, subAnimeArts, otherArtists, birthdayStuffs, chibiTypes, dateVersions, merchCollabEvents, promoArts, gameEvents, sheetKinds } from 'src/composables/groups'
import { galeria } from 'src/composables/gallery'
import { useRoute } from "vue-router";
import { useQuasar } from 'quasar'

const route = useRoute()

const fullscreenImage = ref("")
const fullscreenImageDialog = ref(false)
const categorychosen = ref({})
const subcategories = ref([])

const subcategory = ref({ label: "ALL", subtag: "NONE" })
const filteredGallery = ref([])
const subfilteredGallery = ref([])
const slide = ref(1)
const $q = useQuasar()
watch(
  () => route.params.category,
  (newId, oldId) => {
    data()
  }
)
function openImage(image) {
  fullscreenImage.value = image;
  fullscreenImageDialog.value = true
}
function imageMove(direction) {
  var tempSpace
  var tempGallery = filteredGallery.value

  for (var i = 0; i < tempGallery.length; i++) {
    if (tempGallery[i].url == fullscreenImage.value.url) {
      tempSpace = i
    }
  }
  switch (direction) {
    case 1:
      if (tempSpace + 1 > tempGallery.length - 1) {
        fullscreenImage.value = tempGallery[0]
      } else {
        fullscreenImage.value = tempGallery[tempSpace + 1]
      }
      break
    case 2:
      if (tempSpace - 1 < 0) {
        fullscreenImage.value = tempGallery[tempGallery.length - 1]
      } else {
        fullscreenImage.value = tempGallery[tempSpace - 1]
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

.captionFull {
  color: white;
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 8px 4px 8px 4px;
  background-color: #000000a9;
}

.close {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: #ff5683aa;
  color: white;
}

.prev {
  position: absolute;
  left: 12px;
  bottom: 2px;
  background-color: #ff5683aa;
  color: white;
}

.next {
  position: absolute;
  right: 12px;
  bottom: 2px;
  background-color: #ff5683aa;
  color: white;
}


.image:hover .caption {
  opacity: 1;
}

.image:hover .open {
  opacity: 1;
}
</style>

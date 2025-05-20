<template>
  <div class="center">
    <div class="row q-pa-xs items-center align-center justify-center" v-if="subcategories.length > 1">
      <div class="col-xs-auto q-pa-xs" v-for="subcat in subcategories">
        <q-btn :color="subcategory.subtag == subcat.subtag ? 'white' : 'pink-4'"
          :text-color="subcategory.subtag == subcat.subtag ? 'pink-4' : 'white'" @click="subcatChoice(subcat.subtag)">{{
            subcat.label }}</q-btn>
      </div>
    </div>
    <div class="row items-center align-center justify-center h6 q-pa-sm" v-if="categorychosen.desc != ''">{{
      categorychosen.desc }}</div>
    <div v-if="subcategories.length > 0 && Object.keys(subcategory).length === 0">
      <div v-for="sub in subcategories">
        <div class="col-xs-12">
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
    <div v-else-if="subcategories.length > 0 && Object.keys(subcategory).length > 0">
      <div class="row items-center align-center justify-center text-body1 q-pa-sm" v-if="subcategory.desc != ''"
        style="background-color: #ff86a8cc;">{{ subcategory.desc }}</div>
      <div class="row q-pa-xs items align-center justify-center">
        <div v-for="image in subfilteredGallery">
          <div class="col-auto image q-pa-xs">
            <img :src="image.url" style="max-height: 200px;">
            <div class="caption" v-if="image.label != ''"><span>{{ image.label
            }}</span></div>
            <q-btn class="open" dense round icon="fullscreen" size="sm" @click="openImage(image)"></q-btn>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row q-pa-xs items align-center justify-center">
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
  </div>
  <q-dialog v-model="fullscreenImageDialog" maximized @keyup.left="imageMove(2)" @keyup.right="imageMove(1)"
    @keyup.x="fullscreenImageDialog = false">
    <div style="width: 100%; display: flex; align-items: center; justify-content: center; position: relative;">
      <q-img :src="fullscreenImage.url" style="width: 100%; max-height: 100%; object-fit: cover" fit="contain" />
      <div class="captionFull">{{ fullscreenImage.label }}</div>
      <q-btn @click="fullscreenImage = {}; fullscreenImageDialog = false" icon="close" class="close"
        padding="none"></q-btn>
      <q-btn @click="imageMove(2)" icon="arrow_back" class="prev" round></q-btn>
      <q-btn @click="imageMove(1)" icon="arrow_forward" class="next" round></q-btn>
    </div>



  </q-dialog>
</template>
<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import { sections, subAnimeArts, otherArtists, birthdayStuffs, chibiTypes, dateVersions, merchCollabEvents, promoArts, gameEvents } from 'src/composables/groups'
import { galeria } from 'src/composables/gallery'
import { useRoute } from "vue-router";

const route = useRoute()

const fullscreenImage = ref("")
const fullscreenImageDialog = ref(false)
const categorychosen = ref({})
const subcategories = ref([])

const subcategory = ref({})
const filteredGallery = ref([])
const subfilteredGallery = ref([])
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
  var tempGallery
  if (subfilteredGallery.value.length > 0) {
    tempGallery = subfilteredGallery.value
  } else {
    tempGallery = filteredGallery.value
  }
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
  filterGallery()
}
function subcatChoice(subtag) {
  subfilteredGallery.value = []
  if (Object.keys(subcategory.value).length === 0 || subcategory.value.subtag != subtag) {
    for (var i = 0; i < subcategories.value.length; i++) {
      console.log("ENTRO AL FOR " + subcategories.value[i].subtag)
      if (subcategories.value[i].subtag == subtag) {
        subcategory.value = subcategories.value[i]
      }
    }
    console.log(subcategory.value)
    for (var i = 0; i < filteredGallery.value.length; i++) {
      if (filteredGallery.value[i].subsct == subcategory.value.subtag) {
        subfilteredGallery.value.push(filteredGallery.value[i])
      }
    }
  } else {
    subcategory.value = {}
    subfilteredGallery.value = []
  }
}
function subsectionSwitch() {
  subcategories.value = []
  subcategory.value = {}
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
    subcategory.value.subtag = "NONE"
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
  transform: translate(-50%, -50%);
  left: 16px;
  top: 16px;
  background-color: #ff5683;
  color: white;
}

.prev {
  position: absolute;
  left: 12px;
  bottom: 2px;
  background-color: #ff5683;
  color: white;
}

.next {
  position: absolute;
  right: 12px;
  bottom: 2px;
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

<template>
  <div class="centerGallery">
    <div v-if="filteredSections.length > 1">
      <div class="row q-pa-xs items-center align-center justify-center" v-if="$q.screen.gt.sm">
        <div v-for="cat in filteredSections">
          <div class="col-xs-auto q-pa-xs" v-if="cat.tag != 'NONE'">
            <q-btn :color="categorychosen.tag == cat.tag ? 'white' : 'pink-4'"
              :text-color="categorychosen.tag == cat.tag ? 'pink-4' : 'white'" @click="catChoice(cat.tag)">{{
                cat.label }}</q-btn>
          </div>
        </div>

      </div>
      <div class="row q-pa-xs align-center justify-center" v-else style="width: 100%;">
        <div class="col-xs-12 q-pa-xs">
          <q-select bg-color="pink-4" color="white" dark filled v-model="categorychosen" :options="filteredSections"
            option-label="label" option-value="tag" @update:model-value="filterGallery()" style="width: 100%;"
            dense></q-select>
        </div>
      </div>
    </div>

    <div v-if="filteredSections.length > 0 && categorychosen.tag == 'NONE'" id="rowIfsubsectionsAndUnchosen"
      class="row q-pa-xs items-center align-center justify-center"
      style="flex-direction: column !important; flex-wrap: nowrap !important ; width: 100%;">
      <div v-for="sect in filteredSections" style="width: 100%;">
        <div class="col-xs-12" v-if="sect.tag != 'NONE'">
          <div class="row items-center align-center justify-center text-h5 q-py-md"
            style="background-color: #ff86a8aa;">{{ sect.label }}</div>
          <div class="row items-center align-center justify-center text-body1 q-pa-sm" v-if="sect.desc != ''"
            style="background-color: #ff86a8cc;">{{ sect.desc
            }}</div>
          <div class="row q-pa-xs items-center align-center justify-center">
            <div v-for="image in filteredGallery">
              <div class="col-auto image q-pa-xs" v-if="image.sect == sect.tag">
                <img :src="image.url" style="max-height: 200px;">
                <div class="caption" v-if="image.label != ''"><span>{{ image.label }}</span></div>
                <q-btn class="open" dense round icon="fullscreen" size="sm" @click="openImage(image)"></q-btn>
                <div v-if="image.subsct != 'NONE'" class="undercap"><span>{{ returnSubSectName(image.sect,
                  image.subsct) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="filteredSections.length > 0 && categorychosen.tag != 'NONE'" id="rowIfsubsectionsAndChosen"
      class="row q-pa-xs items-center align-center justify-center"
      style="flex-direction: column !important; flex-wrap: nowrap !important ;width: 100%;">
      <div class="row items-center align-center justify-center text-body1 q-pa-sm" v-if="categorychosen.desc != ''"
        style="background-color: #ff86a8cc;">{{ categorychosen.desc }}
      </div>
      <div class="row q-pa-xs align-center justify-center">
        <div v-for="image in filteredGallery">
          <div class="col-auto image q-pa-xs">
            <img :src="image.url" style="max-height: 200px;">
            <div class="caption" v-if="image.label != ''"><span>{{ image.label
            }}</span></div>
            <q-btn class="open" dense round icon="fullscreen" size="sm" @click="openImage(image)"></q-btn>
            <div v-if="image.subsct != 'NONE'" class="undercap"><span>{{ returnSubSectName(image.sect,
              image.subsct) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else id="rowIfNoSubsections" class="row q-pa-xs items-center align-center justify-center">
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
import { sections } from 'src/composables/groups'
import { subAnimeArts, otherArtists, birthdayStuffs, chibiTypes, dateVersions, merchCollabEvents, promoArts, gameEvents, sheetKinds } from 'src/composables/groups'
import { girlfriends } from 'src/composables/girlfriends'
import { galeria } from 'src/composables/gallery'
import { useRoute } from "vue-router";
import { useQuasar } from 'quasar'

const route = useRoute()

const fullscreenImage = ref("")
const fullscreenImageDialog = ref(false)
const categorychosen = ref({ label: "ALL", tag: "NONE" })
const filteredGallery = ref([])
const filteredSections = ref([])

const characterchosen = ref({})
const $q = useQuasar()

watch(
  () => route.params.characterid,
  (newId, oldId) => {
    data()
  }
)
function returnSubSectName(section, subtag) {
  var subcategories
  switch (section) {
    case "anime":
      subcategories = subAnimeArts
      break
    case "other":
      subcategories = otherArtists
      break
    case "bday":
      subcategories = birthdayStuffs
      break
    case "chibi":
      subcategories = chibiTypes
      break
    case "date":
      subcategories = dateVersions
      break
    case "colab":
      subcategories = merchCollabEvents
      break
    case "promo":
      subcategories = promoArts
      break
    case "game":
      subcategories = gameEvents
      break
    case "sheet":
      subcategories = sheetKinds
      break
  }
  for (let subcat of subcategories) {
    if (subcat.subtag == subtag) {
      return subcat.label
    }
  }
}
function catChoice(tag) {
  filteredGallery.value = []
  if (categorychosen.value.tag == 'NONE' || categorychosen.value.tag != tag) {
    for (var i = 0; i < filteredSections.value.length; i++) {
      if (filteredSections.value[i].tag == tag) {
        categorychosen.value = filteredSections.value[i]
      }
    }
  } else {
    categorychosen.value = { label: "ALL", tag: "NONE" }
  }
  filterGallery()
}
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
  categorychosen.value = {}
  var charcode = route.params.characterid
  for (let gorl of girlfriends) {
    if (gorl.char == charcode) {
      characterchosen.value = gorl
    }
  }
  categorychosen.value = { label: "ALL", tag: "NONE" }
  filterGallery()
  sectionFilter()
}
function filterGallery() {
  filteredGallery.value = []
  let tempGallery = []
  for (var i = 0; i < galeria.length; i++) {
    for (var j = 0; j < galeria[i].chars.length; j++) {
      if (galeria[i].chars[j] == characterchosen.value.char) {
        tempGallery.push(galeria[i])
      }
    }
  }
  console.log(tempGallery)
  console.log(categorychosen.value)
  if (sections.length > 0 && categorychosen.value.tag != 'NONE') {
    for (var i = 0; i < tempGallery.length; i++) {
      if (tempGallery[i].sect == categorychosen.value.tag) {
        filteredGallery.value.push(tempGallery[i])
      }
    }
    console.log("entro al if")
  } else if (sections.length > 0 && categorychosen.value.tag == 'NONE') {
    for (var i = 0; i < sections.length; i++) {
      for (var j = 0; j < tempGallery.length; j++) {
        if (sections[i].tag == tempGallery[j].sect) {
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
function sectionFilter() {
  filteredSections.value = []
  for (let sect of sections) {
    for (let img of filteredGallery.value) {
      if (img.sect == sect.tag) {
        filteredSections.value.push(sect)
        break
      }
    }
  }
  filteredSections.value.splice(0, 0, { label: "ALL", tag: "NONE" })
  console.log(filteredSections.value)
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
  text-align: center;
  padding: 20px 0px 20px 0px;

}

.undercap {
  background-color: #ff86a8;
  position: absolute;
  width: 95%;
  opacity: 0;
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: opacity 0.6s;
  z-index: 9999;
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
  flex-direction: column;
}

.close {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 16px;
  top: 16px;
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

.image:hover .undercap {
  opacity: 1;
}
</style>

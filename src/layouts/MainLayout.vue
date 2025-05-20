<template>
  <q-layout view="lHh Lpr lFf">


    <q-header elevated>
      <q-toolbar class="bg-pink-5 text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title v-if="$q.screen.gt.sm">
          100 Kanojo Art Museum
        </q-toolbar-title>
        <q-space />

        <span>
          {{ header }}
        </span>

      </q-toolbar>
    </q-header>

    <q-drawer class="bg-pink-3 text-white" v-model="leftDrawerOpen" show-if-above bordered>
      <div class="row q-px-md q-pt-md text-subtitle1" v-if="$q.screen.lt.sm">100 Kanojo Art Museum</div>
      <div class="row q-px-md q-pt-md">An attempt to collect all official artwork for 100 Kanojo in one place.
      </div>
      <div class="row q-px-md">Contact: @meidomai on Discord
      </div>
      <div class="row q-px-md">Please message me if you know of art that's missing, if interested in translating a piece
        or if you see a
        translation floating around, or if you have a higher quality version of a piece.
      </div>
      <div class="row q-py-sm justify-center">
        <q-btn-toggle v-model="search" no-caps toggle-color="pink" color="white" text-color="black" :options="[
          { label: 'By Tag', value: 1 },
          { label: 'By Character', value: 2 }
        ]" />
      </div>
      <q-scroll-area style="height: 500px; max-width: 300px;" v-if="search == 1">
        <div class="q-py-xs">
          <div class="row justify-center q-pa-xs" v-for="tag in sections">
            <q-btn style="width: 90%" :color="route.params.category == tag.tag ? 'white' : 'pink-4'"
              :text-color="route.params.category == tag.tag ? 'pink-4' : 'white'" :to="`/media/${tag.tag}`">{{ tag.label
              }}</q-btn>
          </div>
        </div>
      </q-scroll-area>
      <q-scroll-area style="height: 500px; max-width: 300px;" v-if="search == 2">
        <div class="row flex-center q-py-xs">
          <q-btn v-for="(char, c) in girlfriends" square padding="xs" flat :to="`/character/${char.char}`">
            <q-avatar rounded size="60px">
              <div style="display: grid; grid-template-areas: 'image';">
                <div style="width: 100%;grid-area: image;">
                  <img :src="char.url" :title="char.name">
                </div>
                <div style="height: 100%; width: 100%; background-color: #000000aa; grid-area: image;"
                  v-if="route.params.characterid == char.char"></div>
              </div>
            </q-avatar>
          </q-btn>
        </div>
      </q-scroll-area>
      <div class="row q-px-md q-pt-md justify-center ">Credits:
      </div>
      <div class="row q-px-md justify-center ">Kitty - Image Collection, Boss</div>
      <div class="row q-px-md justify-center ">Lilith - Data Gathering</div>
      <div class="row q-px-md justify-center ">ViViHarmonia - Webpage</div>
      <div class="row q-px-md justify-center ">Microphony - Assets</div>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { sections } from 'src/composables/groups'
import { girlfriends } from 'src/composables/girlfriends'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
const route = useRoute()
const search = ref(1)
const header = ref("")

const leftDrawerOpen = ref(false)
const $q = useQuasar()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

watch(
  () => route.params,
  (newId, oldId) => {
    pageChange()
  }
)

function pageChange() {
  console.log(Object.keys(route.params))
  if (Object.keys(route.params)[0] == "category") {
    search.value = 1
    var tagcode = route.params.category
    for (let sect of sections) {
      if (sect.tag == tagcode) {
        header.value = sect.label + " - Media Gallery"
      }
    }
  } else {
    search.value = 2
    var charcode = route.params.characterid
    for (let gorl of girlfriends) {
      if (gorl.char == charcode) {
        header.value = gorl.name + " - Character Gallery"
      }
    }

  }
}
onMounted(() => {
  pageChange()
  $q.screen.setSizes({ sm: 400, md: 500, lg: 1000, xl: 2000 })

});
</script>
<style lang="scss">
body {
  display: flex;
  justify-items: start;
  justify-content: start;
  align-items: start;
  height: 100vh;
  background-color: #fdf2ea;
  background-image: url("/bg/ph.png");
  background-size: 75px;
  background-repeat: repeat, repeat;
  background-position-x: center;
  background-position-y: center;

}
</style>

<template>
  <q-layout view="lHh Lpr lFf">


    <q-header elevated>
      <q-toolbar class="bg-pink-5 text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          100 Kanojo Art Museum
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer class="bg-pink-3 text-white" v-model="leftDrawerOpen" show-if-above bordered>
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
              <img :src="char.url" :title="char.name">
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
    <div class="center">

    </div>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { sections } from 'src/composables/groups'
import { girlfriends } from 'src/composables/girlfriends'
import { useRoute } from 'vue-router'
const route = useRoute()
const search = ref(1)

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<style>
body {
  background-color: #fdf2ea;
  background-image: url("/bg/ph.png");
  background-size: 5rem;
  background-repeat: repeat, repeat;
  background-position-x: center;
  background-position-y: center;

}
</style>

<template>
  <div class="center">
    <div style="width: 75%;">
      <q-card>
        <q-card-section>
          <div class="text-subtitle1 text-center q-px-xs q-pt-xs strokeme">An attempt to collect all official artwork
            for 100
            Kanojo in one place.
          </div>
          <div class="text-subtitle1 text-center q-px-xs strokeme">Contact: @meidomai on Discord
          </div>
          <div class="text-subtitle1 text-center q-px-xs strokeme">Please message me if you know of art that's missing,
            if
            interested in translating a piece or if you see a translation floating around, or if you have a higher
            quality version of a piece.
          </div>
          <q-separator inset color="white" />
          <div class="text-subtitle1 text-center q-px-xs strokeme">Choose by Media or Character
          </div>
          <div class="row justify-center">
            <div class="col-md-2 q-pa-xs justify-center" v-for="tag in sections">
              <q-btn style="width: 100%" size="sm" color="pink-4" :to="`/media/${tag.tag}`">{{ tag.label }}</q-btn>
            </div>
          </div>
          <div class="row justify-center q-py-sm" style="color: white; font-size: 30px;">
            ❤❤❤❤❤
          </div>
          <div class="row justify-center q-pb-sm">
            <q-btn v-for="(char, c) in girlfriends" square padding="xs" flat :to="`/character/${char.char}`">
              <q-avatar rounded size="60px">
                <img :src="char.url" :title="char.name">
              </q-avatar>
            </q-btn>
          </div>
          <q-separator inset color="white" />
          <div class="row q-px-md q-pt-sm justify-center  strokeme">Credits:
          </div>
          <div class="row q-px-md justify-center  strokeme">Kitty - Image Collection, Boss</div>
          <div class="row q-px-md justify-center strokeme ">Lilith - Data Gathering</div>
          <div class="row q-px-md justify-center strokeme ">ViViHarmonia - Webpage</div>
          <div class="row q-px-md justify-center strokeme ">Microphony - Assets</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRef, watch } from "vue";
import { sections } from 'src/composables/groups'
import { girlfriends } from 'src/composables/girlfriends'
import { useRouter } from "vue-router";


</script>
<style lang="scss">
body {
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fdf2ea;
  background-image: url("/bg/ph.png"), url("/bg/ph.png");
  background-size: 75px;
  background-repeat: repeat, repeat;
  background-position-x: center, 23px;
  background-position-y: center, 70px;

}

.q-card {
  background-color: #ff74ae8a;
}

.center {
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
  height: 100vh;

}

.strokeme {
  color: black;
  text-shadow: -1px -1px 4px white, 1px -1px 4px white, -1px 1px 4px white, 1px 1px 4px white;
}
</style>

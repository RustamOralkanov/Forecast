<script setup>
import WeatherSummary from './components/WeatherSummary.vue'
import HighlightsItem from './components/HighlightsItem.vue'
import CoordsItem from './components/CoordsItem.vue'
import HumidityItem from './components/HumidityItem.vue'
import { computed, onMounted, ref } from 'vue'

const city = ref('Almaty')
const weatherInfo = ref(null)

const url = import.meta.env.VITE_API_BASE_URL
const apiKey = import.meta.env.VITE_APP_API_KEY
const isError = computed(() => weatherInfo.value?.cod !== 200)

function getWeather() {
  fetch(`${url}q=${city.value}&appid=${apiKey}&units=metric`)
    .then((response) => response.json())
    .then((data) => {
      weatherInfo.value = data
    })
}

onMounted(() => {
  getWeather()
})
</script>

<template>
  <div class="page">
    <main class="main">
      <div class="container">
        <div class="laptop">
          <div class="sections">
            <section :class="['section', 'section-left', { 'section-error': isError }]">
              <div class="info">
                <div class="city-inner">
                  <input type="text" class="search" v-model="city" @keyup.enter="getWeather" />
                </div>
                <!-- Summary -->
                <WeatherSummary v-if="!isError" :weatherInfo="weatherInfo" />
                <div v-else class="error">
                  <div
                    class="error-title"
                    style="margin-top: 16px; font-size: 32px; font-weight: bold; text-align: center"
                  >
                    Ooooops! Something went wrong
                  </div>
                  <div
                    class="error-message"
                    style="text-transform: capitalize; margin-top: 8px; text-align: center"
                  >
                    {{ weatherInfo?.message }}
                  </div>
                </div>
              </div>
            </section>
            <section class="section section-right">
              <!-- HighlightsItem -->
              <HighlightsItem v-if="!isError" :weatherInfo="weatherInfo" />
            </section>
          </div>
          <div v-if="!isError" class="sections">
            <CoordsItem :coord="weatherInfo.coord" />
            <HumidityItem :humidity="weatherInfo.main.humidity" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="sass">
@import "./assets/styles/main"
.page
  position: relative
  display: flex
  justify-content: center
  align-items: center
  min-height: 100vh
  padding: 20px 0
  background-color: #59585d

.laptop
  width: 100%
  padding: 20px
  background-color: #0e100f
  border-radius: 25px

.sections
  display: flex
  width: 100%

  @media (max-width: 767px)
    flex-direction: column

.section-left
  width: 30%
  padding-right: 10px

  &.section-error
      min-width: 320px
      width: 50px

  @media (max-width: 767px)
    width: 100%
    padding-right: 0


.section-right
  width: 70%
  padding-left: 10px

  @media (max-width: 767px)
    width: 100%
    margin-top: 16px
    padding-left: 0


.city-inner
  position: relative
  display: inline-block
  width: 100%

  &::after
    content: ''
    position: absolute
    top: 0
    right: 10px
    width: 25px
    height: 25px
    background: url('./assets/img/search.svg') no-repeat 50% 50%
    background-size: contain
    transform: translateY(50%)
    cursor: pointer

.info
  height: 100%
  padding: 16px
  background: url('./assets/img/gradient-1.jpg') no-repeat 50% 50%
  background-size: cover
  border-radius: 25px

.search
  width: 100%
  padding: 16px
  font-family: 'Inter', Arial, sans-serif
  color: $white
  background-color: rgba(0, 0, 0, 0.75)
  border-radius: 16px
  border: none
  outline: none
  cursor: pointer

.section-bottom
  width: 50%
  margin-top: 16px

  @media (max-width: 767px)
    width: 100%
</style>

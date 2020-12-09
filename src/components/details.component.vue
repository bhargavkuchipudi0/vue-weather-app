<template>
  <div class="details">
    <div class="heading">
      <p class="section-heading">Details</p>
    </div>
    <div class="details-grid">
      <article class="art">
        <div class="art-img">
          <FeelsLike />
        </div>
        <p class="art-txt">Feels like</p>
        <p class="art-num">{{ currentWeather.feels_like }}<sup>o</sup> F</p>
      </article>
      <article class="art">
        <div class="art-img">
          <Wind />
        </div>
        <p class="art-txt">Wind</p>
        <p class="art-num">{{ currentWeather.wind_speed }} m/h</p>
      </article>
      <article class="art">
        <div class="art-img">
          <Humidity />
        </div>
        <p class="art-txt">Humidity</p>
        <p class="art-num">{{ currentWeather.humidity }}%</p>
      </article>
      <article class="art">
        <div class="art-img">
          <Pressure />
        </div>
        <p class="art-txt">Pressure</p>
        <p class="art-num">{{ currentWeather.pressure }}</p>
      </article>
      <article class="art">
        <div class="art-img">
          <Visibility />
        </div>
        <p class="art-txt">Visibility</p>
        <p class="art-num">{{ currentWeather.visibility }}</p>
      </article>
      <article class="art">
        <div class="art-img">
          <Shield />
        </div>
        <p class="art-txt">UV Index</p>
        <p class="art-num">{{ uvIndex }}</p>
      </article>
    </div>
  </div>
</template>

<script>
import FeelsLike from "../assets/feels-like.svg.vue";
import Humidity from "../assets/humidity.svg.vue";
import Pressure from "../assets/pressure.svg.vue";
import Wind from "../assets/wind.svg.vue";
import Visibility from "../assets/visibility.svg.vue";
import Shield from "../assets/shield.svg.vue";
export default {
  name: "DetailsComponent",
  components: {
    FeelsLike,
    Humidity,
    Pressure,
    Wind,
    Visibility,
    Shield,
  },
  props: {
    currentWeather: Object,
  },
  methods: {},
  computed: {
    uvIndex() {
      let index = this.currentWeather.uvi;
      if (index <= 2) {
        return "LOW";
      } else if (index <= 5) {
        return "MODERATE";
      } else if (index <= 7) {
        return "HIGH";
      } else {
        return "EXTREME";
      }
    },
  },
};
</script>

<style scoped>
.details {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
}
.heading {
  text-align: left;
}
.section-heading {
  position: relative;
}
.section-heading::after {
  position: absolute;
  content: "";
  top: 10px;
  left: 70px;
  width: 140px;
  height: 1px;
  background-color: var(--white);
}
.details-grid {
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-gap: 15px;
  padding-top: 30px;
}
.art {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-color: var(--light-white);
  border-radius: 7px;
}
.art-img {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.art-txt {
  margin: 10px 0;
}
</style>
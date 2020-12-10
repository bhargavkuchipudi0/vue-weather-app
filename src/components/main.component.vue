<template>
  <div class="container">
    <div class="search">
      <input
        class="search-bar"
        type="text"
        placeholder="Search for a place.. Ex: New York"
      />
    </div>
    <div class="main-holder">
      <div class="main-top">
        <div class="top-left">
          <RegionComponent :location-details="locationDetails" :current-weather="current"/>
        </div>
        <div class="top-right">
          <DetailsComponent :current-weather="current"/>
        </div>
      </div>
      <div class="main-bot">
        <div class="bot-left">
          <ForeCastHours :hourly-data="hourly"/>
        </div>
        <div class="bot-right">
          <ForeCastDays :daily-data="daily"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegionComponent from "./region.component.vue";
import DetailsComponent from "./details.component.vue";
import sharedService from "../shared.service";
import ForeCastHours from './forecast-hours.component.vue';
import ForeCastDays from './forecast-days.component.vue';

export default {
  name: "MainComponent",
  components: {
    RegionComponent,
    DetailsComponent,
    ForeCastHours,
    ForeCastDays
  },
  data() {
    return {
      locationDetails: {
        city: "New York",
        region: "NYC",
      },
      location: {
        lat: 0,
        lon: 0
      },
      current: {
        temp: 0,
      },
      daily: [],
      hourly: []
    };
  },
  methods: {
    getCurrentLocation(cb) {
      sharedService.getCurrentLocation().then(
        (response) => {
          this.locationDetails = {
            city: response.city,
            region: response.region,
          };
          const loc = response.loc.split(",");
          this.location.lat = loc[0];
          this.location.lon = loc[1];
          cb();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getWeatherDetails() {
      sharedService.getForeCast(this.location).then(
        (response) => {
          this.current = response.current;
          this.daily = response.daily;
          this.hourly = response.hourly;
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.getCurrentLocation(() => {
      this.getWeatherDetails();
    });
  },
};
</script>

<style scoped>
.search {
  padding-top: 30px;
}
.search-bar {
  width: 250px;
  height: 30px;
  border-radius: 7px;
  border: none;
  padding: 5px 10px;
}
.main-holder {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.main-top,
.main-bot {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.top-left {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0.5;
}
.top-right {
  flex: 0.5;
}
.main-bot {
  margin-top: 30px;
}
.bot-left, .bot-right {
  flex: 1;
}
</style>
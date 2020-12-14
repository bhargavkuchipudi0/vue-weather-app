<template>
    <div class="search">
      <div class="search-cont">
        <input
          class="search-bar"
          type="text"
          placeholder="Search for a place.. Ex: New York"
          v-model="searchInput"
        />
        <button class="search-btn" @click="searchPlace">Go</button>
        <div class="search-results">
          <ul class="result-ul">
            <li
              class="result-li"
              v-for="item in searchResults"
              v-bind:key="item"
              @click="updateLocation(item)"
            >
              <p class="li-place">{{ searchInput }}, {{ item.state }}</p>
              <p class="li-country">{{ item.country }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  <div class="container">
    <div class="main-holder">
      <div class="main-top">
        <div class="top-left">
          <RegionComponent
            :location-details="locationDetails"
            :current-weather="current"
          />
        </div>
        <div class="top-right">
          <DetailsComponent :current-weather="current" />
        </div>
      </div>
      <div class="main-bot">
        <div class="bot-left">
          <ForeCastHours :hourly-data="hourly" :offset-time="timezone_offset"/>
        </div>
        <div class="bot-right">
          <ForeCastDays :daily-data="daily" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RegionComponent from "./region.component.vue";
import DetailsComponent from "./details.component.vue";
import sharedService from "../shared.service";
import ForeCastHours from "./forecast-hours.component.vue";
import ForeCastDays from "./forecast-days.component.vue";

export default {
  name: "MainComponent",
  components: {
    RegionComponent,
    DetailsComponent,
    ForeCastHours,
    ForeCastDays,
  },
  data() {
    return {
      locationDetails: {
        city: '',
        region: '',
        country: ''
      },
      location: {
        lat: 0,
        lon: 0,
      },
      current: {
        clouds: '',
        dew_point: '',
        dt: '',
        feels_like: '',
        humidity: '',
        offsetTime: '',
        pressure: '',
        sunrise: '',
        sunset: '',
        temp: '',
        uvi: '',
        visibility: '',
        timezone_offset:''
      },
      daily: [],
      hourly: [],
      searchInput: "",
      searchResults: [],
      timezone_offset: 0
    };
  },
  methods: {
    getCurrentLocation(cb) {
      sharedService.getCurrentLocation().then(
        (response) => {
          this.locationDetails = {
            city: response.city,
            region: response.region,
            country: response.country,
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
          this.current = {
            ...response.current,
            timezone_offset: response.timezone_offset
          }
          this.timezone_offset = response.timezone_offset;
          this.daily = response.daily;
          this.hourly = response.hourly;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    searchPlace: function () {
      sharedService.getLocationByName(this.searchInput).then(
        (response) => {
          if (response.status === 200) {
            this.searchResults = response.data.results
              .filter((obj) => obj.components._category === "place")
              .map((obj) => {
                return { ...obj.components, ...obj.geometry };
              });
          } else {
            console.log("error");
          }
        },
        (error) => {
          console.log("something wrong with opencagedata api", error);
        }
      );
    },
    updateLocation: function (location) {
      this.location = {lat: location.lat, lon: location.lng};
      this.locationDetails = {
        city: this.searchInput,
        region: location.state,
        country: location.country
      };
      this.getWeatherDetails();
      this.searchInput = "";
      this.searchResults = [];
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: relative;
}
.search-cont {
  position: relative;
}
.search-bar {
  width: 250px;
  height: 30px;
  border: none;
  padding: 0 10px;
  outline: none;
}
.search-btn {
  width: 40px;
  height: 30px;
  border: none;
  cursor: pointer;
  color: var(--white);
  background-color: #eb6e4b;
  outline: none;
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
}
.top-left {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
.top-right {
  flex: 1;
}
.main-bot {
  margin-top: 30px;
}
.bot-left,
.bot-right {
  flex: 1;
}
.search-results {
  position: absolute;
  top: 32px;
  left: 0;
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1;
}
.result-ul {
  list-style-type: none;
  background-color: #ffffff;
}
.result-li {
  width: 100%;
  padding: 5px 10px;
  color: var(--light-black);
  text-align: left;
  box-sizing: border-box;
  border-bottom: 1px solid var(--white);
  cursor: pointer;
}
.li-place, .li-country {
  margin: 3px 0;
}
.li-place {
  font-size: 12px;
  color: var(--black);
}
.li-country {
  font-size: 14px;
}

@media only screen and (max-width: 600px) {
  .main-top,
  .main-bot {
    flex-direction: column;
  }
}
</style>
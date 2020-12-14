<template>
  <div class="region">
    <div class="place-time">
      <h1 class="place">{{locationDetails.city}}, {{locationDetails.region}}</h1>
      <h2 class="country">{{locationDetails.country}}</h2>
      <p class="time">{{getDate(currentWeather.dt, currentWeather.timezone_offset)}}</p>
    </div>
    <div class="cloud-temp">
      <div class="cloud">
        <img :src="img" alt="current weather Image"/>
      </div>
      <div class="temp">
        <p class="temp-big">{{Math.floor(currentWeather.temp)}}<sup>o</sup> F</p>
      </div>
    </div>
    <div class="high-low">
      <p class="high">{{processSunRiseSet(currentWeather.dt, currentWeather.sunrise, currentWeather.sunset, currentWeather.timezone_offset)}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegionComponent",
  props: {
    locationDetails: Object,
    currentWeather: Object
  },
  data() {
    return {
      time: '',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    }
  },
  methods: {
    removeSecondsForomTime: function(timestr) {
      let timearr = timestr.split(' ');
      let time = timearr[0].split(':').slice(0, 2).join(':');
      return time + ' ' + timearr[1];
    },
    getUTCtime: function(time, offset) {
      let date = new Date(time*1000);
      let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
      return new Date(utc + (offset/3600 * 3600000));
    },
    getDate: function(time, offset) {
      let date = this.getUTCtime(time, offset);
      return `${this.days[date.getDay()]}, ${this.removeSecondsForomTime(date.toLocaleTimeString())}`
    },
    processSunRiseSet: function(time, sunrise, sunset, offset) {
      let current = this.getUTCtime(time, offset).getTime();
      let rise = this.getUTCtime(sunrise, offset).getTime();
      let set = this.getUTCtime(sunset, offset).getTime();
      if (current < rise) {
        return `Sunrise - ${this.getDate(sunrise, offset).split(',').slice(1).join('')}`
      } if (current < set) {
        return `Sunset - ${this.getDate(sunset, offset).split(',').slice(1).join('')}`
      } else {
        return '';
      }
    }
  },
  computed: {
    img: function() {
      if (this.currentWeather.weather) {
        return require(`../assets/${this.currentWeather.weather[0].icon}.png`);
      } else {
        return require(`../assets/01d.png`);
      }
    },
    sunRaise: function() {
      return this.getDate(this.currentWeather.sunrise, this.currentWeather.timezone_offset);
    },
    sunSet: function() {
      return this.getDate(this.currentWeather.sunset, this.currentWeather.timezone_offset);
    }
  },
}
</script>

<style scoped>
.region {
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
}
.place,
.time {
  margin: 10px 0;
}
.place {
  text-transform: capitalize;
  font-weight: 400;
}
.time {
  font-size: 17px;
}
.cloud-temp {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.cloud,
.temp {
  display: flex;
  justify-content: center;
  align-items: center;
}
.temp {
  padding: 10px;
}
.cloud img {
  width: 150px;
  height: 150px;
}
.temp-big {
  font-size: var(--font-30);
}
.high, .low {
  margin: 5px 0;
}

@media only screen and (max-width: 600px) {
  .cloud img {
    width: 100px;
    height: 100px;
  }
  .temp-big {
    font-size: 27px;
  }
}
</style>
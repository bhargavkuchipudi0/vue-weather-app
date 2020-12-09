<template>
  <div class="region">
    <div class="place-time">
      <h1 class="place">{{locationDetails.city}}, {{locationDetails.region}}</h1>
      <p class="time">{{date}}</p>
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
      <p class="high">Sun Raise - {{sunRaise}}</p>
      <p class="low">Sun Set - {{sunSet}}</p>
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
      am: true
    }
  },
  methods: {
    getTime(timestamp) {
      let date = new Date(timestamp);
      let hours = date.getHours();
      let shift = hours > 11 ? 'PM' : 'AM';
      let minutes = date.getMinutes();
      if (hours > 12 && hours <= 23) {
        hours -= 12;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`
      }
      return `${hours}:${minutes} ${shift}`
    }
  },
  computed: {
    date: function() {
      let date = new Date();
      return `${this.days[date.getDay()]}, ${this.getTime(Date.now())}`
    },
    img: function() {
      if (this.currentWeather.weather) {
        return require(`../assets/${this.currentWeather.weather[0].icon}.png`);
      } else {
        return require(`../assets/01d.png`);
      }
    },
    sunRaise: function() {
      return this.getTime(this.currentWeather.sunrise*1000);
    },
    sunSet: function() {
      return this.getTime(this.currentWeather.sunset*1000);
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
</style>
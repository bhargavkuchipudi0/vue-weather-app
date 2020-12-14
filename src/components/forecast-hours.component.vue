<template>
    <div class="heading">
      <p class="section-heading">Temperature Forecast</p>
    </div>
    <div class="fh">
        <div class="fh-options">

        </div>
        <div class="fh-graph">
            <AreaChart :chart-data="getChartData(hourlyData)"/>
        </div>
    </div>
</template>

<script>
import AreaChart from './area-chart.component.vue';
export default {
    name: 'ForeCastHours',
    components: {
        AreaChart
    },
    props: {
        hourlyData: Array,
        offsetTime: Number
    },
    data() {
        return {
            chartData: []
        }
    },
    methods: {
        getTime(time, offset) {
            let date = new Date(time*1000);
            let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
            date = new Date(utc + (offset/3600 * 3600000));
            let hour = date.getHours();
            let shift = hour >= 12 && hour <= 23 ? 'pm' : 'am';
            if (hour > 12 && hour <= 23) {
                hour -= 12
            }
            if (hour === 0) hour = 12;
            return `${hour}${shift}` 
        },
        getChartData: function(hourlyData) {
            this.chartData = {
                label:[],
                data:[]
            }
            hourlyData.forEach(data => {
                this.chartData.label.push(this.getTime(data.dt, this.offsetTime));
                this.chartData.data.push(Math.floor(data.temp));
            });
            return this.chartData;
        }
    }
}
</script>

<style scoped>
.heading {
    text-align: left;
    position: relative;
    width: max-content;
}
.heading::after {
    position: absolute;
    content: "";
    top: 10px;
    right: -120px;
    width: 100px;
    height: 1px;
    background-color: #FFFFFF;
}
.fh-graph {
    overflow-x: auto;
}
</style>
<template>
    <div class="heading">
      <p class="section-heading">Temperature Forecast</p>
    </div>
    <div class="fh">
        <div class="fh-options">

        </div>
        <div class="fh-graph">
            <AreaChart :chart-data="chartData"/>
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
        hourlyData: Array
    },
    computed: {
        chartData: function() {
            let chartData = {
                label:[],
                data:[]
            }
            this.hourlyData.forEach(data => {
                chartData.label.push(this.getTime(data.dt));
                chartData.data.push(Math.floor(data.temp));
            });
            return chartData;
        }
    },
    methods: {
        toggleGraphData(type='temp') {
            this.chartData = {
                label:[],
                data:[]
            }
            this.hourlyData.forEach((data) => {
                this.chartData.label.push(this.getTime(data.dt));
                this.chartData.data.push(type === 'temp' ? data.temp : data.cloud);
            })
        },
        getTime(unixTime) {
            let date = new Date(unixTime*1000);
            let hour = date.getHours();
            let shift = hour >= 12 && hour <= 23 ? 'pm' : 'am';
            if (hour > 12 && hour <= 23) {
                hour -= 12
            }
            return `${hour}${shift}` 
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
</style>
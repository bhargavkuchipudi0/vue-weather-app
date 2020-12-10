<template>
    <div class="heading">
        <p class="section-heading">Next 7 Days</p>
    </div>
    <div class="fd-cont">
        <div class="fd-gig-cont">
            <div class="fd-gig" v-for="item in weekdata" v-bind:key="item">
                <p class="gig-day">{{item.day}}</p>
                <p class="cloud-per">{{item.prob}}%</p>
                <img class="gig-img" :src="item.img"/>
                <p class="high">{{Math.floor(item.hTemp)}}<sup>o</sup>F</p>
                <hr/>
                <p class="low">{{Math.floor(item.lTemp)}}<sup>o</sup>F</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ForecastDays',
    props: {
        dailyData: Array
    },
    data() {
        return {
            weekdata: [],
            day: ['sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']
        }
    },
    watch: {
        dailyData(newval) {
            this.weekdata = [];
            newval.forEach(obj => {
                let hsh = {};
                hsh.day = this.day[new Date(obj.dt*1000).getDay()];
                hsh.prob = obj.clouds;
                hsh.img = require(`../assets/${obj.weather[0].icon}.png`);
                hsh.hTemp = obj.temp.max;
                hsh.lTemp = obj.temp.min;
                this.weekdata.push(hsh);
            });
            console.log(this.weekdata);
        }
    }
}
</script>

<style scoped>
.fd-cont {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.fd-gig-cont {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.fd-gig {
    padding: 10px 13px;
    margin: 0 2px;
    font-size: 12px;
    background-color: var(--light-white);
    border-radius: 7px;
}
.cloud-per {
    margin: 5px 0;
}
.gig-img {
    width: 35px;
    height: 35px;
}

@media only screen and (max-width: 600px) {
    .fd-gig-cont {
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }
    .fd-gig {
        margin: 5px 5px;
    }
}
</style>
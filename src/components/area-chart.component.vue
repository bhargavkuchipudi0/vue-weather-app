<template>
    <canvas id="area-chart"></canvas>
</template>

<script>
import { Chart } from 'chart.js';

export default {
    name: 'AreaChart',
    props: {
        chartData: Object
    },
    data() {
        return {
            label: [],
            data: []
        }
    },
    watch: {
        chartData: function(newData) {
            this.label = newData.label.slice(0, 10);
            this.label[0] = 'Now';
            this.data = newData.data.slice(0, 10);
            this.renderChart();
        }
    },
    methods: {
        renderChart() {
            if (!this.label.length || !this.data.length) return;
            const ctx = document.getElementById('area-chart').getContext('2d');
            var gradient = ctx.createLinearGradient(0, 0, 0, 400);

            gradient.addColorStop(0, 'rgba(255, 255,255, 1)');
            gradient.addColorStop(0.5, 'rgba(255, 255,255, 0.5)');
            gradient.addColorStop(1, 'rgba(255, 255,255, 0)');
                
            Chart.pluginService.register({
                afterDraw: function(chartInstance) {
                    var ctx = chartInstance.chart.ctx;
                    // render the value of the chart above the bar
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    chartInstance.data.datasets.forEach(function (dataset) {
                        for (var i = 0; i < dataset.data.length; i++) {
                            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                            ctx.fillText(dataset.data[i], model.x, model.y - 2);
                        }
                    });
                }
            });
            const min = Math.min(...this.data), max = Math.max(...this.data);
            console.log(min, max);
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.label,
                    datasets: [
                        {   
                            backgroundColor: '#FFFFFF',
                            borderColor: "#3e95cd",
                            fill: false,
                            data: this.data
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    showAllTooltips: true,
                    legend: {
                        display: false
                    },
                    layout: {
                        padding: {
                            top: 40,
                            right: 80,
                            bottom: 40
                        }
                    },
                    scales: {
                        yAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                beginAtZero: true,
                                min: min-2,
                                max: max+2,
                                display: false
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            },
                            ticks: {
                                fontColor: 'white',
                                fontSize: 10,
                            }
                        }]
                    },
                    tooltips: {
                        yAlign: 'bottom',
                    }
                }
            }); 
        }
    },
    mounted() {
        this.renderChart();       
    }
}
</script>

<style scoped>
canvas {
    width: 500px;
    height: 300px;
}
</style>
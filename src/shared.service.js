const axios = require("axios");
const weatherApiKey = ['40f128a2154ed6b1a48293e675b087a2', '208763ad559d54823f07e2b5e25678b2'];
const locationApiKey = '52d8e7f3344f6e';
const globalLocationApiKey = 'a8ead73b558945f88fa717c31ba7448c';
let apiKeyIndex = 1;
const sharedService = {
    getCurrentLocation: () => {
        return axios.get(`https://ipinfo.io?token=${locationApiKey}`).then(response => {
            if (response.status === 200) {
                return response.data;
            } else {
                return 'error'
            }
        }, error => {
            return error;
        })
    },
    getForeCast: ({ lat, lon }) => {
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${weatherApiKey[apiKeyIndex]}&units=imperial`).then(response => {
            if (response.status === 200) {
                return response.data
            } else {
                return 'error';
            }
        }, error => {
            return error;
        });
    },
    getLocationByName: (location) => {
        return axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${globalLocationApiKey}`)
    }
}

export default sharedService;
const axios = require("axios");
const weatherApiKey = '64e6078425558be3addd64a5d6630310';
const locationApiKey = '52d8e7f3344f6e';

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
    getForeCast: ({lat, lon}) => {
        console.log(lat, lon)
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${weatherApiKey}&units=imperial`).then(response => {
            if (response.status === 200) {
                return response.data
            } else {
                return 'error'
            }
        }, error => {
            return error;
        });
    }
}

export default sharedService;
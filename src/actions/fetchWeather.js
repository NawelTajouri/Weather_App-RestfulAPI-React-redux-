import axios from "axios";

 export function fetchWeather(city,days,aqi,alerts) {
    return  function(dispatch) {
        const key = "878a16847a4a4ffbba1193730213009"
        // fetch (`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&`)
        fetch (`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=${days}&aqi=${aqi}&alerts=${alerts}`)
        .then (res => {
            return res.json();
        })
        .then (JSONres => {
            //dispatch the action
            dispatch ({type: "FETCH_WEATHER",
        payload : JSONres});
        }).catch(err => {
            console.log(err);
        })
    }
}
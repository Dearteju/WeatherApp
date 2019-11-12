// Api key from openweathermap

const apiKey = 'a6fd2784e34e15155334881a1bdfe0d6';
const webUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const countryCode = 'us';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
document.getElementById('generate').addEventListener('click', userEntryValues);

function userEntryValues(result) {
    const userZip = document.getElementById('zip').Value;
    const userFeeling = document.getElementById('feelings').Value;


    userWeatherEntry(webUrl, userZip, apiKey)
        .then(function(weatherData) {
            let date = new Date().toISOString().slice(0, 10);
            postData('/addData', { temperature: weatherData.temp, date: date, userResponse: userFeeling });
            updateUI('/savedData');
        })
}

//fetching the web api data
const userWeatherEntry = async(webUrl, userZip, apiKey) => {
    const res = await fetch(webUrl + userZip + ',' + countryCode + '&appid=' + apiKey + '&units=imperial');
    try {
        const weatherData = await res.json();
        return weatherData;
    } catch (error) {
        console.log('error', error);
    }
}

// Async post data 
const postData = async(url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: "same-origin",
        headers: {
            'content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(data)
    });
    try {
        const newData = await Response.json();
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};


//function to get Udating UI in to project data
const updateUI = async(url = '') => {
    const req = await fetch(url);
    try {
        const totalData = await req.json();
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temp;
        document.getElementById('content').innerHTML = allData[0].content;
    } catch (error) {
        console.log('error', error);
    }
}
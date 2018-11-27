(function () {
    'use strict';

    let date        = document.querySelector('.date'),
        temp        = document.querySelector('.temp'),
        tempMobile  = document.querySelector('.temp-mobile'),
        status      = document.querySelector('.status'),
        location    = document.querySelector('.location'),
        forecast    = document.querySelector('.weather-forecast'),
        currentIcon = document.querySelector('.current-weather img'),
        request;

    function createRequest() {
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else if (request === null) {
            alert('Your Browser doesn\'t support AJAX');
        }
        return request;
    }

    function displayProduct() {
        request  = createRequest();
        let key  = '4d8a07d308ea6d6e102335cf2ffb9086';
        let lat  = '42.9487956';
        let long = '-81.3887021';
        let url  = 'https://api.darksky.net/forecast/' + key + '/' + lat + ',' + long + '?units=ca&exclude=minutely,hourly,alerts';
        console.log(url);
        request.onreadystatechange = stateChangedJSON;
        request.open('GET', url);
        request.send(null);
    }

    function stateChangedJSON() {
        if (request.readyState === 4 && request.status === 200) {
            forecast.innerHTML = '';
            var data           = JSON.parse(request.responseText);
            console.log(data);

            date.innerHTML   = timeConverter(data.daily.data[0].time);
            temp.innerHTML   = Math.floor(data.currently.temperature) + 'º<span>' + Math.floor(data.daily.data[0].temperatureMax) + 'º</span><span>' + Math.floor(data.daily.data[0].temperatureMin) + 'º</span>';
            tempMobile.innerHTML   = Math.floor(data.currently.temperature) + 'º<br><span>' + Math.floor(data.daily.data[0].temperatureMax) + 'º</span><span>' + Math.floor(data.daily.data[0].temperatureMin) + 'º</span>';
            status.innerHTML = statusWeather(data.daily.data[0].icon);
            currentIcon.src  = 'images/weather/' + data.daily.data[0].icon + '.svg';

            for (let i = 1; i < 5; i++) {
                let content = '<div class="column-small-3">' +
                              '<div class="weather-hist">' +
                              '<div class="day">' + weekDay(data.daily.data[i].time) + '</div>' +
                              '<div class="weather-image"><img src="images/weather/' + data.daily.data[i].icon + '.svg"></div>' +
                              '<div class="date">' + monthDay(data.daily.data[i].time) + '</div>' +
                              '<div class="temp">' + Math.floor(data.daily.data[i].temperatureMax) + 'º ' + Math.floor(data.daily.data[i].temperatureMin) + 'º</div>' +
                              '</div>' +
                              '</div>';

                forecast.innerHTML += content;
            }
        }
    }

    function timeConverter(dt) {
        var a      = new Date(dt * 1000);
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var month  = months[a.getMonth()];
        var date   = a.getDate();
        var time   = date + ' ' + month + '';
        return time;
    }

    function weekDay(dt) {
        var a      = new Date(dt * 1000);
        var days   = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        var dayNum = a.getDay();
        var date   = days[dayNum];
        return date;
    }

    function monthDay(dt) {
        var a     = new Date(dt * 1000);
        var month = a.getMonth() + 1;
        var date  = a.getDate();
        var time  = date + '/' + month + '';
        return time;
    }

    function statusWeather(st) {
        status = st.replace(/-/g, ' ');
        return status;
    }

    displayProduct();

})();

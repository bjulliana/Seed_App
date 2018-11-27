(function () {
    'use strict';
    let Chart           = require('chart.js'),
        moment          = require('moment'),
        historyCards    = document.querySelectorAll('.historyChart'),
        historyTemp     = document.querySelector('.historyTemp'),
        historyMoisture = document.querySelector('.historyMoisture'),
        historyLight    = document.querySelector('.historyLight'),
        chartLink       = document.querySelectorAll('.chart-link'),
        tempLink        = document.querySelector('.temp-link'),
        moistureLink    = document.querySelector('.moisture-link'),
        lightLink       = document.querySelector('.light-link'),
        chartCard       = document.querySelectorAll('.chart-card'),
        tempCard        = document.querySelector('.temp-card'),
        moistureCard    = document.querySelector('.moisture-card'),
        lightCard       = document.querySelector('.light-card'),
        historyTitle    = document.querySelector('.history-title');

    function histDates(days) {
        return moment().add(days, 'd').format('MMM DD');
    }

    function historyChartMoisture() {
        let canvas = document.getElementById('historyMoisture');
        let ctx    = canvas.getContext('2d');

        let histChart = new Chart(ctx, {
            type   : 'bar',
            data   : {
                labels  : [histDates(-5), histDates(-4), histDates(-3), histDates(-2), histDates(-1), histDates(0)],
                datasets: [
                    {
                        data                : [20, 50, 30, 40, 70, 85],
                        backgroundColor     : '#7486ae',
                        hoverBackgroundColor: '#7486ae'
                    }
                ]
            },
            options: {
                legend             : {
                    display: false
                },
                tooltips           : {
                    enabled      : true,
                    callbacks    : {
                        label: (item) => item.yLabel + '%'
                    },
                    displayColors: false
                },
                responsive         : true,
                maintainAspectRatio: true,
                scales             : {
                    xAxes: [
                        {
                            gridLines         : {
                                drawBorder: false,
                                display   : false
                            },
                            barPercentage     : 1.4,
                            categoryPercentage: 0.4,
                            ticks             : {
                                maxRotation: 90,
                                minRotation: 0
                            },
                            offset            : true
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                max        : 100,
                                callback   : function (value, index, values) {
                                    return value + '%';
                                }
                            }
                        }
                    ]
                }
            }
        });
    }

    function historyChartLight() {
        let canvas = document.getElementById('historyLight');
        let ctx    = canvas.getContext('2d');

        let histChart = new Chart(ctx, {
            type   : 'bar',
            data   : {
                labels  : [histDates(-5), histDates(-4), histDates(-3), histDates(-2), histDates(-1), histDates(0)],
                datasets: [
                    {
                        data                : [60, 70, 80, 70, 50, 60],
                        backgroundColor     : '#FFDA83',
                        hoverBackgroundColor: '#FFDA83'
                    }
                ]
            },
            options: {
                legend    : {
                    display: false
                },
                tooltips  : {
                    enabled      : true,
                    callbacks    : {
                        label: (item) => item.yLabel + '%'
                    },
                    displayColors: false
                },
                responsive: true,
                scales    : {
                    xAxes: [
                        {
                            gridLines         : {
                                drawBorder: false,
                                display   : false
                            },
                            barPercentage     : 1.4,
                            categoryPercentage: 0.4,
                            ticks             : {
                                maxRotation: 90,
                                minRotation: 0
                            },
                            offset            : true
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                max        : 100,
                                callback   : function (value, index, values) {
                                    return value + '%';
                                }
                            }
                        }
                    ]
                }
            }
        });
    }

    function historyChartTemp() {
        let canvas = document.getElementById('historyTemp');
        let ctx    = canvas.getContext('2d');

        let histChart = new Chart(ctx, {
            type   : 'line',
            data   : {
                labels  : [histDates(-5), histDates(-4), histDates(-3), histDates(-2), histDates(-1), histDates(0)],
                datasets: [
                    {
                        data           : ['22', '24', '23', '13', '20', '21'],
                        borderColor    : '#FF8373',
                        fill           : true,
                        backgroundColor: 'rgba(255, 131, 115, 0.2)'
                    }
                ]
            },
            options: {
                legend    : {
                    display: false
                },
                tooltips  : {
                    enabled      : true,
                    displayColors: false,
                    callbacks    : {
                        label: (item) => item.yLabel + 'ºC'
                    }
                },
                responsive: true,
                scales    : {
                    xAxes: [
                        {
                            display   : true,
                            scaleLabel: {
                                display: true
                            }
                        }
                    ],
                    yAxes: [
                        {
                            display   : true,
                            scaleLabel: {
                                display: true
                            },
                            ticks     : {
                                //min        : 10,
                                //max        : 26,
                                callback   : function (value, index, values) {
                                    return value + 'ºC';
                                }
                            }
                        }
                    ]
                }
            }
        });
    }

    function clearClasses() {
        for (let i = 0; i < chartLink.length; i++) {
            chartLink[i].classList.remove('active');
        }
        for (let i = 0; i < historyCards.length; i++) {
            historyCards[i].classList.remove('active');
        }
        for (let i = 0; i < chartCard.length; i++) {
            chartCard[i].classList.remove('active');
        }
    }

    function tempActive() {
        clearClasses();
        tempCard.classList.add('active');
        tempLink.classList.add('active');
        historyTemp.classList.add('active');
        historyTitle.innerHTML = 'Temperature History';
        historyChartTemp();
    }

    function moistureActive() {
        clearClasses();
        moistureCard.classList.add('active');
        moistureLink.classList.add('active');
        historyMoisture.classList.add('active');
        historyTitle.innerHTML = 'Moisture History';
        historyChartMoisture();
    }

    function lightActive() {
        clearClasses();
        lightCard.classList.add('active');
        lightLink.classList.add('active');
        historyLight.classList.add('active');
        historyTitle.innerHTML = 'Light History';
        historyChartLight();
    }

    tempLink.addEventListener('click', tempActive, false);
    tempCard.addEventListener('click', tempActive, false);
    moistureLink.addEventListener('click', moistureActive, false);
    moistureCard.addEventListener('click', moistureActive, false);
    lightLink.addEventListener('click', lightActive, false);
    lightCard.addEventListener('click', lightActive, false);

    historyChartMoisture();

})();

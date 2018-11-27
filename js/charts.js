(function () {
    'use strict';
    let Chart         = require('chart.js'),
        moment        = require('moment'),
        tempCard      = document.querySelector('.temp-card'),
        moistureCard  = document.querySelector('.moisture-card'),
        lightCard     = document.querySelector('.light-card'),
        historyCards  = document.querySelectorAll('.historyChart'),
        tempChart     = document.querySelector('.historyTemp'),
        moistureChart = document.querySelector('.historyMoisture'),
        lightChart    = document.querySelector('.historyLight');

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
                            type              : 'time',
                            time              : {
                                unit          : 'day',
                                round         : 'day',
                                displayFormats: {
                                    day: 'MMM D'
                                }
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
                            type              : 'time',
                            time              : {
                                unit          : 'day',
                                round         : 'day',
                                displayFormats: {
                                    day: 'MMM D'
                                }
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
                datasets: [
                    {
                        data           : ['2ºC', '-1ºC', '-1ºC', '0ºC', '3ºC', '4ºC', '3ºC'],
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
                    displayColors: false
                },
                responsive: true,
                scales    : {
                    xAxes: [
                        {
                            display   : true,
                            scaleLabel: {
                                display: true
                            },
                            labels    : [histDates(-5), histDates(-4), histDates(-3), histDates(-2), histDates(-1), histDates(0)]
                        }
                    ],
                    yAxes: [
                        {
                            type      : 'category',
                            position  : 'left',
                            display   : true,
                            scaleLabel: {
                                display: true
                            },
                            labels    : ['5ºC', '4ºC', '3ºC', '2ºC', '1ºC', '0ºC', '-1ºC', '-2ºC', '-3ºC']
                        }
                    ]
                }
            }
        });
    }

    tempCard.addEventListener('click', function () {
        for (let i = 0; i < historyCards.length; i++) {
            historyCards[i].classList.remove('active');
        }
        tempChart.classList.add('active');
        historyChartTemp();
    });

    moistureCard.addEventListener('click', function () {
        for (let i = 0; i < historyCards.length; i++) {
            historyCards[i].classList.remove('active');
        }
        moistureChart.classList.add('active');
        historyChartMoisture();
    });

    lightCard.addEventListener('click', function () {
        for (let i = 0; i < historyCards.length; i++) {
            historyCards[i].classList.remove('active');
        }
        lightChart.classList.add('active');
        historyChartLight();
    });

    historyChartMoisture();

})();

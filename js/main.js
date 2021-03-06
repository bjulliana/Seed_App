(function () {
    'use strict';
    var Readable = require('stream').Readable;
    var util     = require('util');
    var five     = require('johnny-five');
    var Chart    = require('chart.js');

    util.inherits(MyStream, Readable);

    function MyStream(opt) {
        Readable.call(this, opt);
    }

    MyStream.prototype._read = function () {
    };
    process.__defineGetter__('stdin', function () {
        if (process.__stdin) {
            return process.__stdin;
        }
        process.__stdin = new MyStream();
        return process.__stdin;
    });

    var board = new five.Board();

    board.on('ready', function () {
        var moistureSensor = new five.Sensor({
            pin      : 'A0',
            freq     : 2000,
            threshold: 50,
            custom   : {
                value: ''
            }
        });

        var tempSensor = new five.Thermometer({
            controller: 'LM35',
            pin       : 'A3',
            freq      : 2000,
            threshold : 3,
            custom    : {
                value: ''
            }
        });

        var photoSensor = new five.Sensor({
            pin      : 'A5',
            freq     : 2000,
            threshold: 50,
            custom   : {
                value: ''
            }
        });

        board.repl.inject({
            pot: photoSensor
        });

        moistureSensor.on('change', function () {
            var moisture      = this.value;
            var test          = this.scaleTo(100, 0);
            this.custom.value = test;
            moistureChart(test);
            updateStatus();
        });

        tempSensor.on('change', function () {
            var temp                                       = this.celsius - 20;
            this.custom.value                              = temp;
            document.querySelector('.temp-info').innerHTML = '<p>' + temp + '°<span>C</span></p>';
            updateStatus();
        });

        photoSensor.on('change', function () {
            var lux           = this.scaleTo(0, 100);
            this.custom.value = lux;
            lightChart(lux);
            updateStatus();
        });

        function updateStatus() {
            let temperature = tempSensor.custom.value,
                light       = photoSensor.custom.value,
                moisture    = moistureSensor.custom.value,
                status      = document.querySelector('.health-info'),
                timestamp   = document.querySelector('.update-info'),
                currentdate = new Date();

            timestamp.innerHTML = 'Updated at ' + (currentdate.getMonth() + 1) + '/' + currentdate.getDate() + '/' + currentdate.getFullYear() + ' at ' + (currentdate.getHours() < 10 ? "0" : "") + currentdate.getHours() + ':' + (currentdate.getMinutes() < 10 ? "0" : "") + currentdate.getMinutes();

            if (moisture !== '' && light !== '' && temperature !== '') {
                console.log('temp: ' + temperature);
                console.log('light: ' + light);
                console.log('moisture: ' + moisture);

                if ((moisture < 10 && temperature < 10) ||
                    (moisture < 10 && light < 10) ||
                    (temperature < 10 && light < 10)) {
                    status.innerHTML = 'Poor';
                    status.className = '';
                    status.classList.add('health-poor', 'health-info');
                } else if ((temperature < 17) || (light < 39) || (moisture < 39)) {
                    status.innerHTML = 'Fair';
                    status.className = '';
                    status.classList.add('health-average', 'health-info');
                } else if (temperature > 18 && light > 40 && moisture > 40) {
                    status.innerHTML = 'Good';
                    status.className = '';
                    status.classList.add('health-good', 'health-info');
                }
            }
        }
    });

    if (board.isConnected === false) {
        moistureChart(40);
        lightChart(67);
        document.querySelector('.temp-info').innerHTML = '<p>24°<span>C</span></p>';
    }

    function moistureChart(moisture) {
        var canvas = document.getElementById('moistureChart');
        var ctx    = canvas.getContext('2d');

        var moistureChrt = new Chart(ctx, {
            type   : 'doughnut',
            data   : {
                datasets: [
                    {
                        label               : 'Moisture',
                        data                : [moisture, 100 - moisture],
                        backgroundColor     : [
                            '#7486ae',
                            '#dadada'
                        ],
                        hoverBackgroundColor: [
                            '#7486ae',
                            '#dadada'
                        ],
                        borderWidth         : 0
                    }
                ]
            },
            options: {
                events          : [],
                tooltips        : {
                    enabled: false
                },
                responsive      : true,
                rotation        : Math.PI,
                circumference   : Math.PI,
                cutoutPercentage: 65,
                showTooltips    : false,
                animation       : {
                    onComplete: function () {
                        var width     = ctx.canvas.clientWidth;
                        var height    = ctx.canvas.clientHeight;
                        var fontSize  = ctx.canvas.clientWidth / 8 + 'px';
                        var color     = '#3c3c3c';
                        ctx.font      = 'bold ' + fontSize + ' Lato';
                        ctx.fillStyle = color;
                        ctx.fillText(moisture + '%', width / 2.6, height / 1.2);

                    }
                }
            }
        });
    }

    function createRemap(moisture) {
        var inMin  = 1023,
            inMax  = 400,
            outMin = 0,
            outMax = 100;

        return Math.round((moisture - inMin) * (outMax - outMin) / (inMax - inMin) + outMin);
    }

    function lightChart(light) {
        var light  = light;
        var canvas = document.getElementById('lightChart');
        var ctx    = canvas.getContext('2d');

        var tempChart = new Chart(ctx, {
            type   : 'doughnut',
            data   : {
                datasets: [
                    {
                        label               : 'Light',
                        data                : [light, 100 - light],
                        backgroundColor     : [
                            '#FFDA83',
                            '#dadada'
                        ],
                        hoverBackgroundColor: [
                            '#FFDA83',
                            '#dadada'
                        ],
                        borderWidth         : 0
                    }
                ]
            },
            options: {
                events          : [],
                tooltips        : {
                    enabled: false
                },
                responsive      : true,
                rotation        : Math.PI,
                circumference   : Math.PI,
                cutoutPercentage: 65,
                showTooltips    : false,
                animation       : {
                    onComplete: function () {
                        var width     = ctx.canvas.clientWidth;
                        var height    = ctx.canvas.clientHeight;
                        var fontSize  = ctx.canvas.clientWidth / 8 + 'px';
                        var color     = '#3c3c3c';
                        ctx.font      = 'bold ' + fontSize + ' Lato';
                        ctx.fillStyle = color;
                        ctx.fillText(light + '%', width / 2.6, height / 1.2);

                    }
                }
            }
        });
    }
})();

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

var board    = new five.Board();
var valueDiv = document.querySelector('#plantValue');

board.on('ready', function () {
	var moistureSensor = new five.Sensor({
		pin      : 'A1',
		freq     : 250,
		threshold: 2
	});


	var tempSensor = new five.Thermometer({
		controller: 'LM35',
		pin       : 'A3',
		freq      : 250
	});

	var photoSensor = new five.Sensor({
		pin      : 'A5',
		freq     : 250,
		threshold: 50
	});

	board.repl.inject({
		pot: photoSensor
	});

	moistureSensor.on('change', function () {
		var sensorInfo = this.value;
		moistureChart(sensorInfo);
	});

	tempSensor.on('change', function () {
		console.log((this.celsius - 10) + '°C', this.fahrenheit + '°F');
		document.querySelector('.temp-info').innerHTML = '<p>' + this.celsius - 10 + '°<span>C</span></p>';
	});

	photoSensor.on('change', function () {
		var lux = this.scaleTo(0, 100);
		lightChart(lux);
	});
});

if (board.isConnected === false) {
	moistureChart(670);
	lightChart(67);
	//tempChart(25);
    document.querySelector('.temp-info').innerHTML = '<p>24°<span>C</span></p>';
}

function moistureChart(moisture) {
	var roundMoisture = createRemap(moisture);
	var canvas = document.getElementById('moistureChart');
	var ctx    = canvas.getContext('2d');

	var moistureChrt = new Chart(ctx, {
		type   : 'doughnut',
		data   : {
			datasets: [
				{
					label               : 'Moisture',
					data                : [roundMoisture, 100 - roundMoisture],
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
            responsive: true,
			rotation        : 1 * Math.PI,
			circumference   : 1 * Math.PI,
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
					ctx.fillText(roundMoisture + '%', width / 2.6, height / 1.2);

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
            responsive: true,
			rotation        : 1 * Math.PI,
			circumference   : 1 * Math.PI,
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

function tempChart(temp) {
	var temp   = temp;
	var canvas = document.getElementById('temperatureChart');
	var ctx    = canvas.getContext('2d');

    var tempChart = new Chart(ctx, {
		type   : 'doughnut',
		data   : {
			datasets: [
				{
					label               : 'Temperature',
					data                : [temp, 100 - temp],
					backgroundColor     : [
						'#FF8373',
						'#dadada'
					],
					hoverBackgroundColor: [
						'#FF8373',
						'#dadada'
					],
					borderWidth         : 0
				}
			]
		},
		options: {
			responsive: true,
			events          : [],
			tooltips        : {
				enabled: false
			},
			rotation        : 1 * Math.PI,
			circumference   : 1 * Math.PI,
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
					ctx.fillText(temp + '%', width / 2.6, height / 1.2);

				}
			}
		}
	});
}

//Function to Update Health Status
var healthStatus = document.querySelector('.health-info');

//function updateStatus(moisture, light, temp) {
//    console.log(moisture, light, temp);
//}



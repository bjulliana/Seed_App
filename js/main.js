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
		freq     : 250, //Emit Data Every 250ms.
		threshold: 2
	});

	tempChart(30);
	lightChart(90);

	moistureSensor.on('change', function () {
		var sensorInfo = this.value;
		moistureChart(sensorInfo);
	});
});

function moistureChart(moisture) {
	if (moistureChrt) {
		moistureChrt.destroy();
	}
	var roundMoisture = getMoisture(moisture);

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
			rotation        : 1 * Math.PI,
			circumference   : 1 * Math.PI,
			cutoutPercentage: 65,
			showTooltips    : false,
			animation       : {
				onComplete: function () {
					var width    = ctx.canvas.clientWidth;
					var height   = ctx.canvas.clientHeight;
					var fontSize = ctx.canvas.clientWidth / 8 + 'px';
					var color    = '#3c3c3c';
					console.log(width);
					ctx.font      = 'bold ' + fontSize + ' Lato';
					ctx.fillStyle = color;
					ctx.fillText(roundMoisture + '%', width / 2.6, height / 1.2);

				}
			}
		}
	});
}

function getMoisture(moisture) {
	return Math.round(moisture / 1023 * 100);
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
					var width    = ctx.canvas.clientWidth;
					var height   = ctx.canvas.clientHeight;
					var fontSize = ctx.canvas.clientWidth / 8 + 'px';
					var color    = '#3c3c3c';
					console.log(width);
					ctx.font      = 'bold ' + fontSize + ' Lato';
					ctx.fillStyle = color;
					ctx.fillText(temp + '%', width / 2.6, height / 1.2);

				}
			}
		}
	});
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
			rotation        : 1 * Math.PI,
			circumference   : 1 * Math.PI,
			cutoutPercentage: 65,
			showTooltips    : false,
			animation       : {
				onComplete: function () {
					var width    = ctx.canvas.clientWidth;
					var height   = ctx.canvas.clientHeight;
					var fontSize = ctx.canvas.clientWidth / 8 + 'px';
					var color    = '#3c3c3c';
					console.log(width);
					ctx.font      = 'bold ' + fontSize + ' Lato';
					ctx.fillStyle = color;
					ctx.fillText(light + '%', width / 2.6, height / 1.2);

				}
			}
		}
	});
}

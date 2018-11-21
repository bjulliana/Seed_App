(function () {
	'use strict';
	let Chart  = require('chart.js'),
	    moment = require('moment');

	function historyChart() {
		var canvas = document.getElementById('historyChart');
		var ctx    = canvas.getContext('2d');

        function histDates(days) {
			return moment().add(days, 'd').toDate();
		}

		console.log(histDates(-5));

		var histChart = new Chart(ctx, {
			type   : 'bar',
			data   : {
				labels  : [histDates(-5), histDates(-4), histDates(-3), histDates(-2), histDates(-1), histDates(0)],
				datasets: [
					{
						data           : [20, 50, 30, 40, 70, 100],
						backgroundColor: '#FF8373',
                        hoverBackgroundColor: '#FF8373',
					}
				]
			},
			options: {
				legend: {
					display: false
				},
                tooltips        : {
                    enabled: false
                },
				responsive: true,
				scales: {
					xAxes: [{
						gridLines: {
							drawBorder: false,
							display   : false
						},
						type     : 'time',
						time     : {
							unit          : 'day',
							round         : 'day',
							displayFormats: {
								day: 'MMM D'
							}
						},
						barPercentage: 1.4,
						categoryPercentage: 0.4,
						ticks: {
							maxRotation: 90,
							minRotation: 0,
						},
						offset: true
						}],
					yAxes: [{
						ticks: {
							beginAtZero: true
						}
					}]
				}
			}
		});
	}

	historyChart();

})();

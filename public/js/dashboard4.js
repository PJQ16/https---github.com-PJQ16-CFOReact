$(function() {
	'use strict';
	
	 // BARCHART
	var chartdata = [{
		name: 'sales',
		type: 'bar',
		data: [10, 15, 9, 18, 10, 15]
	}, {
		name: 'profit',
		type: 'line',
		smooth: true,
		data: [8, 5, 25, 10, 10]
	}, {
		name: 'growth',
		type: 'bar',
		data: [10, 14, 10, 15, 9, 25]
	}];
	var chart = document.getElementById('echart1');
	var barChart = echarts.init(chart);
	var option = {
		grid: {
			top: '6',
			right: '0',
			bottom: '17',
			left: '25',
		},
		xAxis: {
			data: ['2014', '2015', '2016', '2017', '2018'],
			axisLine: {
				lineStyle: {
					color: '#ececff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		tooltip: {
			show: true,
			showContent: true,
			alwaysShowContent: true,
			triggerOn: 'mousemove',
			trigger: 'axis',
			axisPointer: {
				label: {
					show: false,
				}
			}
		},
		yAxis: {
			splitLine: {
				lineStyle: {
					color: '#fff'
				}
			},
			axisLine: {
				lineStyle: {
					color: '#fff'
				}
			},
			axisLabel: {
				fontSize: 10,
				color: '#9ca1b9'
			}
		},
		series: chartdata,
		color: ['#920b7f', '#f47b25', '#3e1088', ]
	};
	barChart.setOption(option);
	
	
	 // SPARKLINEBAR
	$(".sparkline11").sparkline([3, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6, 2, 4], {
		type: 'bar',
		height: '43',
		barWidth: 5,
		colorMap: {
			'7': '#a1a1a1'
		},
		barSpacing: 1,
		barColor: '#920b7f'
	});
	
	 // SPARKLINEBAR2
	$(".sparkline12").sparkline([3, 4, 3, 4, 5, 4, 5 ], {
		type: 'bar',
		height: '43',
		barWidth: 5,
		colorMap: {
			'7': '#a1a1a1'
		},
		barSpacing: 1,
		barColor: '#920b7f'
	});
			
	 // SPARKLINEPIE		
	$(".sparkline_pie").sparkline([1, 1, 2,1], {
		type: 'pie',
		width: 50,
		height: 50,
		sliceColors: ['#f47b25','#3e1088','#920b7f']
	});
	
	 // SPARKLINE
	$(".sparkline22").sparkline([2, 4, 3, 4, 7, 5, 4, 3, 5, 6, 2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 6], {
		type: 'line',
		height: '40',
		width: '100',
		lineColor: '#3e1088',
		fillColor: '#ffffff',
		lineWidth: 3,
		spotColor: '#ffa22b',
		minSpotColor: '#ffa22b'
	});
	
	 // SPARKLINEAREA	
	$(".sparkline_area").sparkline([2, 4, 3, 4, 5, 4, 5, 4, 3, 4, 5, 6], {
		type: 'line',
		width: 50,
		height: 50,
		lineColor: '#f47b25',
		fillColor: '#f5b78a',
		spotColor: '#f44336',
		minSpotColor: '#f44336',
		maxSpotColor: '#f44336',
		highlightSpotColor: '#f44336',
		highlightLineColor: '#f44336',
		spotRadius: 2.5,
		width: 85
	});
	
	 // MORRIS LINECHART
	var line = new Morris.Line({
		element: 'line-chart',
		resize: true,
		data: [{
 			y: '2011 Q1',
 			item1: 2666,
 			item2: 2666
 		}, {
 			y: '2011 Q2',
 			item1: 2778,
 			item2: 2294
 		}, {
 			y: '2011 Q3',
 			item1: 4912,
 			item2: 1969
 		}, {
 			y: '2011 Q4',
 			item1: 3767,
 			item2: 13597
 		}, {
 			y: '2012 Q1',
 			item1: 6810,
 			item2: 1914
 		}, {
 			y: '2012 Q2',
 			item1: 15670,
 			item2: 4293
 		}, {
 			y: '2012 Q3',
 			item1: 4820,
 			item2: 3795
 		}, {
 			y: '2012 Q4',
 			item1: 15073,
 			item2: 5967
 		}, {
 			y: '2013 Q1',
 			item1: 10687,
 			item2: 4460
 		}, {
 			y: '2013 Q2',
 			item1: 8432,
 			item2: 5713
 		}],
		xkey: 'y',
 		ykeys: ['item1', 'item2'],
 		labels: ['Item 1', 'Item 2'],
 		lineColors: ['#3e1088', '#920b7f'],
		pointRadius: 0,
 		hideHover: 'auto'
	});	
	
});


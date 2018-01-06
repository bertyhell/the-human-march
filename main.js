google.charts.load('current', {
  'packages': ['corechart']
});

window.addEventListener('DOMContentLoaded', function() {
  fetch('charts.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(charts) {
      google.charts.setOnLoadCallback(function() {
        drawCharts(charts);
      })      
    });
});

function drawCharts(charts) {
  var chartsContainer = document.querySelector('.charts');
  
  for (var chartName in charts) {
    if (charts.hasOwnProperty(chartName)) {
      fetch('charts/' + chartName + '.json')
        .then(function(response) {
          return response.json();
        })
        .then(function(chartDetails) {
          drawChart(chartDetails, chartsContainer);
        });
    }
  }
}

function drawChart(chartDetails, chartsContainer) {
  var data = google.visualization.arrayToDataTable(chartDetails.data);

  var options = {
    title: chartDetails.title,
    width: '100%',
    height: '100%',
    hAxis: {
      title: chartDetails.data[0][0].label
    },
    vAxis: {
      title: chartDetails.data[0][1].label,
      logScale: true
    },
    legend: 'none'
  };

  var chartDiv = document.createElement('div');
  chartDiv.className = 'chart';
  chartsContainer.appendChild(chartDiv);
  var chart = new google.visualization.ScatterChart(chartDiv);
  chart.draw(data, options);
}
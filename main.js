let chartsData = null;

google.charts.load('current', {
  packages: ['corechart'],
});

window.addEventListener('DOMContentLoaded', function() {
  fetch('charts.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(charts) {
      google.charts.setOnLoadCallback(function() {
        chartsData = charts;
        drawCharts();
      })
    });
  
  let debouncedDrawCharts = _.debounce(drawCharts, 500);
  window.addEventListener('resize', debouncedDrawCharts);
});

function drawCharts() {
  let chartsContainer = document.querySelector('.charts');
  chartsContainer.innerHTML = '';

  for (let chartName in chartsData) {
    if (chartsData.hasOwnProperty(chartName)) {
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
  let jsonData = chartDetails.data;

  // Convert json date string to javascript date object
  if (jsonData[0][0].type === 'date') {
    for (let i = 1; i < jsonData.length; i++) {
      jsonData[i][0] = moment(jsonData[i][0]).toDate();
    }
  }
  if (jsonData[0][1].type === 'date') {
    for (let j = 1; j < jsonData.length; j++) {
      jsonData[j][0] = moment(jsonData[j][0]).toDate();
    }
  }

  let options = {
    title: chartDetails.title,
    width: '100%',
    height: '100%',
    hAxis: {
      title: chartDetails.data[0][0].label
    },
    vAxis: {
      title: chartDetails.data[0][1].label,
//       logScale: true
    },
    legend: 'none'
  };

  if (jsonData[0][0].id === 'year') {
    options.hAxis.format = '0';
  }
  if (jsonData[0][1].id === 'year') {
    options.vAxis.format = '0';
  }

  // Add the chart to dom and initialize it
  let data = google.visualization.arrayToDataTable(jsonData);
  let chartDiv = document.createElement('div');
  chartDiv.className = 'chart';
  chartsContainer.appendChild(chartDiv);
  let chart = new google.visualization.ScatterChart(chartDiv);
  chart.draw(data, options);
}
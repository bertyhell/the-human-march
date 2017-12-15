window.addEventListener('DOMContentLoaded', function() {
  var graphsContainer = document.querySelector('.graphs');

  fetch('graphs.json')
    .then(function(response) {
      return response.json();
    })
    .then(function(graphs) {
      for (var graphName in graphs) {
        if (graphs.hasOwnProperty(graphName)) {
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');
          fetch('graphs/' + graphName + '.json')
            .then(function(response) {
              return response.json();
            })
            .then(function(graphDetails) {
              new Chart(ctx, {
                type: 'line',
                data: graphDetails.data,
                options: {
                  "scales": {
                    "xAxes": [{
                      "type": "linear",
                      "position": "bottom"
                    }],
                    "yAxes": [{
                      "type": "logarithmic",
                      "display": true,
                      "id": "percentage",
                      "scaleLabel": {
                        "display": true,
                        "labelString": 'Transistors',
                      },
                      "ticks": {
                        "callback": function(tick, index, ticks) {
                          return tick.toLocaleString();
                        }
                      }
                    }]
                  }
                }
              });
              graphsContainer.appendChild(canvas);
            });
        }
      }
    });
});
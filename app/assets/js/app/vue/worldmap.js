var targetSVG = "M9,0C4.029,0,0,4.029,0,9s4.029,9,9,9s9-4.029,9-9S13.971,0,9,0z M9,15.93 c-3.83,0-6.93-3.1-6.93-6.93S5.17,2.07,9,2.07s6.93,3.1,6.93,6.93S12.83,15.93,9,15.93 M12.5,9c0,1.933-1.567,3.5-3.5,3.5S5.5,10.933,5.5,9S7.067,5.5,9,5.5 S12.5,7.067,12.5,9z";
var planeSVG = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
var map = AmCharts.makeChart("chartdiv", {
  "type": "map",
  "theme": "light",
  "dataProvider": {
    "map": "worldLow",
    "zoomLevel": 1.5,
    "zoomLongitude": -55,
    "zoomLatitude": 42,
    "lines": [{
      "id": "line1",
      "arc": -0.85,
      "alpha": 0.3,
      "latitudes": [53.1424, 30.2672, 34.5037, 40.7128, 45.4642, 40.4168, 46.2276, 42.7087],
      "longitudes": [-7.6921, -97.7431, -93.0552, -74.0060, -9.1900, -3.7038, -2.2137, -19.3744]
    }, {
      "id": "line2",
      "alpha": 0,
      "color": "#000000",
      "latitudes": [53.1424, 30.2672, 34.5037, 40.7128, 45.4642, 40.4168, 46.2276, 42.7087],
      "longitudes": [-7.6921, -97.7431, -93.0552, -74.0060, -9.1900, -3.7038, -2.2137, -19.3744]
    }],
    "images": [{
        "svgPath": targetSVG,
        "title": "Ireland",
        "latitude": 53.1424,
        "longitude": -7.6921
      }, {
        "svgPath": targetSVG,
        "title": "Austin",
        "latitude": 30.2672,
        "longitude": -97.7431
      }, {
        "svgPath": targetSVG,
        "title": "Hot Springs",
        "latitude": 34.5037,
        "longitude": -93.0552
      }, {
        "svgPath": targetSVG,
        "title": "New York",
        "latitude": 40.7128,
        "longitude": -74.0060
      }, {
        "svgPath": targetSVG,
        "title": "Milan",
        "latitude": 45.4642,
        "longitude": -9.1900
      }, {
        "svgPath": targetSVG,
        "title": "Madrid",
        "latitude": 40.4168,
        "longitude": -3.7038
      }, {
        "svgPath": targetSVG,
        "title": "Paris France",
        "latitude": 46.2276,
        "longitude": -2.2137
      }, {
        "svgPath": targetSVG,
        "title": "Montenegro",
        "latitude": 42.7087,
        "longitude": -19.3744
      },
      {
        "svgPath": planeSVG,
        "positionOnLine": 0,
        "color": "#000000",
        "alpha": 0.1,
        "animateAlongLine": true,
        "lineId": "line2",
        "flipDirection": true,
        "loop": true,
        "scale": 0.03,
        "positionScale": 1.3
      }, {
        "svgPath": planeSVG,
        "positionOnLine": 0,
        "color": "#585869",
        "animateAlongLine": true,
        "lineId": "line1",
        "flipDirection": true,
        "loop": true,
        "scale": 0.03,
        "positionScale": 1.8
      }
    ]
  },
  "areasSettings": {
    "unlistedAreasColor": "#8dd9ef"
  },
  "imagesSettings": {
    "color": "#585869",
    "rollOverColor": "#585869",
    "selectedColor": "#585869",
    "pauseDuration": 0.2,
    "animationDuration": 2.5,
    "adjustAnimationSpeed": true
  },
  "linesSettings": {
    "color": "#585869",
    "alpha": 0.4
  },
  "export": {
    "enabled": true
  }
});
///This is a 3-STEP process
/// 1. Setting up the Basemap
// here this function sets up the name (to match the id of the map div element in the HTML), the center with coordinates(latitude, longitude), and the zoom level(larger level, more zoom-in) for the map.
var map = L.map('map', {
  center: [-23.817, -55.731],
  zoom: 6.5
});

// here we set up the basemap style
// we can also set it as var Style = 'dark';
// other styles are also available to choose from
// here maybe: http://leaflet-extras.github.io/leaflet-providers/preview/
var Style = 'light';

// this code constructs the map object
L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);
console.log("mapped");

///2. Adding the markers
// now add the marker here, with a popup text explaining the marker
L.marker([47.262, 7.581]).addTo(map)
    .bindPopup('Torino, Italy')
    .addTo(map);

///3. Adding the layer data to be mapped
// calling the data to be mapped, that is in this case, stored within the Github repo data folder
var Paraguay_Department = "https://raw.githubusercontent.com/sulheeyoon/test_121517_v2/master/data/department.geojson";

//use this function to download and create mappable objects
$(document).ready(function(){
  $.ajax(Paraguay_Department).done(function(data){
    var parsedData = JSON.parse(data);
    var LayerMappedPolygon = L.geoJSON(parsedData,
      {
        style: {opacity:1,width:0.5,color:'#83C1E9'},
        pointToLayer: function (feature, latlng) {
        return new L.Polygon(latlng, {
        });
      },
    }).bindPopup('I\'m in Paraguay!')
    .addTo(map);
  })
})

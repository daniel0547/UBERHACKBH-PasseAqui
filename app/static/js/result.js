let baseLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom: 18
  }
);
//diferentes icones
let origemicon = new L.icon({iconUrl: '/static/images/square.png', iconSize: [20,20], iconAnchor: [9,19]});
let destinoicon = new L.icon({iconUrl: '/static/images/point.png', iconSize: [20,20], iconAnchor: [9,19]});
let markerred = new L.icon({iconUrl: '/static/images/marker_red.png', iconSize: [20,20], iconAnchor: [9,19]});
let markerorange = new L.icon({iconUrl: '/static/images/marker_orange.png', iconSize: [20,20], iconAnchor: [9,19]});
let markeryellow = new L.icon({iconUrl: '/static/images/marker_yellow.png', iconSize: [20,20], iconAnchor: [9,19]});
let origem=null;
let destino=null;

let map = new L.Map('map', {
  center: new L.LatLng(latitude, longitude),
  zoom: 17,
  layers: [baseLayer]
});

nodeObj ={
  lat:latitude,
  lng:longitude,
  marker: L.marker([latitude,longitude])
}

//var polyline = L.polyline(points, {color: 'red'}).addTo(map);
let geojson = [{
"type": "FeatureCollection",
"features": [{
    "type": "Feature",
    "geometry": {
        "type": "LineString",
        "coordinates": points
    },
		"properties": {
				"attributeType": 1
		}
}],
"properties": {
        "Creator": "OpenRouteService.org",
        "records": 1,
        "summary": "steepness"
}}]
L.geoJson(geojson).addTo(map);
var hg = L.control.heightgraph({
    width: 320,
    height: 280,
    margins: {
        top: 10,
        right: 30,
        bottom: 55,
        left: 50
    },
    position: "bottomright",
    mappings: undefined || colorMappings
});
hg.addTo(map);
hg.addData(geojson);
window.onload = function() {
	$('.heightgraph-close-icon')[0].click()
}
origemmark ={
	lat:latitude,
	lng:longitude,
	marker: L.marker([latitude,longitude],{icon: origemicon})
}
origemmark.marker.addTo(map);
destmark ={
	lat:latitudedest,
	lng:longitudedest,
	marker: L.marker([latitudedest,longitudedest],{icon: destinoicon})
}
destmark.marker.addTo(map);
function addprob(latr,lngr,t,message){
	if(t==1){
		prob ={
			lat:latr,
			lng:lngr,
			marker: L.marker([latr,lngr],{icon: markerred})
		}
		prob.marker.bindPopup(message);
		//Evento mouseOver/mouseOut
		prob.marker.on('mouseover', function (e) {
			this.openPopup();
		});
		prob.marker.on('mouseout', function (e) {
			this.closePopup();
		});
	}
	if(t==2){
		prob ={
			lat:latr,
			lng:lngr,
			marker: L.marker([latr,lngr],{icon: markerorange})
		}
		prob.marker.bindPopup(message);
		//Evento mouseOver/mouseOut
		prob.marker.on('mouseover', function (e) {
			this.openPopup();
		});
		prob.marker.on('mouseout', function (e) {
			this.closePopup();
		});
	}
	if(t==3){
		prob ={
			lat:latr,
			lng:lngr,
			marker: L.marker([latr,lngr],{icon: markeryellow})
		}
		prob.marker.bindPopup(message);
		//Evento mouseOver/mouseOut
		prob.marker.on('mouseover', function (e) {
			this.openPopup();
		});
		prob.marker.on('mouseout', function (e) {
			this.closePopup();
		});
	}
	prob.marker.addTo(map);
}

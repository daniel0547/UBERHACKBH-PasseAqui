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

map.on('click', function(e){
	let lat = e.latlng.lat;
	let lng = e.latlng.lng;
	let node = {
		lat:lat,
		lng:lng
	}
	add(node)
	console.log("Clicked " + lat + "," + lng);
});


function searchandgo(){
	let query = $('#searchPlace').val();
	let url="https://nominatim.openstreetmap.org/search/"
	let frmt="?format=json";
	theUrl=url+query+frmt;
	$.getJSON(theUrl, function(data) {
			map.setView([data[0].lat, data[0].lon],18);
	});
}

function updatemap(lat,lng,z){
	map.setView([lat, lng],z);
}

function add(node){
	if(origem){
		nodeObj ={
			lat:node.lat,
			lng:node.lng,
			marker: L.marker([node.lat,node.lng],{icon: destinoicon})
		}
		if(destino){
			destino.marker.removeFrom(map);
		}
		destino=nodeObj;
	}
	else{
		nodeObj ={
			lat:node.lat,
			lng:node.lng,
			marker: L.marker([node.lat,node.lng],{icon: origemicon})
		}
		origem=nodeObj;
		$("#searchPlace")[0].placeholder="Para onde?"
	}
	nodeObj.marker.addTo(map);
}

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

function submitpoint(){
  let form = $('#input_form');
	$('#origem_lat').val(origem.lat);
	$('#origem_lng').val(origem.lng);
	$('#destino_lat').val(destino.lat);
	$('#destino_lng').val(destino.lng);
  form.submit()
}

function submitreport(){
  let form = $('#report_form');
	$('#report_lat').val(origem.lat);
	$('#report_lng').val(origem.lng);
  form.submit()
}

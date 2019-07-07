import requests
from openrouteservice import convert
from app.settings import *

def getexpandedareas():
	ps=[]
	for p in Problema.query.filter(Problema.gravidade<2):
		ps.append([p.lat,p.lng])
	features=[]
	for p in ps:
		clat=float(p[1])
		clng=float(p[0])
		d=0.00005;
		out= [
			  [
				[float(clat+d),float(clng+d)],
				[float(clat-d),float(clng+d)],
				[float(clat-d),float(clng-d)],
				[float(clat+d),float(clng-d)],
				[float(clat+d),float(clng+d)]
			  ]
			];
		features.append(out)
	out={
       "type": "MultiPolygon",
       "coordinates": features}
	print(out)
	return out;

def calcroute(p1lat,p1lng,p2lat,p2lng):
	url = "https://api.openrouteservice.org/v2/directions/cycling-regular"

	body = {"coordinates":[[p1lat,p1lng],[p2lat,p2lng]], "elevation":"true", "extra_info":["steepness"],"geometry_simplify":"false","instructions":"true","instructions_format":"html","language":"pt","options":{'avoid_polygons':getexpandedareas(),"avoid_features":["ferries","steps","fords"],"profile_params":{"weightings":{"steepness_difficulty":1}}},"units":"m","continue_straight":"true","geometry":"true"}
	headers = {
	'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
	'Authorization': '5b3ce3597851110001cf6248b092059e58f0474c88618af7252a3db9'
	}
	# sending get request and saving the response as response object
	r = requests.post(url = url, json = body, headers=headers)
	print(r.json())
	geometry=r.json()['routes'][0]['geometry']
	routes=convert.decode_polyline(geometry, True)
	return routes

def decodeGeometryORS(encodedGeometry):
	length = len(encodedGeometry);
	ret=[]
	index = 0;
	lat = 0;
	lng = 0;
	ele = 0;

	while (index < length):
		print(index)
		result = 1;
		shift = 0;
		while True:
			b = ord(encodedGeometry[index]) - 63 - 1;
			index=index+1
			print(index)
			result += b << shift;
			shift += 5;
			if (b >= 0x1f):
				break;
		if (result & 1) != 0:
			lat+=~(result >> 1)
		else:
			lat += (result >> 1);
		result =1;
		shift = 0;
		while True:
			b = ord(encodedGeometry[index]) - 63 - 1;
			index=index+1
			print(index)
			result += b << shift;
			shift += 5;
			if (b >= 0x1f):
				break;
		if (result & 1) != 0:
			lng+=~(result >> 1)
		else:
			lng += (result >> 1);

		result = 1;
		shift = 0;
		while True:
			b = ord(encodedGeometry[index])- 63 - 1;
			index=index+1
			print(index)
			result += b << shift;
			shift += 5;
			if (b >= 0x1f):
				break;
		if (result & 1) != 0:
			ele+=~(result >> 1)
		else:
			ele += (result >> 1);
		ret.append({lat,lng,ele})
	return ret;

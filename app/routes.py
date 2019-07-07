from flask import render_template, request, redirect, url_for, send_from_directory, flash
from app.utils import *
@app.route('/')
@app.route('/index')
def index():
	ps=[]
	for p in Problema.query.filter():
		ps.append([p.lat,p.lng,p.description,p.gravidade])
	return render_template('index.html', latitude="-19.9194331", longitude="-44.0176182",problemas=ps)


@app.route('/build', methods=['GET', 'POST'])
def build():
	if(request.form['origem_lat'] and request.form['origem_lng'] and request.form['destino_lat'] and request.form['destino_lng']):
		olat=request.form['origem_lat'];
		olng=request.form['origem_lng'];
		dlat=request.form['destino_lat'];
		dlng=request.form['destino_lng'];
		route=calcroute(olng,olat,dlng,dlat)
		points=[]
		v=0;
		ps=[]
		for p in route['coordinates']:
			if v==0:
				v=1;
				latitude=p[1];
				longitude=p[0];
			points.append([p[0],p[1],p[2]])
		for p in Problema.query.filter():
			ps.append([p.lat,p.lng,p.description,p.gravidade])
		return render_template('result.html', latitude=latitude, longitude=longitude, latitudedest=dlat, longitudedest=dlng, points=points,problemas=ps);

@app.route('/serviceworker.js')
def static_from_root():
    return send_from_directory(app.static_folder, 'sw.js')

@app.route('/report', methods=['GET', 'POST'])
def report():
	lat=request.form['report_lat'];
	lng=request.form['report_lng'];
	return render_template('requester.html',lat=lat,lng=lng)

@app.route('/register', methods=['GET', 'POST'])
def register():
	lat=request.form['report_lat'];
	lng=request.form['report_lng'];
	gravidade=request.form['gravidade'];
	desc=request.form['desc'];
	p = Problema(lat, lng, desc, gravidade);
	db.session.add(p);
	db.session.commit();
	flash('Problema reportado com sucesso!','green')
	return redirect("/")

from flask import Flask
from flask_sqlalchemy import SQLAlchemy # sql operations
from flask_static_compress import FlaskStaticCompress
from flask_compress import Compress
import os

app = Flask(__name__)

from app import routes

compress = FlaskStaticCompress(app)
Compress(app)

app.secret_key = "123459243c6949d1ae119b8d212345"
app.config['SQLALCHEMY_DATABASE_URI']='postgres://postgres:123405@localhost/uber'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SERVER_NAME'] = 'passeaquiapp.com'

db=SQLAlchemy(app)

class Problema(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	lat = db.Column(db.Text)
	lng = db.Column(db.Text)
	description = db.Column(db.Text)
	gravidade =  db.Column(db.Integer)
	def __init__(self, lat, lng, description, gravidade):
		self.lat=lat
		self.lng=lng
		self.description = description
		self.gravidade=gravidade
	def __repr__(self):
		return '<Problema description:%r>' % self.description


db.create_all();

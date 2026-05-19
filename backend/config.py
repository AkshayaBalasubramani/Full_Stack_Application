from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#url to get it from a URL Communication of front end and backend

#initialize the allpication
app=Flask(__name__)

#wrap the application with CORS
CORS(app)

#storing the data in SQLite database
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///mydatabase.db'
#not track db modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False

#instance of the db - modify the databse using simple database operations
db=SQLAlchemy(app)
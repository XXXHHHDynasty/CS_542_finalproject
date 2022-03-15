from flask import Flask
from flask import request
from flask import Flask, request, render_template, flash, redirect, url_for, Response, send_file
#from werkzeug.utils import secure_filename
import os
from loguru import logger
import time
from shutil import copyfile
import psycopg2
from flask import jsonify
from flask_navigation import Navigation
from config import config



#### Set up nav menue ####
app = Flask(__name__)
app.config['DEBUG'] = True  # start debugging
app.secret_key = "super secret key"

nav = Navigation(app)

nav.Bar('top', [
    nav.Item('Home', 'home'),
    nav.Item('Profile', 'profile')
    
])

#### Home page ####
@app.route('/', methods=['GET','POST'])
def home():
    return render_template('index.html')

@app.route('/profile', methods=['GET'])
def profile():
    return render_template('profile.html')


#### Pull data from front end | store data in DB | send data back to frontend ####
@app.route('/data', methods=['POST', 'GET'])
def temp():
    data = request.get_data().decode("utf-8")
    if(data != ''):
        store_db(data)
    return data

# take user input and store in database
def store_db(data):
    conn = None
    try:
        # read connection parameters
        params = config()  # get DB info from config.py

        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**params)

        cur = conn.cursor()  # create a cursor
        cur.execute(f"INSERT INTO posts(post) VALUES ('{data}')")  # insert into DB
        conn.commit()
        conn.close()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        
    finally:
        if conn is not None:
            conn.close()
            print('Database connection closed, inserted successfully.')
    
@app.route('/data_front')
def send_data():
    params = config()  # get DB info from config.py
    conn = psycopg2.connect(**params)
    cur = conn.cursor()  # create a cursor
    cur.execute("SELECT * FROM POSTS")  # query DB 
    field_names = [i[0] for i in cur.description]
    result =  result = [dict(zip(field_names,row)) for row in cur.fetchall()]
    conn.close()
    return jsonify(result)





if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
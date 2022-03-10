from flask import Flask

from flask import Flask, request, render_template, flash, redirect, url_for, Response, send_file
#from werkzeug.utils import secure_filename
import os
from loguru import logger
import time
from shutil import copyfile
import psycopg2
from flask import jsonify
from flask_navigation import Navigation
# from config import config


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
@app.route('/index', methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/profile', methods=['GET'])
def profile():
    return render_template('profile.html')


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
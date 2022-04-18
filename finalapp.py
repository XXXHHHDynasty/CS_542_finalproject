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
import subprocess
import requests, json

#subprocess.check_call('npm start', shell=True)

text_psots = ''
text_comments = ''
while True:
    # POSTS
    url = requests.get("http://localhost:3000/posts")
    text_temp = url.text
    if text_psots != text_temp:
        text_psots = text_temp
        data = json.loads(text_psots)
        id = data[-1]["id"]
        title = data[-1]["title"]
        author = data[-1]["author"]
        msg = data[-1]["msg"]
        # discussion(id, title, author)

    # COMMENTS
    url = requests.get("http://localhost:3000/comments")
    text_temp_comments = url.text
    if text_comments != text_temp_comments:
        text_comments = text_temp_comments
        data = json.loads(text_comments)
        id = id = data[-1]["id"]
        post_id = data[-1]["postID"]
        body = data[-1]["body"]
        # comments(id, post_id, body)
    time.sleep(10)



#### Set up nav menue ####
# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# app.config['DEBUG'] = True  # start debugging
# app.secret_key = "super secret key"

# nav = Navigation(app)

# nav.Bar('top', [
#     nav.Item('Home', 'home'),
#     nav.Item('Profile', 'profile')
    
# ])

#### Home page ####
# @app.route('/', methods=['GET','POST'])
# def home():
#     return render_template('index.html')

# @app.route('/profile', methods=['GET'])
# def profile():
#     return render_template('profile.html')


#### Pull data from front end | store data in DB | send data back to frontend ####
# @app.route('/posts', methods=['POST', 'GET'])
# def temp():
#     data = request.get_data().decode("utf-8")
#     if(data != ''):
#         store_db(data)
#     return data

# take user input and store in database
# def store_db(data):
#     conn = None
#     try:
#         # read connection parameters
#         params = config()  # get DB info from config.py

#         # connect to the PostgreSQL server
#         print('Connecting to the PostgreSQL database...')
#         conn = psycopg2.connect(**params)

#         cur = conn.cursor()  # create a cursor
#         cur.execute(f"INSERT INTO posts(post) VALUES ('{data}')")  # insert into DB
#         conn.commit()
#         conn.close()

#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)
        
#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed, inserted successfully.')
    
# @app.route('/data_front')
# def send_data():
#     params = config()  # get DB info from config.py
#     conn = psycopg2.connect(**params)
#     cur = conn.cursor()  # create a cursor
#     cur.execute("SELECT * FROM POSTS")  # query DB 
#     field_names = [i[0] for i in cur.description]
#     result =  result = [dict(zip(field_names,row)) for row in cur.fetchall()]
#     conn.close()
#     return jsonify(result)

#@app.route('/posts', methods=['POST', 'GET'])
# def temp():
#     data = request.get_data().decode("utf-8")
#     if(data != ''):
#         store_db(data)
#     return data

# take user input and store in database
# def store_db(data):
#     conn = None
#     try:
#         # read connection parameters
#         params = config()  # get DB info from config.py

#         # connect to the PostgreSQL server
#         print('Connecting to the PostgreSQL database...')
#         conn = psycopg2.connect(**params)

#         cur = conn.cursor()  # create a cursor
#         cur.execute(f"INSERT INTO posts(post) VALUES ('{data}')")  # insert into DB
#         conn.commit()
#         conn.close()

#     except (Exception, psycopg2.DatabaseError) as error:
#         print(error)
        
#     finally:
#         if conn is not None:
#             conn.close()
#             print('Database connection closed, inserted successfully.')
    

def roles(id, role):
    # connect to DB
    cur.execute(f"insert into Roles values ({id}, {role})")

def accounts(email, pwd):
    cur.execute(f"insert into accounts values ({email}, {pwd})")

def authority(id, type):
    cur.execute(f"insert into authority values ({id}, {type})")

def roles_authority_relation(rid, aid):
    cur.execute(f"insert into Roles_authority_relation values ({rid}, {aid})")

def user(id, pic, uname, u_level, following, follower, age, u_location, pronouns):
    cur.execute(f"insert into user values ({id}, {pic}, {uname}, {u_level}, {following}, {follower}, {age}, {u_location}, {pronouns})")

def follow(id, followed_id):
    cur.execute(f"insert into follow values ({id}, {followed_id})")

def user_author_relations(id, auid):
    cur.execute(f"insert into User_authority_relations values ({id}, {auid})")

def system_message(id, date, content, uid):
    cur.execute(f"insert into system_message values ({id}, {date}, {content}, {uid})")

def feedback(fid, date, content, uid):
    cur.execute(f"insert into feedback values ({fid}, {date}, {content}, {uid})")

def announcement(id, date, content, uid):
    cur.execute(f"insert into feedback values ({id}, {date}, {content}, {uid})")

def server(id, name, privacy, u_id):
    cur.execute(f"insert into server values ({id}, {name}, {privacy}, {u_id})")

def participation(id, uid):
    cur.execute(f"insert into participation values ({id}, {uid})")

def subserver(id, name):
    cur.execute(f"insert into subserver values ({id}, {name})")

def discussion(id, dis_desp, title, likes, status, subid):
    cur.execute(f"insert into discussion values ({id}, {dis_desp}, {title}, {likes}, {status}, {subid})")

def save_discussion(id, uid):
    cur.execute(f"insert into save_discussion values ({id}, {uid})")

def subscribed_discussion(id, uid):
    cur.execute(f"insert into subscribed_discussion values ({id}, {uid})")

def report_discussion(id, uid):
    cur.execute(f"insert into report_discussion values ({id}, {uid})")

def comments(id, super, date, content, likes, status):
    cur.execute(f"insert into comments values ({id}, {super}, {date}, {content}, {likes}, {status})")

def saved_comments(id, uid):
    cur.execute(f"insert into saved_comments values ({id}, {uid})")

def reported_comments(id, uid):
    cur.execute(f"insert into reported_comments values ({id}, {uid})")

def received_comments(id, uid):
    cur.execute(f"insert into received_comments values ({id}, {uid})")




def get_data(tabel, col="*"):
    cur.execute(f"SELECT {col} FROM {tabel}")



# if __name__ == '__main__':
#     app.run(host='127.0.0.1', port=8080)
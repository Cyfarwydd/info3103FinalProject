#!/usr/bin/env python3

from flask import Flask, jsonify, abort, request, make_response, session
from flask_restful import Resource, Api, reqparse
from flask_session import Session
import pymysql.cursors
import json

from ldap3 import Server, Connection, ALL
from ldap3.core.exceptions import *

import cgitb
import cgi
import sys
cgitb.enable()

import settings #stored in settings.py
import ssl

app = Flask(__name__, static_url_path='/static')

app.secret_key = settings.SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'peanutButter'
app.config['SESSION_COOKIE_DOMAIN'] = settings.APP_HOST

api = Api(app)

Session(app)

###############################################################################
#Error handlers
#

@app.errorhandler(400)
def not_found(error):
	return make_response(jsonify( { "status": "Bad request" } ), 400)

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify( {"status": "File not found" }), 404)

@app.errorhandler(403)
def not_found(error):
	return make_response(jsonify( { "status": "Username already being used" } ), 403)

###############################################################################
#			static endpoints (for humans)
#

class Root(Resource):
	def get(self):
		return app.send_static_file('./index.html')

class SignIn(Resource):
	def post(self):
		if not request.json:
			abort(400)
		parser = reqparse.RequestParser()
		try:
			parser.add_argument('Username', type=str, required=True)
			parser.add_argument('Password', type=str, required=True)
			request_params = parser.parse_args()
		except:
			abort(400)
	
		#if they are logged in...
		if request_params['Username'] in session:
			response= {'status': 'success'}
			responseCode = 200
		else:
			try:
				ldapServer = Server(host=settings.LDAP_HOST)
				ldapConnection = Connection(ldapServer,
					raise_exceptions=True,
					user='uid='+request_params['Username'] + ', ou=People,ou=fcs,o=unb',			
					password = request_params['Password'])
				ldapConnection.open()
				ldapConnection.start_tls()
				ldapConnection.bind()
				session['username'] = request_params['Username']
				response = {'status': 'success'}
				responseCode = 201
			except(LDAPException):
				response = {'status': 'Access denied'}
				repsonseCode = 403
			finally:
				ldapConnection.unbind()
		return make_response(jsonify(response), responseCode)
					
	def get(self):
		if 'username' in session:
			response = {'status': 'success'}
			responseCode = 200
		else:
			response = {'status': 'fail'}
			responseCode = 403
		return make_response(jsonify(response), responseCode)
	
	def delete(self):
		success = False
		successCode = 400
		if 'username' in session:
			success = True
			successCode = 200
			session.clear()
		return make_response(jsonify({'success': success}), successCode)
		
class Users(Resource):
	def get(self):
		try:
			dbConnection = pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass = pymysql.cursors.DictCursor)
			sql = 'getUsers'
			cursor = dbConnection.cursor()
			cursor.callproc(sql)
			rows = cursor.fetchall()
		except:
			abort(403)	#access is forbidden
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({'users': rows}), 200)
	def post(self):
		if not request.json or not 'Username' in request.json:
			abort(401)	#a user is trying to make another user

		name = request.json['Username'];
		email = request.json['Email'];

		try:
			dbConnection = pymysql.connect(settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass=pymysql.cursors.DictCursor)

			sql = 'getUserByName'
			cursor = dbConnection.cursor()
			sqlArgs = (name,)
			cursor.callproc(sql, sqlArgs)
			row = cursor.fetchone()
			if row is not None:
				return make_response(jsonify( { "status": "Username already being used" } ), 418)
			else:
				sql = 'createUser'
				sqlArgs = (name, email)
				cursor.callproc(sql, sqlArgs)
				row = cursor.fetchone()
				dbConnection.commit()
				sql = 'getUserByName'
				cursor = dbConnection.cursor()
				sqlArgs = (name,)
				cursor.callproc(sql, sqlArgs)
				row = cursor.fetchone()

		except:
			abort(503)
		finally:
			cursor.close()
			dbConnection.close()
		uri = 'https://'+settings.APP_HOST+":"+str(settings.APP_PORT)
		uri = uri+str(request.url_rule)+'/'+str(row["UserID"])
		return make_response(jsonify( {"uri" : uri } ), 201)


class User(Resource):
	def get(self, userID):
		try:
			dbConnection = pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass= pymysql.cursors.DictCursor)
			sql='getUserByID'
			cursor = dbConnection.cursor()
			sqlArgs = (userID,)
			cursor.callproc(sql, sqlArgs)
			row = cursor.fetchone()
			if row is None:
				abort(400)
		except:
			abort(503)
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"user": row}), 201)

	def put(self,):

	##don't know what to put here yet
		return

	def delete(self, userID):
		try:
			dbConnection = pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass= pymysql.cursors.DictCursor)
			sql = 'deleteUser'
			cursor = dbConnection.cursor()
			sqlArgs = (userID, )
			cursor.callproc(sql, sqlArgs)
			dbConnection.commit()
		except:
			abort(503)
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({ "status": "Deletion successful" }), 200)


class Lists(Resource):
	def get(self, userID):
		try:
			dbConnection = pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass=pymysql.cursors.DictCursor)
			sql = 'getLists'
			sqlArgs = (userID,)
			cursor = dbConnection.cursor()
			cursor.callproc(sql, sqlArgs)
			rows = cursor.fetchall()
			if row is None:
				abort(404)
		except:
			abort(500)
		finally:
			cursor.close()
			dbConnection.close
		return make_response(jsonify({'lists': rows}), 200)
	def post(self, userID, listName):
		if not request.json or not 'listName' in request.json:
			abort(400)

		listName = request.json['listName'];

		try:
			dbConnection = pymysql.connect(settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass= pymysql.cursors.DictCursor)
			sql = 'postList'
			cursor = dbConnection.cursor()
			sqlArgs = (userID, listName)
			cursor.callproc(sql, sqlArgs)
			row = cursor.fetchone()
			dbConnection.commit()
		except:
			abort(503)
		finally:
			cursor.close()
			dbConnection.close()

		uri = 'http://'+settings.APP_HOST+':'+str(settings.APP_PORT)
		uri = uri+str(request.url_rule)+'/'+str(row['LAST_INSERT_ID()'])
		return make_response(jsonify( { "uri": uri } ), 201)


class List(Resource):
	def get(self, userID, listID):
		try:
			dbConnection = pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset = 'utf8mb4',
				cursorclass = pymysql.cursors.DictCursor)
			sql = 'getListByID'
			cursor = dbConnection.cursor()
			sqlArgs = (userID, listID,)
			cursor.callproc(sql, sqlArgs)
			row = cursor.fetchone()
			if row is None:
				abort(404)
		except:
			abort(500)
		finally:
			cursor.close()
			dbConnection.close()
		return make_response(jsonify({"list": row}), 200)

	def put():
		##TODO
		return

	def delete(self, userID, listID):
		try:
			dbConnection = pymysql.connect(
				settings.DB_HOST,
				settings.DB_USER,
				settings.DB_PASSWD,
				settings.DB_DATABASE,
				charset='utf8mb4',
				cursorclass = pymysql.cursors.DictCursor)
			sql = 'deleteList'
			cursor = dbConnection.cursor()
			sqlArgs = (userID, listID,)
			cursor.callproc(sql, sqlArgs)
			dbConnection.commit()
		except:
			abort(503)
		finally:
			cursor.close()
			dbConnection.close()

		return make_response(jsonify(), 200)

###############################################################################
#			Adding resources
#
api.add_resource(Root,'/')
api.add_resource(SignIn, '/signin')
api.add_resource(Users, '/users')
api.add_resource(User, '/users/<string:userID>')
api.add_resource(Lists, '/user/<string:userID>/lists')
api.add_resource(List, '/users/<string:userID>/lists/<int:listID>')


###############################################################################
#			Starting
#

if __name__ == "__main__":
	context = ('cert.pem', 'key.pem')
	app.run(
		host=settings.APP_HOST,
		port=settings.APP_PORT,
		ssl_context=context,
		debug=settings.APP_DEBUG
	)

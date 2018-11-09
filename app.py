#!/usr/bin/env python3

from flask import Flask, jsonify, abort, request, make_response
from flask_restful import Resource, Api, reqparse
import pymysql.cursors
import json

import cgitb
import cgi
import sys
cgitb.enable()

import settings #stored in settings.py
import ssl

app = Flask(__name__, static_url_path='/static')
api = Api(app)

##
#Error handlers
##

@app.errorhandler(400)
def not_found(error):
	return make_response(jsonify( { "status": "Bad request" } ), 400)

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify( {"status": "File not found" }), 404)

@app.errorhandler(403)
def not_found(error):
	return make_response(jsonify( { "status": "Username already being used" } ), 403)

##
#static endpoints (for humans)
##

class Root(Resource):
	def get(self):
		return app.send_static_file('index.html')

api.add_resource(Root,'/')

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

api.add_resource(Users, '/users')

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
		return make_response(jsonify(), 200)

api.add_resource(User, '/users/<string:userID>')

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

api.add_resource(Lists, '/user/<string:userID>/lists')

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

api.add_resource(List, '/users/<string:userID>/lists/<int:listID>')

if __name__ == "__main__":
	context = ('cert.pem', 'key.pem')
	app.run(
		host=settings.APP_HOST,
		port=settings.APP_PORT,
		ssl_context=context,
		debug=settings.APP_DEBUG
	)

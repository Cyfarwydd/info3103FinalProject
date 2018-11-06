#!/usr/bin/env python3
import sys
from flask 		import Flask, jsonify, abort, request, make_response, session
from flask_restful	import reqparse, Resource, Api
from flask_session 	import Session
import json
from ldap3 import Server, Connection, ALL
import settings 

app = Flask(__name__)

app.secret_key = settings.SECRET_KEY
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'peanutButter'
app.config['SESSION_COOKIE_DOMAIN'] = settings.APP_HOST
Session(app)

####
#err handles
###

@app.errorhandler(400)
def not_found(error):
	return make_response(jsonify( {'status': 'Bad request' } ), 400)

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify( {'status': 'Resource not found' } ), 404)

######
#Signin class
#####

class SignIn(Resource):
	#sample curl to log in:
	#curl -i -H "Content-Type: application/json" -X POST -d '{"username": "nicdm", "password", "wo*ps" }' -c cookie-jar https://info3103.cs.unb.ca:60513/signin
	#

	def post(self):
		if not request.json:
			abort(400)

		parser = reqparse.RequestParser()
		try: 
			parser.add_argument('username', type=str, required=True)
			parser.add_argument('password', type=str, required=True)
			params = parser.parse_args()

		except:
			abort(400)

		#if they're already logged in
		
		if params['username'] in session:
			ret = {'status': 'success'}
			retCode = 200
		else:
			try:

				ldapServer = Server(host=settings.LDAP_HOST)
				ldapConnection = Connection(ldapServer, 
					raise_exceptions = True,
					user='uid='+params['username']+', ou=People, ou=fcs, o-unb',
					password = params['password'])
				ldapConnection.open()
				ldapConnection.start_tls()
				ldapConnection.bind()
				##now successfully authenticated
				session['username'] = params['username']
				ret = {'status': 'success'}
				retCode = 201
			except (LDAPException, error_message):
				ret = {'status': 'Access denied'}
				retCode = 403
			finally:
				ldapConnection.unbind()

		return make_response(jsonify(ret), retCode)

	#sample curl to check for login
	#curl -i -H "Content-Type: application/json" -X GET -b cookie-jar https://info3103.cs.unb.ca:60513/signin
	def get(self):
		if 'username' in session:
			ret = {'status': 'success'}
			retCode = 200
		else:
			ret = {'status': 'fail'}
			retCode = 403
		return make_response(jsonify(ret), retCode)

	#sample curl to logout/delete a session
	#curl -i -H "Content-Type: application/json" -X DELETE -b cookie-jar https://info3103.cs.unb.ca:60513/signin
	def delete(self):
		if 'username' in session:
		
			try:
				session.clear()
				ret = {'status': 'success'}
				retCode = 200
			except (error_message):
				ret = {'status': 'Logout Failed'}
				retCode = 400
		else:
			ret = {'status': 'fail'}
			retCode = 403
		return make_response(jsonify(ret), retCode)
#####
#Endpoint creation
#####

api = Api(app)
api.add_resource(SignIn, '/signin')


#####
#Launcher - nic port = 60513
#####
if __name__ == "__main__":
	context = ('cert.pem', 'key.pem')
	app.run(host=settings.APP_HOST, port=settings.APP_PORT, ssl_context = context, debug=settings.APP_DEBUG)

from flask import Flask
import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS
import os


from controllers.profile import profile_blueprint

app = Flask(__name__)
CORS(app) 


cred = credentials.Certificate('./auth.json')

firebase_admin.initialize_app(cred)

app.register_blueprint(profile_blueprint, url_prefix = '/profile')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
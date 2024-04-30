from flask import Flask
from controllers.profile import profile_blueprint
from controllers.selling import selling_blueprint
from controllers.buying import buying_blueprint
from controllers.trading import trading_blueprint
from controllers.checkout import checkout_blueprint
from controllers.sneakers import sneakers_blueprint
from controllers.homepage import homepage_blueprint


import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS
import os


from controllers.profile import profile_blueprint

app = Flask(__name__)
CORS(app) 


cred = credentials.Certificate('./auth.json')

firebase_admin.initialize_app(cred)

app.register_blueprint(profile_blueprint, url_prefix='/profile')
app.register_blueprint(selling_blueprint, url_prefix='/selling')
app.register_blueprint(buying_blueprint, url_prefix='/buying')
app.register_blueprint(trading_blueprint, url_prefix='/trading')
app.register_blueprint(checkout_blueprint, url_prefix='/checkout')
app.register_blueprint(sneakers_blueprint, url_prefix='/sneakers')
app.register_blueprint(homepage_blueprint, url_prefix='/')

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
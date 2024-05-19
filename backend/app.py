from flask import Flask
from controllers.data_fetch import data_retrieval
from controllers.document_fetch import document_retrieval
from controllers.document_creation import document_creation_blueprint
from controllers.document_modification import document_modification_blueprint
from controllers.document_deletion import document_deletion_blueprint
from controllers.checkout import checkout_blueprint

from controllers.profile import profile_blueprint

from controllers.sneakers import sneakers_blueprint
from controllers.homepage import homepage_blueprint
from controllers.openai import shoe_details_blueprint



import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS
import os
from dotenv import load_dotenv
load_dotenv()



app = Flask(__name__)
CORS(app) 


cred = credentials.Certificate('./auth.json')

firebase_admin.initialize_app(cred)
app.register_blueprint(data_retrieval, url_prefix='/data_retrieval')
app.register_blueprint(document_retrieval, url_prefix='/document_retrieval')
app.register_blueprint(document_creation_blueprint, url_prefix='/document_creation')
app.register_blueprint(document_modification_blueprint, url_prefix='/document_modification')
app.register_blueprint(document_deletion_blueprint, url_prefix='/document_deletion')

app.register_blueprint(checkout_blueprint, url_prefix='/checkout')

app.register_blueprint(profile_blueprint, url_prefix='/profile')
#app.register_blueprint(homepage_blueprint, url_prefix='/')

app.register_blueprint(sneakers_blueprint, url_prefix='/sneakers')
app.register_blueprint(homepage_blueprint, url_prefix='/')
app.register_blueprint(shoe_details_blueprint, url_prefix='/shoegpt')


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
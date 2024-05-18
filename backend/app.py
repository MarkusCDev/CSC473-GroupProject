from flask import Flask
from controllers.data_fetch import buying_blueprint
from controllers.document_creation import document_creation_blueprint
from controllers.document_modification import document_modification_blueprint
from controllers.document_deletion import document_deletion_blueprint

import firebase_admin
from firebase_admin import credentials
from flask_cors import CORS
import os



app = Flask(__name__)
CORS(app) 


cred = credentials.Certificate('./auth.json')

firebase_admin.initialize_app(cred)
app.register_blueprint(buying_blueprint, url_prefix='/buying')
app.register_blueprint(document_creation_blueprint, url_prefix='/document_creation')
app.register_blueprint(document_modification_blueprint, url_prefix='/document_modification')
app.register_blueprint(document_deletion_blueprint, url_prefix='/document_deletion')


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
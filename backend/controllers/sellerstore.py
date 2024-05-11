from flask import Blueprint, request, jsonify
from models.sellerstore import fetch_sneakers

sellerstore_blueprint = Blueprint('sellerstore', __name__)

@sellerstore_blueprint.route('/fetch_sneakers', methods=['GET'])
def get_sneakers():
    sneakers_for_sale = fetch_sneakers()
    return jsonify({"sneakers for sale": sneakers_for_sale})

from flask import Blueprint, request, jsonify
from models.selling import create_sneaker_listing

selling_blueprint = Blueprint('selling', __name__)

@selling_blueprint.route('/list_sneaker', methods=['POST'])
def list_sneaker():
    user_id = request.headers.get('Authorization')
    sneaker_details = request.get_json()
    
    create_sneaker_listing(user_id, sneaker_details)
    
    return jsonify({"message": "Sneaker listed successfully"})

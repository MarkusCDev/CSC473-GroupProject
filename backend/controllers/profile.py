from flask import Blueprint, jsonify, request
from models.profile import create_user_profile, fetch_user_profile, update_user_profile, update_user_store, update_user_cart, fetch_shoe_names

profile_blueprint = Blueprint('profile', __name__)

@profile_blueprint.route('/create_profile', methods=['POST'])
def create_profile():
    user_id = request.headers.get('Authorization')
    profile_fields = request.get_json()
    
    create_user_profile(user_id, profile_fields)
    
    return jsonify({"message": "Profile created successfully"})

@profile_blueprint.route('/get_profile', methods=['GET'])
def get_profile():
    user_id = request.headers.get('Authorization')

    user_profile_fields = fetch_user_profile(user_id)

    if user_profile_fields:
        return jsonify(user_profile_fields)
    else:
        return jsonify({"error": "User profile not found"}), 404
    
@profile_blueprint.route('/update_profile', methods=['POST'])
def update_profile():
    user_id = request.headers.get('Authorization')
    profile_fields = request.get_json()

    update_user_profile(user_id, profile_fields)

    return jsonify({"message": "Profile updated successfully"})
    
@profile_blueprint.route('/add_to_store', methods=['POST'])
def add_to_store():
    data = request.get_json()
    user_id = data.get('user_id')
    new_item = data.get('new_item')

    if not user_id or not new_item:
        return jsonify({"message": "User ID and new item must be provided"}), 400

    try:
        update_user_store(user_id, new_item)
        return jsonify({"message": "Store updated successfully"})
    except Exception as e:
        print(f"Error updating store: {e}") 
        return jsonify({"message": "Failed to update store"}), 400
    
@profile_blueprint.route('/add_to_cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    new_item = data.get('new_item')

    if not user_id or not new_item:
        return jsonify({"message": "User ID and new item must be provided"}), 400

    try:
        update_user_cart(user_id, new_item)
        return jsonify({"message": "Cart updated successfully"})
    except Exception as e:
        print(f"Error updating store: {e}") 
        return jsonify({"message": "Failed to update Cart"}), 400

@profile_blueprint.route('/get_shoe_names', methods=['GET'])
def get_shoe_names():
    try:
        shoe_names = fetch_shoe_names()
        return jsonify(shoe_names)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

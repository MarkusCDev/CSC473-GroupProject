from flask import Blueprint, request, jsonify
from models.checkout import update_buy_sell_transaction

checkout_blueprint = Blueprint('checkout', __name__)

@checkout_blueprint.route('/transact', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    user_id = data.get('user_id')
    new_item = data.get('new_item')

    if not user_id or not new_item:
        return jsonify({"message": "User ID and new item must be provided"}), 400

    try:
        update_buy_sell_transaction(user_id, new_item)
        return jsonify({"message": "Transactions updated successfully"})
    except Exception as e:
        print(f"Error updating store: {e}") 
        return jsonify({"message": "Failed to update Transactions"}), 400
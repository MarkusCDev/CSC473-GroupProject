from flask import Blueprint, request, jsonify
from models.checkout import process_order

checkout_blueprint = Blueprint('checkout', __name__)

@checkout_blueprint.route('/process_order', methods=['POST'])
def checkout():
    order_details = request.get_json()
    payment_confirmation = process_order(order_details)
    return jsonify({"status": "success", "message": "Order processed", "details": payment_confirmation})

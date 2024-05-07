from flask import Blueprint, request, jsonify
from models.sneakers import get_sneaker_details, process_purchase, update_bid, initiate_trade

sneakers_blueprint = Blueprint('sneakers', __name__)

@sneakers_blueprint.route('/info/<string:sneaker_id>', methods=['GET'])
def sneaker_details(sneaker_id):
    sneaker = get_sneaker_details(sneaker_id)
    if sneaker:
        return jsonify({"sneaker_details": sneaker})
    return jsonify({'error': 'Sneaker not found'}), 404


@sneakers_blueprint.route('/purchase/<int:sneaker_id>', methods=['POST'])
def purchase(sneaker_id):
    if process_purchase(sneaker_id):
        return jsonify({'message': 'Purchase successful'})
    return jsonify({'error': 'Purchase failed'}), 400

@sneakers_blueprint.route('/bid/<int:sneaker_id>', methods=['POST'])
def bid(sneaker_id):
    bid_amount = request.json.get('bid')
    if update_bid(sneaker_id, bid_amount):
        return jsonify({'message': 'Bid successful'})
    return jsonify({'error': 'Bid failed'}), 400

@sneakers_blueprint.route('/trade/<int:sneaker_id>', methods=['POST'])
def trade(sneaker_id):
    trade_details = request.json.get('details')
    if initiate_trade(sneaker_id, trade_details):
        return jsonify({'message': 'Trade proposal sent'})
    return jsonify({'error': 'Trade proposal failed'}), 400

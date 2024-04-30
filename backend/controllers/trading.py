from flask import Blueprint, request, jsonify
from models.trading import list_trade, fetch_trades

trading_blueprint = Blueprint('trading', __name__)

@trading_blueprint.route('/list_trade', methods=['POST'])
def post_trade():
    user_id = request.headers.get('Authorization')
    trade_details = request.get_json()
    list_trade(user_id, trade_details)
    return jsonify({"message": "Trade listed successfully"})

@trading_blueprint.route('/fetch_trades', methods=['GET'])
def get_trades():
    trades = fetch_trades()
    return jsonify({"trades": trades})

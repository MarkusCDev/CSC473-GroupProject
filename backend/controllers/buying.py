from flask import Blueprint, request, jsonify
from models.buying import fetch_sneakers

buying_blueprint = Blueprint('buying', __name__)

@buying_blueprint.route('/fetch_sneakers', methods=['GET'])
def get_sneakers():
    brand = request.args.get('brand', '')
    size = request.args.get('sizes', '')
    min_price = request.args.get('min_price')
    max_price = request.args.get('max_price')

    filters = {}
    if brand:
        filters['brand'] = brand
    if size:
        filters['sizes'] = size
    if min_price:
        filters['min_price'] = min_price
    if max_price:
        filters['max_price'] = max_price

    sneakers = fetch_sneakers(filters)
    return jsonify({"sneakers": sneakers})

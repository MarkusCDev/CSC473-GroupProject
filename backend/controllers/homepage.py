from flask import Blueprint, jsonify
from models.homepage import fetch_featured_sneakers

homepage_blueprint = Blueprint('homepage', __name__)

@homepage_blueprint.route('/featured', methods=['GET'])
def featured():
    featured_items = fetch_featured_sneakers()
    return jsonify({"featured_sneakers": featured_items})

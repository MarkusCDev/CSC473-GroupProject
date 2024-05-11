from flask import Blueprint, request, jsonify
from models.auction import Sneaker, sneaker_listing
from firebase_admin import storage

auction_blueprint = Blueprint('auction', __name__)

@auction_blueprint.route('/list_sneaker', methods=['POST'])
def list_sneaker():
    try:
        title = request.form['title']
        description = request.form['description']
        shoe_size = request.form['shoe_size']
        condition = request.form['condition']
        minimum_starting_bid = request.form['minimum_starting_bid']
        buy_now_price = request.form['buy_now_price']

        photos = []
        photo_files = request.files.getlist('photos')
        bucket = storage.bucket()
        
        for photo in photo_files:
            blob = bucket.blob('Auctioning/' + photo.filename)  
            blob.upload_from_file(photo, content_type=photo.content_type)
            photo_url = blob.public_url 
            photos.append(photo_url)

        sneaker = Sneaker(title, description, shoe_size, condition, minimum_starting_bid, buy_now_price, photos)
        sneaker_listing(sneaker)

        return jsonify({"success": True, "message": "Sneaker listed successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 400

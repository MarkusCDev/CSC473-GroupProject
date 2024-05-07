from firebase_admin import firestore

def create_sneaker_listing(user_id, sneaker_details):
    db = firestore.client()
    user_sneakers_ref = db.collection('Users').document(user_id).collection('Listings')
    user_sneakers_ref.add(sneaker_details)

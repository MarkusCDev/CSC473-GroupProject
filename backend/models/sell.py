from firebase_admin import firestore

class Sneaker:
    def __init__(self, title, description, shoe_size, condition, price, photos):
        self.title = title
        self.description = description
        self.shoe_size = shoe_size
        self.condition = condition
        self.price = price
        self.photos = photos

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "shoe_size": self.shoe_size,
            "condition": self.condition,
            "price": self.price,
            "photos": self.photos
        }

def sneaker_listing(sneaker):
    sneakers_for_sale_collection = firestore.client().collection('Selling')
    sneakers_for_sale_collection.add(sneaker.to_dict())

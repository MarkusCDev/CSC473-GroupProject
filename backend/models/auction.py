from firebase_admin import firestore

class Sneaker:
    def __init__(self, title, description, shoe_size, condition, minimum_starting_bid, buy_now_price, photos):
        self.title = title
        self.description = description
        self.shoe_size = shoe_size
        self.condition = condition
        self.minimum_starting_bid = minimum_starting_bid
        self.buy_now_price = buy_now_price
        self.photos = photos

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "shoe_size": self.shoe_size,
            "condition": self.condition,
            "minimum_starting_bid": self.minimum_starting_bid,
            "buy_now_price": self.buy_now_price,
            "photos": self.photos
        }

def sneaker_listing(sneaker):
    sneakers_for_auction_collection = firestore.client().collection('Auctioning')
    sneakers_for_auction_collection.add(sneaker.to_dict())

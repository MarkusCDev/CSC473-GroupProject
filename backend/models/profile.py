from firebase_admin import firestore


def create_user_profile(user_id, profile_fields):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_profile_ref.set(profile_fields, merge=True)

def fetch_user_profile(user_id):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_snapshot = user_profile_ref.get()

    if user_snapshot.exists:
        fields_to_retrieve = ['email', 'first_name', 'last_name', 'address', 'city',
            'state', 'zipcode', 'phone', 'gender', 'size', 'pfp', 'card', 'cart']
        user_profile_fields = {field: user_snapshot.get(field) if user_snapshot.get(field) is not None else '' for field in fields_to_retrieve}
        return user_profile_fields
    else:
        return None
    
def update_user_profile(user_id, profile_fields):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_profile_ref.update(profile_fields)

def update_user_store(user_id, new_item):
    try:
        user_profile_ref = firestore.client().collection('Users').document(user_id)
        print(f"Updating store for user: {user_id} with item: {new_item}")  # Log user_id and new_item
        user_profile_ref.update({
            'store': firestore.ArrayUnion([new_item])
        })
        print("Store updated successfully")  # Log successful update
    except Exception as e:
        print(f"Error updating store for user {user_id} with item {new_item}: {e}")  # Log detailed error
        raise  # Re-raise the exception to be caught by the route handler

def update_user_cart(user_id, new_item):
    try:
        user_profile_ref = firestore.client().collection('Users').document(user_id)
        print(f"Updating cart for user: {user_id} with item: {new_item}")  # Log user_id and new_item
        user_profile_ref.update({
            'cart': firestore.ArrayUnion([new_item])
        })
        print("Cart updated successfully")  # Log successful update
    except Exception as e:
        print(f"Error updating cart for user {user_id} with item {new_item}: {e}")  # Log detailed error
        raise  # Re-raise the exception to be caught by the route handler

def fetch_shoe_names():
    collections = ['Selling', 'Trading', 'Auctioning']
    shoe_names = []

    for collection in collections:
        collection_ref = firestore.client().collection(collection)
        docs = collection_ref.stream()

        for doc in docs:
            shoe_name = doc.get('shoe_name')
            if shoe_name:
                shoe_names.append(shoe_name)

    return shoe_names

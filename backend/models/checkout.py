from firebase_admin import firestore

def update_buy_sell_transaction(user_id, new_item):
    try:
        user_profile_ref = firestore.client().collection('Users').document(user_id)
        print(f"Updating Transaction for user: {user_id} with item: {new_item}")
        user_profile_ref.update({
            'transactions': firestore.ArrayUnion([new_item])
        })
        print("Transactions updated successfully")
    except Exception as e:
        print(f"Error updating transactions for user {user_id} with item {new_item}: {e}")
        raise
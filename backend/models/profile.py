from firebase_admin import firestore

def create_user_profile(user_id, profile_fields):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_profile_ref.set(profile_fields, merge=True)

def fetch_user_profile(user_id):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_snapshot = user_profile_ref.get()

    if user_snapshot.exists:
        fields_to_retrieve = ['email', 'first_name', 'last_name', 'address', 'city',
            'state', 'zipcode', 'phone', 'gender', 'size', 'pfp', 'card']
        user_profile_fields = {field: user_snapshot.get(field) if user_snapshot.get(field) is not None else '' for field in fields_to_retrieve}
        return user_profile_fields
    else:
        return None
    
def update_user_profile(user_id, profile_fields):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_profile_ref.update(profile_fields)
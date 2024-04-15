from firebase_admin import firestore

def create_user_profile(user_id, profile_fields):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_profile_ref.set(profile_fields)

def fetch_user_profile(user_id):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_snapshot = user_profile_ref.get()

    if user_snapshot.exists:
        fields_to_retrieve = ['email']
        user_profile_fields = {field: user_snapshot.get(field) for field in fields_to_retrieve}
        return user_profile_fields
    else:
        return None
    
def update_user_profile(user_id, profile_fields):
    user_profile_ref = firestore.client().collection('Users').document(user_id)
    user_profile_ref.update(profile_fields)
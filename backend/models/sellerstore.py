from firebase_admin import firestore

def fetch_sneakers():
    sneakers_ref = firestore.client().collection('Selling')
    results = sneakers_ref.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in results]

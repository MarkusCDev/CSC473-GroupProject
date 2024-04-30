from firebase_admin import firestore

def fetch_featured_sneakers():
    db = firestore.client()
    sneakers_ref = db.collection('Sneakers').where("is_featured", "==", True)
    results = sneakers_ref.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in results]

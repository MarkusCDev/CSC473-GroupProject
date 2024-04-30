from firebase_admin import firestore

def fetch_sneakers(filters):
    db = firestore.client()
    sneakers_ref = db.collection('Sneakers')
    query = sneakers_ref
    for field, value in filters.items():
        if value:
            if field == 'brand':
                query = query.where("brand_substrings", "array_contains", value.lower())
            elif field == 'sizes':
                query = query.where(field, 'array_contains', int(value))
            elif field == 'min_price':
                query = query.where('price', '>=', float(value))
            elif field == 'max_price':
                query = query.where('price', '<=', float(value))
            else:
                query = query.where(field, '==', value.lower())
    results = query.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in results]

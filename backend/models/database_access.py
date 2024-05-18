from firebase_admin import firestore

def get_firestore_client():
    """Get the Firestore client initialized in app.py."""
    return firestore.client()

def fetch_from_collection(collection_name, filters=None):
    """
    Fetch documents from a specified Firestore collection with optional filters.
    
    Args:
        collection_name (str): The name of the Firestore collection.
        filters (dict, optional): Dictionary of field-value pairs to filter the documents.

    Returns:
        list: A list of dictionaries representing the documents in the collection.
    """
    db = get_firestore_client()
    if filters is None:
        filters = {}

    collection_ref = db.collection(collection_name)
    query = collection_ref

    for key, value in filters.items():
        query = query.where(key, '==', value)

    docs = query.stream()
    result = [doc.to_dict() for doc in docs]
    return result

def add_to_collection(collection_name, document_data):
    """
    Add a document to a specified Firestore collection.
    
    Args:
        collection_name (str): The name of the Firestore collection.
        document_data (dict): The data to be added as a document in the collection.
    
    Returns:
        None
    """
    db = get_firestore_client()
    collection_ref = db.collection(collection_name)
    collection_ref.add(document_data)

def update_document(collection_name, document_id, update_data):
    """
    Update a document in a specified Firestore collection.
    
    Args:
        collection_name (str): The name of the Firestore collection.
        document_id (str): The ID of the document to be updated.
        update_data (dict): The data to update in the document.
    
    Returns:
        None
    """
    db = get_firestore_client()
    document_ref = db.collection(collection_name).document(document_id)
    document_ref.update(update_data)

def delete_document(collection_name, document_id):
    """
    Delete a document from a specified Firestore collection.
    
    Args:
        collection_name (str): The name of the Firestore collection.
        document_id (str): The ID of the document to be deleted.
    
    Returns:
        None
    """
    db = get_firestore_client()
    document_ref = db.collection(collection_name).document(document_id)
    document_ref.delete()

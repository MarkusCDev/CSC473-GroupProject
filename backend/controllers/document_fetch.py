from flask import Blueprint, request, jsonify
from models.database_access import fetch_document_by_id

document_retrieval = Blueprint('fetch_document', __name__)


@document_retrieval.route('/fetch_document', methods=['POST'])
def get_document():
    '''
    Endpoint to fetch a single document from a specified Firestore collection by document ID.
    
    Expects a JSON body with 'collection' and 'document_id' keys.
    
    http://127.0.0.1:5000/buying/fetch_document

    Example JSON Body:
    {
        "collection": "Sneakers",
        "document_id": "abc123"
    }

    Returns:
        JSON response containing the fetched document or an error message.
    '''
    data = request.get_json()
    if not data or 'collection' not in data or 'document_id' not in data:
        return jsonify({"error": "Collection name and document ID are required"}), 400

    collection = data['collection']
    document_id = data['document_id']

    try:
        # Fetch the document from the specified collection by ID
        fetched_document = fetch_document_by_id(collection, document_id)
        if not fetched_document:
            return jsonify({"error": "Document not found"}), 404
        return jsonify({"data": fetched_document})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
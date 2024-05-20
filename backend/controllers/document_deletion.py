from flask import Blueprint, request, jsonify
from models.database_access import delete_document

document_deletion_blueprint = Blueprint('document_deletion', __name__)

@document_deletion_blueprint.route('/delete_document', methods=['POST'])
def delete_document_route():
    """
    Endpoint to delete a document from a specified Firestore collection.
    
    Expects a JSON body with at least 'collection' and 'document_id'.
    
    http://127.0.0.1:5000/document_deletion/delete_document
        
    Example JSON Body:
    {
        "collection": "Sneakers",
        "document_id": "abcd1234"
    }

    Returns:
        JSON response indicating success or failure of the document deletion.
    """
    data = request.get_json()
    if not data or 'collection' not in data or 'document_id' not in data:
        return jsonify({"error": "Collection name and document ID are required"}), 400
    
    # Extract the collection name and document ID from the request JSON
    collection = data['collection']
    document_id = data['document_id']

    try:
        # Delete the document from the specified collection
        delete_document(collection, document_id)
        return jsonify({"message": "Document deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

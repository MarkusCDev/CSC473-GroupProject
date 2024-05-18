from flask import Blueprint, request, jsonify
from models.database_access import update_document

document_modification_blueprint = Blueprint('document_modification', __name__)

@document_modification_blueprint.route('/modify_document', methods=['POST'])
def modify_document():
    """
    Endpoint to modify a document in a specified Firestore collection.
    
    Expects a JSON body with at least 'collection', 'document_id', and the fields to be updated.
    
    Example JSON Body:
    {
        "collection": "Sneakers",
        "document_id": "sOTMr22H7aiMDmRpH8sj",
        "brand": "Adidas",
        "color": "UltraBoost",
        "size": "11"
    }

    Returns:
        JSON response indicating success or failure of the document modification.
    """
    data = request.get_json()
    if not data or 'collection' not in data or 'document_id' not in data:
        return jsonify({"error": "Collection name and document ID are required"}), 400
    
    # Extract the collection name, document ID, and update data from the request JSON
    collection = data.pop('collection')
    document_id = data.pop('document_id')
    update_data = data

    try:
        # Update the document in the specified collection
        update_document(collection, document_id, update_data)
        return jsonify({"message": "Document modified successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

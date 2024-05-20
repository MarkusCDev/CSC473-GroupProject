from flask import Blueprint, request, jsonify
from models.database_access import add_to_collection

document_creation_blueprint = Blueprint('document_creation', __name__)

@document_creation_blueprint.route('/create_document', methods=['POST'])
def create_document():
    """
    Endpoint to create a document in a specified Firestore collection.
    
    Expects a JSON body with at least a 'collection' key indicating the collection name.
    All other keys in the JSON body are treated as the document data to be added to the collection.
    
    http://127.0.0.1:5000/document_creation/create_document
    
    Example JSON Body:
    {
        "collection": "Sneakers",
        "brand": "Nike",
        "size": "10",
        "color": "Red"
    }

    or

    {
        "collection": "Sneakers",
        "brand": "Adidas",
        "model": "UltraBoost"
    }

    Returns:
        JSON response indicating success or failure of the document creation.
    """
    data = request.get_json()
    if not data or 'collection' not in data:
        return jsonify({"error": "Collection name is required"}), 400
    
    # Extract the collection name and document data from the request JSON
    collection = data.pop('collection')
    document_data = data

    try:
        # Add the document to the specified collection
        add_to_collection(collection, document_data)
        return jsonify({"message": "Document created successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

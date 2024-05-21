from flask import Blueprint, request, jsonify
from models.database_access import fetch_from_collection, fetch_document_by_id

data_retrieval = Blueprint('fetch_data', __name__)

@data_retrieval.route('/fetch_data', methods=['POST'])
def get_data():
    '''
    Endpoint to fetch documents from a specified Firestore collection with optional filters.
    
    Expects a JSON body with at least a 'collection' key indicating the collection name.
    All other keys in the JSON body are treated as filters to apply when fetching the documents.
    
    https://testingbaka-e2agf6geqq-ue.a.run.app/data_retrieval/fetch_data

    Example JSON Body:
    {
        "collection": "Sneakers",
        "brand": "Nike",
        "size": "10"
    }

    or

    {
        "collection": "Sneakers"
    }

    Returns:
        JSON response containing the fetched data or an error message.
    '''
    data = request.get_json()
    if not data or 'collection' not in data:
        return jsonify({"error": "Collection name is required"}), 400

    # Extract the collection name and filters from the request JSON
    collection = data['collection']
    filters = {key: value for key, value in data.items() if key != 'collection'}

    try:
        # Fetch the data from the specified collection with the provided filters
        fetched_data = fetch_from_collection(collection, filters)
        return jsonify({"data": fetched_data})
    except Exception as e:
        return jsonify({"error": str(e)}), 500



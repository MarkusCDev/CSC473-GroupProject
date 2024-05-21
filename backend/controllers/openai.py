from flask import Blueprint, jsonify, request
from models.openai import ShoeBot


shoe_details_blueprint = Blueprint('shoegpt', __name__)

@shoe_details_blueprint.route('/gendata',methods = ["POST"])
def fetch_shoe_details():
    chatgpt = ShoeBot()
    data = request.get_json()

    shoe_name = data.get('shoe_name')
    year = data.get('year')
    color = data.get('color')

    # if ((shoe_name and year) or (shoe_name and color) or (year and color)):
    #     return jsonify({'error': 'Atleast two parameters need to be filled.'}), 400
    
    shoe_genereted_data = chatgpt.fill_shoe_details(shoe_name, year, color)

    openai_output = jsonify(shoe_genereted_data)
    print(openai_output)
    
    return openai_output



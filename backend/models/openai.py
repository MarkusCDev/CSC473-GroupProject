from openai import OpenAI
import json

class ShoeBot:
    def __init__(self):
        self.client = OpenAI()

    def fill_shoe_details(self, shoe_name, year, color):
        prompt =f"{shoe_name} {year} {color} release date, details, and interesting facts "
        json_format = "JSON = { shoeDetails: {release_date: release_date, details: details, facts: facts }}"   
        
        openai_response = self.client.chat.completions.create(
            model="gpt-4o",
            response_format={ "type": "json_object" },
            messages = [{"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                        {"role": "user", "content": prompt + json_format}]
        )
    
        # print(openai_response)

        return json.loads(openai_response.choices[0].message.content)
    
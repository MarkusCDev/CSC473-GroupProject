from openai import OpenAI
import json

class ShoeBot:
    def __init__(self):
        self.client = OpenAI()

    def fill_shoe_details(self, shoe_name, year, color):
        prompt =f"Shoe Name:{shoe_name} Year:{year} Color:{color} release date, details, and interesting facts using the following format (only provide a data in mm/dd/yy format and for details and facts only provide 2 sentences each and nothing more) "
        json_format = "JSON = { release_date: release_date, details: details, facts: facts }"   
        
        openai_response = self.client.chat.completions.create(
            model="gpt-4o",
            response_format={ "type": "json_object" },
            messages = [{"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                        {"role": "user", "content": prompt + json_format}]
        )
    
        # print(openai_response)

        return json.loads(openai_response.choices[0].message.content)
    
    def ask_ai(self, query, inventory):
        prompt =f"Based on the available inventory {inventory}, answer this question {query} to the best of your ability being very short and concise keeping it 1 sentence max."
        json_format = "JSON = { query: answer }"   
        
        openai_response = self.client.chat.completions.create(
            model="gpt-4o",
            response_format={ "type": "json_object" },
            messages = [{"role": "system", "content": "You are a helpful assistant designed to output JSON."},
                        {"role": "user", "content": prompt + json_format}]
        )
    
        # print(openai_response)

        return json.loads(openai_response.choices[0].message.content)
        
        
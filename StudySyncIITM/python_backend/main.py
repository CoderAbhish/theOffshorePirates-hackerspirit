from flask import Flask, request, jsonify
import re
import requests
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

app = Flask(__name__)

client = OpenAI()

def create_thread(user_message):
    assistant_id = 'asst_Y9U0yZAQpnLblC62tsLsIHtW'

    try:
        thread_stream = client.beta.threads.create_and_run(
            assistant_id=assistant_id,
            thread={
                "messages": [
                {"role": "user", "content": user_message}
                ]
            },
            stream=True
        )

        for event in thread_stream:
            if event.event == 'thread.message.completed':
                response = event.data.content[0].text.value
                output_stage_checking = re.search(r"Output Stage:(.*)", response, re.DOTALL)
                if output_stage_checking:
                    response = output_stage_checking.group(1).strip()
                clean_response = re.sub(r"【\d+:\d+†[^】]*】", "", response)
                output = {'conv_id': event.data.thread_id, 'response': clean_response}
                return output

    except Exception as e:
        return {"error": str(e)}

def submit_message(thread_id, user_message):
    assistant_id = 'asst_Y9U0yZAQpnLblC62tsLsIHtW'

    try:
        client.beta.threads.messages.create(
            thread_id=thread_id, role="user", content=user_message
        )

        message_stream = client.beta.threads.runs.create(
            thread_id=thread_id,
            assistant_id=assistant_id,
            stream=True
        )

        for event in message_stream:
            if event.event == 'thread.message.completed':
                response = event.data.content[0].text.value
                output_stage_checking = re.search(r"Output Stage:(.*)", response, re.DOTALL)
                if output_stage_checking:
                    response = output_stage_checking.group(1).strip()
                clean_response = re.sub(r"【\d+:\d+†[^】]*】", "", response)
                output = {'conv_id': event.data.thread_id, 'response': clean_response}
                return output

    except Exception as e:
        return {"error": str(e)}

@app.route('/api/thread/create', methods=['POST'])
def create_thread_api():
    data = request.get_json()

    user_message = data.get("user_message")
    if not user_message:
        return jsonify({"error": "User message is required"}), 400

    result = create_thread(user_message)
    return jsonify(result)

@app.route('/api/thread/<thread_id>/message', methods=['POST'])
def submit_message_api(thread_id):
    data = request.get_json()

    user_message = data.get("user_message")
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    result = submit_message(thread_id, user_message)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

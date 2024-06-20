import requests
from access_token import HF_TOKEN

QUSTION_API_URL = "https://api-inference.huggingface.co/models/MaRiOrOsSi/t5-base-finetuned-question-answering"
NER_API_URL = "https://api-inference.huggingface.co/models/mdarhri00/named-entity-recognition"

headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def query(api_url, payload):
    response = requests.post(api_url, headers=headers, json=payload)
    return response.json()

def ask_model(question, context):
    input = f"question: {question} context: {context}"
    output = query(QUSTION_API_URL, {
        "inputs": input,
    })
    ret = "NULL"
    try:
        ret = output[0]['generated_text']
    finally:
        pass
    return ret


def named_entity_recognition(context):
    output = query(NER_API_URL, {
        "inputs": context,
    })
    return output
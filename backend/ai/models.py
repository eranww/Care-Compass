import requests
from access_token import HF_TOKEN

QUSTION_API_URL = "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2"
NER_API_URL = "https://api-inference.huggingface.co/models/mdarhri00/named-entity-recognition"
ZERO_SHOT_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"

headers = {"Authorization": f"Bearer {HF_TOKEN}"}

def query(api_url, payload):
    response = requests.post(api_url, headers=headers, json=payload)
    return response.json()

def ask_model(question, context):
    # input = f"question: {question} context: {context}"
    input = {"question": question, "context": context}
    output = query(QUSTION_API_URL, {
        "inputs": input,
    })
    ret = "NULL"
    try:
        if output['score'] > 0.1:
            ret = output['answer']
        else:
            ret = ''
    finally:
        pass
    return ret


def named_entity_recognition(context):
    output = query(NER_API_URL, {
        "inputs": context,
    })
    return output

def zero_shot_classification(context, labels):
    output = query(ZERO_SHOT_URL, {
        "inputs": context,
        "parameters": {"candidate_labels": labels},
    })
    return output

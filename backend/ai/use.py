from backend.ai.models import *
from tags import tags_list
import numpy as np

def ask_questions_about_text(file_name, question):
    with open(file_name) as f:
        text = f.read()
        output = ask_model(question, text)
    return output

def parse_named_entity_recognition(file_name):
    entities = {}
    with open(file_name) as f:
        text = f.read()
        output = named_entity_recognition(text)
        i = 0
        for dict in output:
            try:
                key = dict['entity_group'] + f"_{i}"
                value = dict['word']
                entities[key] = value
                i += 1
            finally:
                continue
    # print entities
    print("Named entities:")
    for key, value in entities.items():
        print(f"{key}: {value}")

def classify(file_name, tags):
    with open(file_name) as f:
        text = f.read()
        output = zero_shot_classification(text, tags)
    max_score_index = np.argmax(output['scores'])
    tag = output['labels'][max_score_index]
    prob = output['scores'][max_score_index]
    return tag, prob

# def use_hugging_face():
#     for q in questions:
#         print(q)
#         answer = ask_questions_about_text(file_name, q)
#         print(answer)
#     parse_named_entity_recognition(file_name)

def get_tags(file_name):
    target_tags = []
    for tags in tags_list:
        tag, prob = classify(file_name, tags)
        #print(f"{tag} - {prob}")
        if prob > 0.85 and tag != "none":
            target_tags.append(tag.lower())
    diagnosis = "Does the patient have any psychological diagnoses and what are them?"
    diagnosis = ask_questions_about_text(file_name, diagnosis)
    if diagnosis != None:
        target_tags.append(diagnosis.lower())

    return target_tags

def use(debug, file_name = None):
    if file_name == None:
        file_name = "samples/Maya.txt"

    target_tags = get_tags(file_name)

    if debug:
        for tag in target_tags:
            print(tag)
    
    return target_tags

def use_api(file_name):
    debug = False
    use(debug, file_name)

from models import *
from tags import tags_list
import numpy as np

def ask_questions_about_text(file_name, question):
    with open(file_name) as f:
        text = f.read()
        output = ask_model(question, text)
        print(output)

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
    return tag

file_name = "samples/Yotam.txt"

questions = ["What is the mental health condition of the patient?",
             "What event led to the patient's trauma?",
             "How was the patient's childhood?",
             "What challenge the patient has?",
             "How does he feel?",
             "What is his biggest fear?",
             "what is the patient age?",
             "Which kind of support systems the patient have (family/partner)?",
             "How much time has passed since the traumatic event?",
             "How long did the traumatic event take place?",
             "Does the patient have any psychological diagnoses and what are them?",
             "What kind of treatment the patient already got?",
             "What is the gender of the patient?",
             "Does the patient have a job?",
             "What is the family status of the patient?"
            ]

def use_hugging_face():
    for q in questions:
        print(q)
        ask_questions_about_text(file_name, q)
    parse_named_entity_recognition(file_name)

def blah():
    for tags in tags_list:
        tag = classify(file_name, tags)
        print(tag)

blah()
import openai
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def name(text):
  return text + "name"


def check(text):
  return text + "check"


def sendmsg(text):
  responses = client.chat.completions.create(model="gpt-3.5-turbo",
                                             messages=text,
                                             stream=False)
  print(responses.choices[0].message.content)
  return responses.choices[0].message.content

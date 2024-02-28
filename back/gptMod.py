import openai
from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
temperature = 1.0
max_tokens = 512
MODEL = "gpt-3.5-turbo"


def name(text):
  inst_inst = f"You are prompt engineer to have gpt make responses better. \
  Give me an instruction to prompt gpt to respond by mimicking {text}'s \
  characteristics, including personalities, experiences, speeches, and knowledges. \
  It includes how friendly with muggles, and how familiar with muggle techknowledges. \
  Only the instruction sentence, without any explanation."

  default_inst = "You are talking with your muggle friend, but how friendly you are depends on your personality. \
  If you hate muggles, you don't need to speak friendly. \
  You can have knowledge for things that appeared \
  after the Harry Potter era, but how deeply you know them depends on your personality \
  Match your everything, including the name, experiences, as your characteristic is. \
  Answer as you are in a dialogue."

  # To summarize, you should tell GPT to act exactly like {messages}. \

  rendered = [{"role": "system", "content": inst_inst}]
  inst = client.chat.completions.create(
      model=MODEL,
      messages=rendered,
      temperature=temperature,
      top_p=1.0,
      max_tokens=max_tokens,
      stop=["<|endoftext|>"],
  )

  return inst.choices[0].message.content


def check(text):
  inst = "User will tell you a name. If any character with that name exists in Harry Potter, repeat the name. \
    If not the same, but the similar name exists in Harry Potter, tell \"only\" the right name of it. \
    If any character with the name doesn't exist, only say No."

  rendered = [{
      "role": "system",
      "content": inst
  }, {
      "role": "user",
      "content": text
  }]
  res = client.chat.completions.create(
      model=MODEL,
      messages=rendered,
      temperature=0.1,
      max_tokens=7,
      stop=["<|endoftext|>"],
  )
  ans = res.choices[0].message.content
  print(ans)
  return ans


def sendmsg(text):
  responses = client.chat.completions.create(
      model="gpt-3.5-turbo",
      messages=text,
      temperature=temperature,
      top_p=1.0,
      max_tokens=max_tokens,
      stop=["<|endoftext|>"],
  )
  print(responses.choices[0].message.content)
  return responses.choices[0].message.content

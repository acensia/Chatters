from flask import Flask, request, jsonify
from flask_cors import CORS

from keep_alive import keep_alive
from gptMod import sendmsg, name, check

app = Flask(__name__)
CORS(app)


class Thr:

  def __init__(self, name=None):
    self.name = name
    self.msg_list = []

  def msgAdd(self, msg):
    self.msg_list.append(msg)

  def instAdd(self, inst):
    self.msg_list.append({"role": "system", "content": inst})


chatbot = Thr()


@app.route('/')
def home():
  return 'Hello, Wizard!'


@app.route('/polyjuice', methods=['POST'])
def polyjuice_gpt():
  data = request.json
  print(f"- Msg to {chatbot.name}")

  msg = data['text'] if data is not None else None

  if msg is None:
    return "Error"
  chatbot.msgAdd({"role": "user", "content": msg})

  new_msg = sendmsg(chatbot.msg_list)
  chatbot.msgAdd({"role": "assistant", "content": new_msg})

  return new_msg


@app.route('/name', methods=['POST'])
def name_gpt():
  data = request.json
  chatbot.name = data['text'] if data is not None else None
  inst = name(chatbot.name)
  chatbot.instAdd(inst)
  print(f"- Name \"{chatbot.name}\" is online")

  return inst


@app.route('/check', methods=['POST'])
def check_gpt():
  data = request.json
  req_name = data['text'] if data is not None else None
  res = check(req_name)
  print(f"- Name check for \"{req_name}\"is done")

  return res if 'No' not in res else 'no'


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
  # keep_alive()

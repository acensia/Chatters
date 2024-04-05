from flask import Flask, request, jsonify
from flask_cors import CORS

from keep_alive import keep_alive
from gptMod import sendmsg, name, check
import uuid

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


# chatbot = Thr()
sessions = {}


@app.route('/')
def home():
  return 'Hello, Wizard!'


@app.route('/polyjuice', methods=['POST'])
def polyjuice_gpt():
  data = request.json
  session_chatbot = sessions[data["id"]]
  print(f"from {data['id']}")
  print(session_chatbot.name)
  print(f"- Msg #{len(session_chatbot.msg_list)/2} to {session_chatbot.name}")

  msg = data['message'] if data is not None else None
  print(msg)
  # print(session_chatbot.msg_list)

  if msg is None:
    return "Error"
  session_chatbot.msgAdd({"role": "user", "content": msg})

  new_msg = sendmsg(session_chatbot.msg_list)
  session_chatbot.msgAdd({"role": "assistant", "content": new_msg})

  return jsonify({"message": new_msg})


@app.route('/name', methods=['POST'])
def name_gpt():
  data = request.json
  # chatbot.name = data['text'] if data is not None else None
  inst = name(data['text'])
  # chatbot.instAdd(inst)
  print(f"- Name \"{data['text']}\"is done")

  session_id = str(uuid.uuid4())

  sessions[session_id] = Thr()
  sessions[session_id].name = data['text']
  sessions[session_id].instAdd(inst)

  return jsonify({'session_id': session_id})
  # return inst


@app.route('/check', methods=['POST'])
def check_gpt():
  data = request.json
  req_name = data['text'] if data is not None else None
  res = check(req_name)
  print(f"- Name check for \"{req_name}\"is done")
  checked = res if 'No' not in res else 'no'

  return jsonify({'checked': checked})


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
  # keep_alive()

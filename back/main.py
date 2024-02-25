from flask import Flask, request, jsonify
from flask_cors import CORS

from keep_alive import keep_alive
from gptMod import sendmsg, name

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
  print(chatbot.name)
  print("Here")

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
  print("name is done")

  return inst


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
  # keep_alive()

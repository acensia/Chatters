from flask import Flask, request, jsonify
from flask_cors import CORS

from keep_alive import keep_alive
from gptMod import sendmsg

app = Flask(__name__)
CORS(app)

msg_list = []


@app.route('/')
def home():
  return 'Hello, Wizard!'


@app.route('/polyjuice', methods=['POST'])
def polyjuice_gpt():
  data = request.json
  print(data)
  print("Here")

  msg = data['text'] if data is not None else None

  if msg is None:
    return "Error"
  msg_list.append({"role": "user", "content": msg})
  new_msg = sendmsg(msg_list)
  msg_list.append({"role": "assistant", "content": new_msg})

  return new_msg


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
  keep_alive()

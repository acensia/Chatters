from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

# Set your OpenAI API key here
openai.api_key = 'your_api_key_here'

@app.route('/generate-text', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get('prompt')
    if prompt:
        try:
            response = openai.Completion.create(
              engine="text-davinci-003",
              prompt=prompt,
              max_tokens=50
            )
            return jsonify(response), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        return jsonify({'error': 'Prompt is required'}), 400

if __name__ == '__main__':
    app.run(debug=True)

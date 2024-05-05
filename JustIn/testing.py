from flask import Flask, request, jsonify
import logging
import tensorflow as tf
from keras.utils import pad_sequences
import pickle
import numpy as np

app = Flask(__name__)

# Load your model and tokenizer
model = tf.keras.models.load_model('model.h5')
tokenizer = pickle.load(open('tokenizer.pickle', 'rb'))
max_length = 1000
padding_type = 'post'
trunc_type = 'post'
cats = ['HR', 'DESIGNER', 'INFORMATION-TECHNOLOGY', 'TEACHER', 'ADVOCATE', 'BUSINESS-DEVELOPMENT', 'HEALTHCARE', 'FITNESS', 'AGRICULTURE', 'BPO', 'SALES', 'CONSULTANT', 'DIGITAL-MEDIA', 'AUTOMOBILE', 'CHEF', 'FINANCE', 'APPAREL', 'ENGINEERING', 'ACCOUNTANT', 'CONSTRUCTION', 'PUBLIC-RELATIONS', 'BANKING', 'ARTS', 'AVIATION']

@app.route('/', methods=['GET'])
def home():
    return '''
    <html>
        <head>
            <title>Text Analysis</title>
            <script>
                function analyzeText() {
                    var text = document.getElementById('text').value;
                    fetch('/analyze', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text: text })
                    })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('result').textContent = JSON.stringify(data, null, 2);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            </script>
        </head>
        <body>
            <h2>Text Analysis Form</h2>
            <textarea id="text" rows="4" cols="50"></textarea><br>
            <button onclick="analyzeText()">Analyze</button>
            <pre id="result"></pre>
        </body>
    </html>
    '''

@app.route('/analyze', methods=['POST'])
def analyze():
    app.logger.info("Processing request for /analyze endpoint")
    data = request.get_json()
    text = data['text'].lower().replace('\s+', ' ').replace('\n', ' ')
    sequences = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
    p = model.predict(padded)
    indices = np.argsort(p)[0][::-1]
    output = {}
    for i in range(0, 3):
        output[cats[indices[i]]] = float(p[0][indices[i]])
    return jsonify(output)

if __name__ == '__main__':
    app.logger.setLevel(logging.DEBUG)
    app.run(debug=True)

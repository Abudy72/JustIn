from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
from flask_cors import CORS

cats = ['HR',
 'DESIGNER',
 'INFORMATION-TECHNOLOGY',
 'TEACHER',
 'ADVOCATE',
 'BUSINESS-DEVELOPMENT',
 'HEALTHCARE',
 'FITNESS',
 'AGRICULTURE',
 'BPO',
 'SALES',
 'CONSULTANT',
 'DIGITAL-MEDIA',
 'AUTOMOBILE',
 'CHEF',
 'FINANCE',
 'APPAREL',
 'ENGINEERING',
 'ACCOUNTANT',
 'CONSTRUCTION',
 'PUBLIC-RELATIONS',
 'BANKING',
 'ARTS',
 'AVIATION']

app = Flask(__name__)
CORS(app)

# Load your model and tokenizer
model = tf.keras.models.load_model('model.h5')
tokenizer = pickle.load(open('tokenizer.pickle', 'rb'))
max_length = 1000
padding_type='post'
trunc_type='post'

@app.route('/analyze', methods=['POST'])
def analyze():
    content = request.json
    text = content['text']
    text = text.lower().replace('\s+', ' ').replace('\n', ' ')
    sequences = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
    p = model.predict(padded)
    indices = np.argsort(p)[0][::-1]
    output = {}
    for i in range(0, 3):
        output[cats[indices[i]]] = float(p[0][indices[i]])
    return jsonify(output)  # Return the JSON directly

if __name__ == '__main__':
    #print(analyze("fat"))
    app.run(debug=True)

        

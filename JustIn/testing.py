import tensorflow as tf
from tensorflow.keras.preprocessing.sequence import pad_sequences
import pickle
import numpy as np
model = tf.keras.models.load_model('model.h5')
model.summary()
tokenizer = pickle.load(open('tokenizer.pickle','rb'))
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
vocab_size = 500
embedding_dim = 16
max_length = 1000
trunc_type='post'
padding_type='post'
oov_tok = "<OOV>"
def analysis(text):
    text = text.lower().replace('\s+', ' ').replace('\n', ' ')
    sequences = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(sequences, maxlen=max_length, padding=padding_type, truncating=trunc_type)
    p = model.predict(padded)
    indices = np.argsort(p)[0][::-1]
    output = {}
    for i in range(0, 3):
        output[cats[indices[i]]] = p[0][indices[i]]
    print(output)
    

analysis("This is a thing")
        

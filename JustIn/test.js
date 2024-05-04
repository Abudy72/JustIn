const tf = require('@tensorflow/tfjs-node'); // or '@tensorflow/tfjs' if running in the browser
const fetch = require('node-fetch'); // Only necessary for Node.js; browsers support fetch natively

// Assuming the tokenizer is converted to a JSON format and the model is in the appropriate TensorFlow.js format.
const tokenizer = require('./tokenizer.json');
const modelPath = 'model.json'; // Path to the converted model
const model = await tf.loadLayersModel(tf.io.fileSystem(modelPath));

const cats = [
  'HR', 'DESIGNER', 'INFORMATION-TECHNOLOGY', 'TEACHER', 'ADVOCATE',
  'BUSINESS-DEVELOPMENT', 'HEALTHCARE', 'FITNESS', 'AGRICULTURE', 'BPO',
  'SALES', 'CONSULTANT', 'DIGITAL-MEDIA', 'AUTOMOBILE', 'CHEF', 'FINANCE',
  'APPAREL', 'ENGINEERING', 'ACCOUNTANT', 'CONSTRUCTION', 'PUBLIC-RELATIONS',
  'BANKING', 'ARTS', 'AVIATION'
];

const max_length = 1000;
const padding_type = 'post';
const trunc_type = 'post';

function analyze(text) {
  text = text.toLowerCase().replace(/\s+/g, ' ').replace(/\n/g, ' ');
  let sequences = textsToSequences([text], tokenizer);
  let padded = padSequences(sequences, max_length, padding_type, trunc_type);
  let p = model.predict(padded);
  let indices = tf.topk(p, 3, true);
  let output = {};
  indices.indices.arraySync()[0].forEach((index, i) => {
    output[cats[index]] = p.arraySync()[0][index];
  });
  return output;
}

function textsToSequences(texts, tokenizer) {
  // Convert texts to sequences using the tokenizer
  // This function should replicate what tokenizer.texts_to_sequences does in Python
  return texts.map(text => text.split(' ').map(word => tokenizer[word] || 0));
}

function padSequences(sequences, maxlen, padding = 'post', truncating = 'post') {
  // This function should pad sequences as pad_sequences does in Python
  return sequences.map(seq => {
    if (seq.length > maxlen) {
      if (truncating === 'post') {
        return seq.slice(0, maxlen);
      } else {
        return seq.slice(-maxlen);
      }
    }
    
    const paddingArray = Array(maxlen - seq.length).fill(0);
    if (padding === 'post') {
      return seq.concat(paddingArray);
    } else {
      return paddingArray.concat(seq);
    }
  });
}

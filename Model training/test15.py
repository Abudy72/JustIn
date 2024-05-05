import tensorflow as tf
from keras.utils import plot_model

model = tf.keras.models.load_model('model.h5')

plot_model(model, to_file='model_plot.png', show_shapes=True, show_layer_names=True)

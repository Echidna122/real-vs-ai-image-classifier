import tensorflow as tf
import numpy as np

MODEL_PATH = "../model/ai_real_model.keras"

model = tf.keras.models.load_model(MODEL_PATH)

def predict(image):
    prediction = model.predict(image)[0][0]

    label = "FAKE" if prediction > 0.5 else "REAL"

    return {
        "label": label,
        "confidence": float(prediction)
    }
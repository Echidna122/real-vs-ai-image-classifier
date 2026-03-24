from PIL import Image
import numpy as np

def preprocess_image(file):
    image = Image.open(file).convert("RGB")
    image = image.resize((32, 32))  # match your training
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image
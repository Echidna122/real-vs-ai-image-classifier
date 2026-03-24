from fastapi import APIRouter, File, UploadFile
from .preprocess import preprocess_image
from .model import predict

router = APIRouter()

@router.post("/predict")
async def predict_api(file: UploadFile = File(...)):
    image = preprocess_image(file.file)
    result = predict(image)
    return result
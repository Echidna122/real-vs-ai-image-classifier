# CIFAKE — AI Image Detector

A web app that classifies images as **AI-generated** or **Real** using a deep learning model.



---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vercel)
- **Backend:** FastAPI / Python (Render)
- **Model:** TensorFlow / Keras

---

## How It Works

1. User uploads an image
2. Image is sent to the FastAPI backend
3. Model returns a **REAL** or **FAKE** label with a confidence score
4. Result is displayed on the frontend

---

## Deployment

| Service | Purpose |
|---|---|
| [Render](https://render.com) | FastAPI backend |
| [Vercel](https://vercel.com) | Static frontend |

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from PIL import Image
import io


app = FastAPI()

# Izinkan akses dari web Next.js nanti
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Muat model dan label
model = tf.keras.models.load_model("model_kesegaran.keras")
with open("labels.txt", "r") as f:
    labels = f.read().splitlines()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Baca gambar yang dikirim pengguna
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # Sesuaikan ukuran gambar dengan model
    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Lakukan prediksi
    predictions = model.predict(img_array)
    index = np.argmax(predictions[0])
    label = labels[index]
    confidence = float(np.max(predictions[0]))

    return {
        "label": label, 
        "confidence": round(confidence * 100, 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
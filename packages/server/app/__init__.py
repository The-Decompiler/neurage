import os
import sys
sys.path.append(".")

import tensorflow as tf
from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.utils import get_age

# Check if model exists
MODEL = "app/age_model.h5"
if not os.path.isfile(MODEL):
	sys.exit("Error: You must run `build_model.py` first")
else:
	model = tf.keras.models.load_model(MODEL)

class PredictAge(BaseModel):
	image_list: List[int]


app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

@app.post("/predict_age")
async def predict_age(input: PredictAge):
	try:
		age = get_age(input)
		return {"age": age}
	except:
		return {"age": -1}

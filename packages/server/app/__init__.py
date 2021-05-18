import sys
sys.path.append(".")

from typing import List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from app.utils import get_age

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

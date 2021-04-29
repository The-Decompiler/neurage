import sys
sys.path.append(".")

from fastapi import FastAPI
from fastapi import FastAPI, Request
from pydantic import BaseModel
from app.utils import get_age
from fastapi.middleware.cors import CORSMiddleware

class PredictAge(BaseModel):
	image_list: str


app = FastAPI()

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

@app.post("/predict_age")
async def predict_age(input: PredictAge, _):
	try:
		age = get_age(input)
		return age
	except Exception as e:
		return e

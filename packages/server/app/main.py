from fastapi import FastAPI

from datetime import datetime
from typing import Optional
from typing import List
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi import FastAPI,Request
from pydantic import BaseModel
import sentry_sdk
import sys
sys.path.append('.')
from app.utils import get_age
from fastapi.middleware.cors import CORSMiddleware
from app.utils.user_validation import UserValidator

class PredictAge(BaseModel):
	idk_some_input: str


app = FastAPI()


app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

@app.post("/")
async def root():
	return "Hello World"

@app.post("/predict_age")
async def predict_age(input: PredictAge,request:Request):
	try:
		get_age(input)
	except Exception as e:
		pass




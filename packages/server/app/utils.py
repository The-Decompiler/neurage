from fastapi import Depends, FastAPI, HTTPException, status

def get_age(input):
	return age
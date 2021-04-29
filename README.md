# Neurage

A web app that predicts your age

## Setup

Install all dependencies.

1. Frontend:
`cd packages/client/ && yarn`

2. Backend:
```cd packages/server/
python3 -m venv venv && source /venv/bin/activate
pip install -r requirements.txt
```

Set the environment variable `VITE_BACKEND_URL` in `packages/client/.env` to the appropriate URL.

While in Python virtual environment, go to the project root directory and `yarn start`.

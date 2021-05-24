# Neurage

Age predictor web application.

Take a picture and see what age you look like.

## Project

Neurage is a **React** **TypeScript** project, styled using **Styled Components**. It is organized as a monorepo using **Yarn workspaces**, with the **Python** backend containerized using **Docker**. API requests are handled using **FastAPI** and the convolutional neural network created using **TensorFlow**. Other dependencies include **Numpy**, **Pandas**, **sklearn**, and **Pydantic**.

The dataset and model used for this project can be found [here](https://kaggle.com/shahraizanwar/age-gender-ethnicity-prediction).

## Deploy

Though this project uses Yarn workspaces as its development environment, it uses separate deployment of the frontend and backend; the frontend using Netlify, and the backend in a server, needing only the appropriate value for the environment variable `VITE_BACKEND_SERVER` for the former and `docker compose up` to start up the latter.

## Development

### Dependencies

1. Frontend:
`cd packages/client/ && yarn`

2. Backend:
```cd packages/server/
python3 -m venv venv && source /venv/bin/activate
pip install -r requirements.txt
```
OR
`cd packages/server/app/ && docker compose up`

Set the environment variable `VITE_BACKEND_URL` in `packages/client/.env` to the appropriate URL.

### Run

`yarn start` - Runs both client and server

`yarn client` - Runs only the client

`yarn server` - Runs only the server

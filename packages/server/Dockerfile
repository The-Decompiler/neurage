FROM python:3.7
COPY ./app /app
COPY requirements.txt .
RUN pip --no-cache-dir install -r requirements.txt
CMD ["uvicorn", "app.__init__:app", "--host", "0.0.0.0", "--port", "5000"]

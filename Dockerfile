FROM python:3.12.6

ENV PYTHONUNBUFFERED=1

WORKDIR /code

# Copy the requirements.txt from the root
COPY requirements.txt .

RUN pip install -r requirements.txt

# Copy all project files to the container's /code directory
COPY . /code

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "127.0.0.1:8000"]

# Django REST Framework Setup

## Prerequisites

Before setting up the project locally, ensure you have the following installed on your system:

- [Python 3.x](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [pip](https://pip.pypa.io/en/stable/installation/)
- [Virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) (recommended for managing dependencies in isolated environments)

->Downloading PostgreSQL, follow the link and download the lastest windows installer. After installation the GUI admin dashboard "pgAdmin4" can be helpful to setup.

## Project Setup

### Step 1: Clone the Repository

Clone the project repository to your local machine using:

```bash
git clone <your-repository-url>
cd <your-repository-directory>
```

### Step 2: Setup virtual environment
On Windows
```python
python -m venv env
env\Scripts\activate
```

### Step 3: Install dependencies
```
pip install -r requirements.txt
```

### Step 4: Configire PostgreSQL Database
On terminal, run the command to access PostgresSQL
```
psql -U postgres

```
Once inside the PostgreSQL environment, you can run the following commands to create a database and a user:
```
CREATE DATABASE <your-database-name>;
CREATE USER <your-username> WITH PASSWORD '<your-password>';
GRANT ALL PRIVILEGES ON DATABASE <your-database-name> TO <your-username>;
```
After executing these commands, you can exit the PostgreSQL environment by typing ```\q.```

Update the ```DATABASES``` configuration in the ```settings.py``` file of the Django project:

1. Create a .env file and add the follwing details
```
# .env file
DB_NAME=<database-name-here>
DB_USER=<username-here>
DB_PASSWORD=<password-here>
DB_HOST=localhost
DB_PORT=5432
```
2. Update the settings.py file to use the .env file
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME'),
        'USER': os.getenv('DB_USER'),
        'PASSWORD': os.getenv('DB_PASSWORD'),
        'HOST': 'db',
        'PORT': '5432',
    }
}
```

### Step 5: Apply Migrations
Once the database is configured, run the migrations to set up the tables:
```
python manage.py migrate
```

### Step 6: Start the Development Server
Run the Django development server:
```
python manage.py runserver
```

Step 7: Access the API
You can access the API endpoints via http://localhost:8000/ and follow the routes as per documentations
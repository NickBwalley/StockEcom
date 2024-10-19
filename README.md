# StockEcommerce Website Django, React, React, PayPal Sandbox

# Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration (test with these sandbox credentials) 
  * username: sb-dghav33161178@personal.example.com
  * secret: u/N4LaH^

# Download & Setup Instructions

- 1 - Clone project:

```
git clone -b Nick https://github.com/NickBwalley/StockEcom.git

```

- 2 - cd StockEcom/

# Backend Setup Instructions

```
python -m venv env
.env\scripts\activate
pip install -r requirements.txt
python manage.py runserver

// configuring postgresql
python manage.py makemigrations
python manage.py migrate
```

- Run on server: http://127.0.0.1:8000/

# Frontend Setup Instructions

```
cd frontend/
npm install
npm start
```

- Run on server: http://localhost:3000/#/

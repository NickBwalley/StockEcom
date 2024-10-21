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

# Application Structure

```
└── project-root/
    ├── backend/
    ├── base/
    ├── frontend/
    ├── resources/
    ├── static/
    ├── staticfiles/
    ├── .dockerignore
    ├── .env
    ├── .gitignore
    ├── db.sqlite3
    ├── docker-compose.yml
    ├── Dockerfile
    ├── manage.py
    ├── package-lock.json
    ├── package.json
    ├── Procfile
    ├── README.md
    ├── requirements.txt
    └── runtime.txt
```
The front-end application uses a MVC-architecture. The code is divided into folders components, constants and Screens.

```
└── src/
    ├── actions/
    │   ├── cartActions.js
    │   ├── orderActions.js
    │   ├── productActions.js
    │   ├── userActions.js
    ├── components/
    │   ├── CheckoutSteps.js
    │   ├── Footer.js
    │   ├── FormContainer.js
    │   ├── Header.js
    │   ├── Loader.js
    │   ├── Message.js
    │   ├── Paginate.js
    │   ├── Product.js
    │   ├── ProductCarousel.js
    │   ├── productConstants.js
    │   ├── Rating.js
    │   ├── SearchBox.js
    ├── constants/
    │   ├── cartConstants.js
    │   ├── orderConstants.js
    │   ├── productConstants.js
    │   ├── userConstants.js
    ├── reducers/
    │   ├── cartReducers.js
    │   ├── orderReducers.js
    │   ├── productReducers.js
    │   ├── userReducers.js
    ├── screens/
    │   ├── CartScreen.js
    │   ├── HomeScreen.js
    │   ├── LoginScreen.js
    │   ├── OrderListScreen.js
    │   ├── OrderScreen.js
    │   ├── PaymentScreen.js
    │   ├── PlaceOrderScreen.js
    │   ├── ProductEditScreen.js
    │   ├── ProductListScreen.js
    │   ├── ProductScreen.js
    │   ├── ProfileScreen.js
    │   ├── RegisterScreen.js
    │   ├── ShippingScreen.js
    │   ├── UserEditScreen.js
    │   ├── UserListScreen.js
```
The backend, made in Django contains `urls.py` that has files with all the REST endpoints for the app
```
└── backend/
    ├── __pycache__/
    ├── __init__.py
    ├── asgi.py
    ├── serializers.py
    ├── settings.py
    ├── urls.py
    ├── wsgi.py

└── base/
    ├── __pycache__/
    ├── migrations/
    ├── urls/
    │   ├── __pycache__/
    │   ├── order_urls.py
    │   ├── product_urls.py
    │   └── user_urls.py
    ├── views/
    │   ├── __init__.py
    │   ├── admin.py
    │   ├── apps.py
    │   ├── models.py
    │   ├── products.py
    │   ├── serializers.py
    │   ├── signals.py
    │   └── tests.py

```

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

from django.urls import path
from .views import CartView, AddToCartView, RemoveFromCartView, CheckoutView

urlpatterns = [
    path('cart/', CartView.as_view(), name='cart'),
    path('cart/add/<int:product_id>/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/remove/<int:product_id>/', RemoveFromCartView.as_view(), name='remove-from-cart'),
    path('cart/checkout/', CheckoutView.as_view(), name='checkout'),
]

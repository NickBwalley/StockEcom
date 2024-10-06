from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart, CartItem, Order, OrderItem
from products.models import Product
from .serializers import CartSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

class CartView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, product_id):
        product = Product.objects.get(id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        cart_item.quantity += 1
        cart_item.save()

        return Response({"message": "Item added to cart"}, status=status.HTTP_201_CREATED)

class RemoveFromCartView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, product_id):
        product = Product.objects.get(id=product_id)
        cart = Cart.objects.get(user=request.user)
        cart_item = CartItem.objects.filter(cart=cart, product=product).first()

        if cart_item:
            cart_item.delete()
            return Response({"message": "Item removed from cart"}, status=status.HTTP_204_NO_CONTENT)
        return Response({"message": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        cart = Cart.objects.get(user=request.user)
        if not cart.items.exists():
            return Response({"message": "Cart is empty"}, status=status.HTTP_400_BAD_REQUEST)
        
        order = Order.objects.create(user=request.user)
        total_price = 0

        # Transfer cart items to order items
        for cart_item in cart.items.all():
            order_item = OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
                price=cart_item.product.price
            )
            total_price += order_item.get_total_price()

        # Update the total price of the order
        order.total_price = total_price
        order.save()

        # Clear the cart
        cart.items.all().delete()

        return Response({"message": "Order created successfully", "order_id": order.id}, status=status.HTTP_201_CREATED)
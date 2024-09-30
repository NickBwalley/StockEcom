from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product, Category, Review
from .serializers import ProductSerializer, CategorySerializer, ReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# --- Product Views ---
class ProductList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly] #change to IsAuthenticatedOrReadOnly when testing is done

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]#change to IsAuthenticatedOrReadOnly when testing is done

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        product = self.get_object(pk)
        if isinstance(product, Response):
            return product
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, pk):
        product = self.get_object(pk)
        if isinstance(product, Response):
            return product
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = self.get_object(pk)
        if isinstance(product, Response):
            return product
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# --- Category Views ---
class CategoryList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]#change to IsAuthenticatedOrReadOnly when testing is done

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CategoryDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]#change to IsAuthenticatedOrReadOnly when testing is done

    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        category = self.get_object(pk)
        if isinstance(category, Response):
            return category
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = self.get_object(pk)
        if isinstance(category, Response):
            return category
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        if isinstance(category, Response):
            return category
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# --- Review Views ---
class ReviewList(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]#change to IsAuthenticatedOrReadOnly when testing is done

    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReviewDetail(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]#change to IsAuthenticatedOrReadOnly when testing is done

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        review = self.get_object(pk)
        if isinstance(review, Response):
            return review
        serializer = ReviewSerializer(review)
        return Response(serializer.data)

    def put(self, request, pk):
        review = self.get_object(pk)
        if isinstance(review, Response):
            return review
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        review = self.get_object(pk)
        if isinstance(review, Response):
            return review
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ProductReviewListView(APIView):
    def get(self, request, product_id):
        try:
            # Fetch the product by ID to ensure it exists
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        # Get all reviews for this product
        reviews = Review.objects.filter(product=product)
        serializer = ReviewSerializer(reviews, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)
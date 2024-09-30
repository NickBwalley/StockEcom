from django.urls import path
from . import views

urlpatterns = [
    # Product URLs
    path('products/', views.ProductList.as_view(), name='product-list'),  # GET (list products), POST (create product)
    path('products/<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),  # GET, PUT, DELETE (product)

    # Category URLs
    path('categories/', views.CategoryList.as_view(), name='category-list'),  # GET (list categories), POST (create category)
    path('categories/<int:pk>/', views.CategoryDetail.as_view(), name='category-detail'),  # GET, PUT, DELETE (category)

    # Review URLs
    path('reviews/', views.ReviewList.as_view(), name='review-list'),  # GET (list reviews), POST (create review)
    path('reviews/<int:pk>/', views.ReviewDetail.as_view(), name='review-detail'),  # GET, PUT, DELETE (review)
    path('products/<int:product_id>/reviews/', views.ProductReviewListView.as_view(), name='product-reviews'),
]

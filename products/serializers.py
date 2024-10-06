from rest_framework import serializers
from .models import Product, Category, Review

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(read_only=True)
     # Set category as a PrimaryKeyRelatedField to accept a category ID
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    badge = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'stock', 'category', 'image', 'created_at', 'updated_at', 'badge']
        
    def get_badge(self, obj):
        return obj.badge  # This retrieves the dynamically computed "badge" property

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product', 'user', 'rating', 'comment', 'created_at']

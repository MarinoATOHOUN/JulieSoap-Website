from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    display_price = serializers.CharField(read_only=True)
    
    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category', 'category_name',
            'product_type', 'price', 'is_wholesale_only', 'pieces_per_carton',
            'carton_price', 'image', 'ingredients', 'skin_types', 'weight',
            'is_active', 'stock_quantity', 'display_price', 'created_at', 'updated_at'
        ]


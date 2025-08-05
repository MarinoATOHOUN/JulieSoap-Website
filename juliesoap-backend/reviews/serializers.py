from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    rating_display = serializers.CharField(source='get_rating_display', read_only=True)
    
    class Meta:
        model = Review
        fields = [
            'id', 'product', 'product_name', 'customer_name',
            'customer_email', 'rating', 'rating_display', 'comment',
            'is_approved', 'created_at', 'updated_at'
        ]
        read_only_fields = ['is_approved']


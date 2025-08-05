from rest_framework import serializers
from .models import Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    subscription_type_display = serializers.CharField(source='get_subscription_type_display', read_only=True)
    
    class Meta:
        model = Subscription
        fields = [
            'id', 'name', 'email', 'phone', 'subscription_type',
            'subscription_type_display', 'is_active', 'receive_promotions',
            'receive_new_products', 'created_at', 'updated_at'
        ]


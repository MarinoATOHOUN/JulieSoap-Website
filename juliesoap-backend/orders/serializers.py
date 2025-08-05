from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_details = ProductSerializer(source='product', read_only=True)
    
    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'product_name', 'product_details',
            'quantity', 'unit_price', 'total_price'
        ]

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'delivery_address', 'status', 'status_display', 'total_amount',
            'notes', 'items', 'created_at', 'updated_at'
        ]

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    
    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_email', 'customer_phone',
            'delivery_address', 'notes', 'items'
        ]
    
    def create(self, validated_data):
        items_data = validated_data.pop('items')
        
        # Calculer le total
        total_amount = 0
        for item_data in items_data:
            total_amount += item_data['quantity'] * item_data['unit_price']
        
        validated_data['total_amount'] = total_amount
        order = Order.objects.create(**validated_data)
        
        # Créer les items
        for item_data in items_data:
            OrderItem.objects.create(order=order, **item_data)
        
        return order


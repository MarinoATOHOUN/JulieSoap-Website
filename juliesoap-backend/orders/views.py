from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer, OrderCreateSerializer

class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderCreateSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        order = serializer.save()
        # Retourner la commande créée avec tous les détails
        response_serializer = OrderSerializer(order)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

class OrderListView(generics.ListAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    ordering = ['-created_at']

class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

@api_view(['GET'])
def order_stats(request):
    """Statistiques des commandes pour l'admin"""
    stats = {
        'total_orders': Order.objects.count(),
        'pending_orders': Order.objects.filter(status='pending').count(),
        'confirmed_orders': Order.objects.filter(status='confirmed').count(),
        'delivered_orders': Order.objects.filter(status='delivered').count(),
        'cancelled_orders': Order.objects.filter(status='cancelled').count(),
    }
    return Response(stats)


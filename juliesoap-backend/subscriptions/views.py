from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Subscription
from .serializers import SubscriptionSerializer

class SubscriptionCreateView(generics.CreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class SubscriptionListView(generics.ListAPIView):
    queryset = Subscription.objects.filter(is_active=True)
    serializer_class = SubscriptionSerializer
    ordering = ['-created_at']

@api_view(['GET'])
def subscription_stats(request):
    """Statistiques des abonnements pour l'admin"""
    stats = {
        'total_subscriptions': Subscription.objects.count(),
        'active_subscriptions': Subscription.objects.filter(is_active=True).count(),
        'email_subscriptions': Subscription.objects.filter(
            subscription_type__in=['email', 'both']
        ).count(),
        'whatsapp_subscriptions': Subscription.objects.filter(
            subscription_type__in=['whatsapp', 'both']
        ).count(),
    }
    return Response(stats)


from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import models
from .models import Review
from .serializers import ReviewSerializer

class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        queryset = Review.objects.filter(is_approved=True)
        product_id = self.request.query_params.get('product', None)
        if product_id is not None:
            queryset = queryset.filter(product=product_id)
        return queryset.order_by('-created_at')

@api_view(['GET'])
def review_stats(request):
    """Statistiques des avis pour l'admin"""
    stats = {
        'total_reviews': Review.objects.count(),
        'approved_reviews': Review.objects.filter(is_approved=True).count(),
        'pending_reviews': Review.objects.filter(is_approved=False).count(),
        'average_rating': Review.objects.filter(is_approved=True).aggregate(
            avg_rating=models.Avg('rating')
        )['avg_rating'] or 0,
    }
    return Response(stats)


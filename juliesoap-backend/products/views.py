from rest_framework import generics, filters
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'product_type', 'is_wholesale_only']
    search_fields = ['name', 'description', 'ingredients']
    ordering_fields = ['price', 'created_at', 'name']
    ordering = ['-created_at']

class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer

@api_view(['GET'])
def product_stats(request):
    """Statistiques des produits pour l'admin"""
    stats = {
        'total_products': Product.objects.count(),
        'active_products': Product.objects.filter(is_active=True).count(),
        'categories_count': Category.objects.count(),
        'wholesale_products': Product.objects.filter(is_wholesale_only=True).count(),
        'cosmetic_products': Product.objects.filter(product_type='cosmetic').count(),
        'laundry_products': Product.objects.filter(product_type='laundry').count(),
    }
    return Response(stats)


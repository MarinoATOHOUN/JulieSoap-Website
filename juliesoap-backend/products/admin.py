from django.contrib import admin
from .models import Product, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'created_at']
    search_fields = ['name']
    list_filter = ['created_at']

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'category', 'product_type', 'price', 'is_wholesale_only',
        'is_active', 'stock_quantity', 'created_at'
    ]
    list_filter = [
        'category', 'product_type', 'is_wholesale_only', 'is_active', 'created_at'
    ]
    search_fields = ['name', 'description', 'ingredients']
    list_editable = ['is_active', 'stock_quantity', 'price']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Informations générales', {
            'fields': ('name', 'description', 'category', 'product_type', 'image')
        }),
        ('Prix et vente', {
            'fields': ('price', 'is_wholesale_only', 'pieces_per_carton', 'carton_price')
        }),
        ('Caractéristiques', {
            'fields': ('ingredients', 'skin_types', 'weight')
        }),
        ('Stock et statut', {
            'fields': ('stock_quantity', 'is_active')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('category')


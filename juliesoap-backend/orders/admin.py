from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['total_price']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'customer_name', 'customer_phone', 'status',
        'total_amount', 'created_at'
    ]
    list_filter = ['status', 'created_at']
    search_fields = ['customer_name', 'customer_email', 'customer_phone']
    list_editable = ['status']
    readonly_fields = ['created_at', 'updated_at', 'total_amount']
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Informations client', {
            'fields': ('customer_name', 'customer_email', 'customer_phone', 'delivery_address')
        }),
        ('Commande', {
            'fields': ('status', 'total_amount', 'notes')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('items__product')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['order', 'product', 'quantity', 'unit_price', 'total_price']
    list_filter = ['order__status', 'product__category']
    readonly_fields = ['total_price']


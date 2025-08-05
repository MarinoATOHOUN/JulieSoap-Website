from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        'customer_name', 'product', 'rating', 'is_approved', 'created_at'
    ]
    list_filter = ['rating', 'is_approved', 'created_at', 'product__category']
    search_fields = ['customer_name', 'customer_email', 'comment', 'product__name']
    list_editable = ['is_approved']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Avis', {
            'fields': ('product', 'customer_name', 'customer_email', 'rating', 'comment')
        }),
        ('Modération', {
            'fields': ('is_approved',)
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('product')
    
    actions = ['approve_reviews', 'disapprove_reviews']
    
    def approve_reviews(self, request, queryset):
        updated = queryset.update(is_approved=True)
        self.message_user(request, f'{updated} avis approuvés.')
    approve_reviews.short_description = "Approuver les avis sélectionnés"
    
    def disapprove_reviews(self, request, queryset):
        updated = queryset.update(is_approved=False)
        self.message_user(request, f'{updated} avis désapprouvés.')
    disapprove_reviews.short_description = "Désapprouver les avis sélectionnés"


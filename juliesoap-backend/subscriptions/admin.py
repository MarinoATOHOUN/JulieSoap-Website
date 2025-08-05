from django.contrib import admin
from .models import Subscription

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'email', 'phone', 'subscription_type', 'is_active', 'created_at'
    ]
    list_filter = ['subscription_type', 'is_active', 'receive_promotions', 'receive_new_products', 'created_at']
    search_fields = ['name', 'email', 'phone']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Informations contact', {
            'fields': ('name', 'email', 'phone', 'subscription_type')
        }),
        ('Préférences', {
            'fields': ('is_active', 'receive_promotions', 'receive_new_products')
        }),
        ('Dates', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    actions = ['activate_subscriptions', 'deactivate_subscriptions']
    
    def activate_subscriptions(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f'{updated} abonnements activés.')
    activate_subscriptions.short_description = "Activer les abonnements sélectionnés"
    
    def deactivate_subscriptions(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f'{updated} abonnements désactivés.')
    deactivate_subscriptions.short_description = "Désactiver les abonnements sélectionnés"


from django.db import models

class Subscription(models.Model):
    SUBSCRIPTION_TYPES = [
        ('email', 'Newsletter Email'),
        ('whatsapp', 'Abonnement WhatsApp'),
        ('both', 'Email et WhatsApp'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=20, blank=True)
    subscription_type = models.CharField(max_length=20, choices=SUBSCRIPTION_TYPES)
    
    # Préférences
    is_active = models.BooleanField(default=True)
    receive_promotions = models.BooleanField(default=True)
    receive_new_products = models.BooleanField(default=True)
    
    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.get_subscription_type_display()}"
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if self.subscription_type in ['email', 'both'] and not self.email:
            raise ValidationError('Email requis pour ce type d\'abonnement')
        if self.subscription_type in ['whatsapp', 'both'] and not self.phone:
            raise ValidationError('Téléphone requis pour ce type d\'abonnement')


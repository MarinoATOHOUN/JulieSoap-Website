from django.db import models
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('processing', 'En traitement'),
        ('shipped', 'Expédiée'),
        ('delivered', 'Livrée'),
        ('cancelled', 'Annulée'),
    ]
    
    # Informations client
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    customer_phone = models.CharField(max_length=20)
    delivery_address = models.TextField()
    
    # Informations commande
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)  # Total en FCFA
    notes = models.TextField(blank=True)
    
    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"Commande #{self.id} - {self.customer_name}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)  # Prix unitaire en FCFA
    total_price = models.DecimalField(max_digits=12, decimal_places=2)  # Prix total pour cet item
    
    def save(self, *args, **kwargs):
        self.total_price = self.quantity * self.unit_price
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"


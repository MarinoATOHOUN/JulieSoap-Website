from django.db import models
from products.models import Product

class Review(models.Model):
    RATING_CHOICES = [
        (1, '1 étoile'),
        (2, '2 étoiles'),
        (3, '3 étoiles'),
        (4, '4 étoiles'),
        (5, '5 étoiles'),
    ]
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    customer_name = models.CharField(max_length=200)
    customer_email = models.EmailField()
    rating = models.IntegerField(choices=RATING_CHOICES)
    comment = models.TextField()
    
    # Statut de modération
    is_approved = models.BooleanField(default=False)
    
    # Dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        unique_together = ['product', 'customer_email']  # Un avis par email par produit
    
    def __str__(self):
        return f"Avis de {self.customer_name} - {self.product.name} ({self.rating}/5)"


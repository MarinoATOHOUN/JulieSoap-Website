from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name

class Product(models.Model):
    PRODUCT_TYPES = [
        ('cosmetic', 'Cosmétique'),
        ('laundry', 'Lessive'),
        ('oil', 'Huile'),
        ('balm', 'Baume'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    price = models.DecimalField(max_digits=10, decimal_places=2)  # Prix en FCFA
    
    # Pour les savons de lessive vendus en gros
    is_wholesale_only = models.BooleanField(default=False)
    pieces_per_carton = models.IntegerField(null=True, blank=True)  # 50 pour les savons de lessive
    carton_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # 12000 FCFA
    
    # Images et caractéristiques
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    ingredients = models.TextField(blank=True)
    skin_types = models.CharField(max_length=200, blank=True)  # Pour tous les teints
    weight = models.CharField(max_length=50, blank=True)
    
    # Statut et dates
    is_active = models.BooleanField(default=True)
    stock_quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    @property
    def display_price(self):
        if self.is_wholesale_only:
            return f"{self.carton_price} FCFA/carton ({self.pieces_per_carton} pièces)"
        return f"{self.price} FCFA"


import React, { useState, useEffect } from 'react';
import { Plus, Filter, Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import apiService from '../services/api';

const Products = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Charger les données depuis l'API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Charger les catégories et produits en parallèle
        const [categoriesData, productsData] = await Promise.all([
          apiService.getCategories(),
          apiService.getProducts()
        ]);
        
        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
        // En cas d'erreur, utiliser les données de fallback
        setCategories([
          { id: 1, name: 'Savons Cosmétiques' },
          { id: 2, name: 'Savons de Lessive' },
          { id: 3, name: 'Huiles Naturelles' },
          { id: 4, name: 'Baumes' }
        ]);
        setProducts([
          {
            id: 1,
            name: 'Savon Cosmétique Karité',
            description: 'Savon naturel au beurre de karité pour tous les teints',
            price: 2500,
            category: { id: 1, name: 'Savons Cosmétiques' },
            category_name: 'Savons Cosmétiques',
            product_type: 'cosmetic',
            is_wholesale_only: false,
            skin_types: 'Tous les teints',
            ingredients: 'Beurre de karité, huile de coco, glycérine naturelle',
            stock_quantity: 50,
            image: null
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category.toString() === selectedCategory;
    const matchesType = selectedType === 'all' || product.product_type === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const getProductTypeLabel = (type) => {
    const types = {
      'cosmetic': 'Cosmétique',
      'laundry': 'Lessive',
      'oil': 'Huile',
      'balm': 'Baume'
    };
    return types[type] || type;
  };

  const formatPrice = (product) => {
    if (product.is_wholesale_only) {
      return `${parseFloat(product.carton_price || 0).toLocaleString()} FCFA/carton (${product.pieces_per_carton} pièces)`;
    }
    return `${parseFloat(product.price || 0).toLocaleString()} FCFA`;
  };

  if (loading) {
    return (
      <section id="produits" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nos Produits</h2>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="produits" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 juliesoap-text-gradient">Nos Produits</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits naturels africains, 
            fabriqués avec amour et expertise.
          </p>
        </div>

        {/* Filtres */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="cosmetic">Cosmétique</SelectItem>
                  <SelectItem value="laundry">Lessive</SelectItem>
                  <SelectItem value="oil">Huile</SelectItem>
                  <SelectItem value="balm">Baume</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Grille de produits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="product-card-hover bg-white">
              <CardHeader className="pb-4">
                <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-muted-foreground text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-2 flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-sm">Image à venir</p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {getProductTypeLabel(product.product_type)}
                    </Badge>
                    {product.is_wholesale_only && (
                      <Badge variant="outline" className="text-xs">
                        Gros uniquement
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pb-4">
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                
                {product.skin_types && (
                  <p className="text-xs text-primary mb-2">
                    <strong>Pour:</strong> {product.skin_types}
                  </p>
                )}
                
                <div className="text-lg font-bold text-primary">
                  {formatPrice(product)}
                </div>
                
                <p className="text-xs text-muted-foreground mt-1">
                  Stock: {product.stock_quantity} disponible(s)
                </p>
              </CardContent>

              <CardFooter>
                <Button 
                  className="w-full juliesoap-gradient hover:opacity-90"
                  onClick={() => onAddToCart(product)}
                  disabled={product.stock_quantity === 0}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {product.stock_quantity === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Aucun produit trouvé avec ces critères.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;


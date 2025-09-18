import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';

const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [showCheckout, setShowCheckout] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.is_wholesale_only ? item.carton_price : item.price;
    return total + (price * item.quantity);
  }, 0);

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const orderData = {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      delivery_address: customerInfo.address,
      notes: customerInfo.notes,
      items: cartItems.map(item => {
        const unitPrice = parseFloat(item.is_wholesale_only ? item.carton_price : item.price);
        return {
          product: item.id,
          quantity: item.quantity,
          unit_price: unitPrice,
          total_price: unitPrice * item.quantity
        };
      })
    };


    // Validation supplémentaire
    const hasInvalidItem = orderData.items.some(item =>
      typeof item.product !== 'number' ||
      typeof item.quantity !== 'number' ||
      typeof item.unit_price !== 'number' ||
      isNaN(item.product) || isNaN(item.quantity) || isNaN(item.unit_price)
    );
    if (hasInvalidItem) {
      alert('Erreur: Un ou plusieurs articles du panier ont des valeurs invalides.');
      return;
    }

    onCheckout(orderData);
    setShowCheckout(false);
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      notes: ''
    });
  };

  const formatPrice = (item) => {
    if (item.is_wholesale_only) {
      return `${item.carton_price?.toLocaleString()} FCFA/carton`;
    }
    return `${item.price?.toLocaleString()} FCFA`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingCart className="w-6 h-6" />
            Panier ({cartItems.length})
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {!showCheckout ? (
            <div className="p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">Votre panier est vide</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.description}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              {item.product_type === 'cosmetic' ? 'Cosmétique' :
                               item.product_type === 'laundry' ? 'Lessive' :
                               item.product_type === 'oil' ? 'Huile' : 'Baume'}
                            </Badge>
                            {item.is_wholesale_only && (
                              <Badge variant="outline" className="text-xs">
                                Gros uniquement ({item.pieces_per_carton} pièces)
                              </Badge>
                            )}
                          </div>
                          <div className="text-lg font-bold text-primary">
                            {formatPrice(item)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-12 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{totalAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-6">Informations de commande</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Téléphone *</Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+228 98732473"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Adresse de livraison *</Label>
                  <Textarea
                    id="address"
                    value={customerInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Votre adresse complète de livraison"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    value={customerInfo.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Instructions spéciales, préférences..."
                    rows={2}
                  />
                </div>

                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Résumé de la commande</h4>
                  <div className="space-y-1 text-sm">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{((item.is_wholesale_only ? item.carton_price : item.price) * item.quantity).toLocaleString()} FCFA</span>
                      </div>
                    ))}
                    <div className="border-t pt-2 font-semibold flex justify-between">
                      <span>Total:</span>
                      <span>{totalAmount.toLocaleString()} FCFA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-6">
          {!showCheckout ? (
            <div className="flex gap-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Continuer les achats
              </Button>
              {cartItems.length > 0 && (
                <Button 
                  onClick={() => setShowCheckout(true)}
                  className="flex-1 juliesoap-gradient hover:opacity-90"
                >
                  Passer commande
                </Button>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCheckout(false)}
                className="flex-1"
              >
                Retour au panier
              </Button>
              <Button 
                onClick={handleCheckout}
                className="flex-1 juliesoap-gradient hover:opacity-90"
              >
                Confirmer la commande
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;


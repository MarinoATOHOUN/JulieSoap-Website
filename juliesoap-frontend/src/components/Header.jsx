import React, { useState } from 'react';
import { Menu, X, ShoppingCart, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import juliesoapLogo from '../assets/juliesoap_logo.jpeg';

const Header = ({ cartItems = [], onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+228 98 73 24 73</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>contact@juliesoap.tg</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Togo/Anié - Produits Naturels Africains</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={juliesoapLogo} 
              alt="JulieSoap Logo" 
              className="h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold juliesoap-text-gradient">JulieSoap</h1>
              <p className="text-sm text-muted-foreground">Produits Naturels</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#accueil" className="text-foreground hover:text-primary transition-colors font-medium">
              Accueil
            </a>
            <a href="#produits" className="text-foreground hover:text-primary transition-colors font-medium">
              Produits
            </a>
            <a href="#apropos" className="text-foreground hover:text-primary transition-colors font-medium">
              À Propos
            </a>
            <a href="#temoignages" className="text-foreground hover:text-primary transition-colors font-medium">
              Témoignages
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <Button
              variant="outline"
              size="sm"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-4">
              <a 
                href="#accueil" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </a>
              <a 
                href="#produits" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </a>
              <a 
                href="#apropos" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </a>
              <a 
                href="#temoignages" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </a>
              <a 
                href="#contact" 
                className="text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;


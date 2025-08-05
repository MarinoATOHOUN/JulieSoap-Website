import React from 'react';
import { ArrowRight, Leaf, Award, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

const Hero = () => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center hero-pattern natural-texture">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Leaf className="w-4 h-4" />
                100% Naturel & Africain
              </div>
              
              <h1 className="hero-title text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="juliesoap-text-gradient">JulieSoap</span>
                <br />
                Beauté Naturelle
              </h1>
              
              <p className="hero-subtitle text-xl text-muted-foreground max-w-lg">
                Découvrez nos produits cosmétiques et savons naturels africains, 
                créés avec passion par Mme Françoise Kédagni au Togo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="juliesoap-gradient hover:opacity-90 transition-opacity"
                onClick={() => document.getElementById('produits')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Découvrir nos Produits
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('apropos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Notre Histoire
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">2+</div>
                <div className="text-sm text-muted-foreground">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Employés expérimentés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Produits naturels</div>
              </div>
            </div>
          </div>

          {/* Features Cards */}
          <div className="space-y-6">
            <Card className="p-6 product-card-hover bg-white/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Ingrédients Naturels</h3>
                  <p className="text-muted-foreground">
                    Nos produits sont fabriqués exclusivement avec des ingrédients 
                    naturels africains, sans produits chimiques nocifs.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 product-card-hover bg-white/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Qualité Artisanale</h3>
                  <p className="text-muted-foreground">
                    Chaque produit est fabriqué avec soin par notre équipe 
                    d'artisans expérimentés au Togo.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 product-card-hover bg-white/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Pour Tous les Teints</h3>
                  <p className="text-muted-foreground">
                    Nos savons cosmétiques sont spécialement formulés 
                    pour convenir à tous les types de peau.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-10 animate-float">
        <div className="w-20 h-20 bg-primary/10 rounded-full blur-xl"></div>
      </div>
      <div className="absolute bottom-20 left-10 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-16 h-16 bg-accent/10 rounded-full blur-xl"></div>
      </div>
    </section>
  );
};

export default Hero;


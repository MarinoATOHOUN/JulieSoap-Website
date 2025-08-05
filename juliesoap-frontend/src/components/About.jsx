import React from 'react';
import { Users, MapPin, Award, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import juliesoapLogo from '../assets/juliesoap_logo.jpeg';

const About = () => {
  return (
    <section id="apropos" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold juliesoap-text-gradient">
                Notre Histoire
              </h2>
              <p className="text-xl text-muted-foreground">
                JulieSoap, une passion pour la beauté naturelle africaine
              </p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Fondée par <strong className="text-primary">Mme Françoise Kédagni</strong>, 
                JulieSoap est née d'une passion profonde pour les traditions cosmétiques 
                africaines et d'un engagement envers la beauté naturelle.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Basée à <strong className="text-primary">Anié, au Togo</strong>, notre 
                entreprise s'est spécialisée dans la création de produits cosmétiques 
                et savons naturels, utilisant exclusivement des ingrédients africains 
                de première qualité.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Avec plus de <strong className="text-primary">2 années d'expérience</strong> 
                et une équipe de <strong className="text-primary">5 employés expérimentés</strong>, 
                nous nous engageons à offrir des produits qui respectent votre peau et 
                l'environnement.
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-1">2+</div>
                  <div className="text-sm text-muted-foreground">Années d'expérience</div>
                </CardContent>
              </Card>
              
              <Card className="p-4 text-center">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-primary mb-1">5+</div>
                  <div className="text-sm text-muted-foreground">Employés expérimentés</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Image and Features */}
          <div className="space-y-8">
            {/* Logo/Image */}
            <div className="text-center">
              <div className="inline-block p-8 bg-muted/30 rounded-2xl">
                <img 
                  src={juliesoapLogo} 
                  alt="JulieSoap - Mme Françoise Kédagni" 
                  className="w-48 h-auto mx-auto object-contain"
                />
              </div>
              <p className="mt-4 text-lg font-semibold text-primary">
                Mme Françoise Kédagni
              </p>
              <p className="text-muted-foreground">
                Fondatrice et Directrice
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Localisation</h4>
                  <p className="text-muted-foreground">Togo/Anié</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Équipe Expérimentée</h4>
                  <p className="text-muted-foreground">Plus de 5 employés qualifiés</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Qualité Premium</h4>
                  <p className="text-muted-foreground">Produits 100% naturels africains</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Pour Tous les Teints</h4>
                  <p className="text-muted-foreground">Adaptés à tous les types de peau</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold mb-4 text-primary">Notre Mission</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Chez JulieSoap, nous nous engageons à préserver et valoriser les traditions 
                cosmétiques africaines en créant des produits naturels de haute qualité. 
                Notre mission est de vous offrir le meilleur de la nature africaine pour 
                révéler votre beauté authentique, tout en respectant l'environnement et 
                en soutenant l'économie locale togolaise.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;


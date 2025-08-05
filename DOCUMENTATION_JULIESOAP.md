# Documentation Technique - Plateforme E-commerce JulieSoap

## Vue d'ensemble du projet

La plateforme e-commerce JulieSoap est une solution complète développée pour **Mme Françoise Kédagni**, fondatrice et directrice de JulieSoap, basée à Anié au Togo. Cette plateforme permet la vente en ligne de produits cosmétiques et savons naturels africains, avec une interface d'administration complète pour la gestion autonome du site.

### Informations de l'entreprise
- **Nom de l'entreprise** : JulieSoap
- **Fondatrice et Directrice** : Mme Françoise Kédagni
- **Localisation** : Togo/Anié
- **Spécialité** : Produits cosmétiques et savons naturels africains
- **Équipe** : Plus de 5 employés expérimentés
- **Ancienneté** : 2+ années d'expérience
- **Particularité** : Savons de lessive vendus uniquement en gros (1 carton = 50 morceaux à 12 000 FCFA)

## Architecture Technique

### Stack Technologique
- **Frontend** : React.js 18+ avec Vite
- **Backend** : Django 4+ avec Django REST Framework
- **Base de données** : SQLite (développement) / PostgreSQL (production recommandée)
- **Styling** : Tailwind CSS avec shadcn/ui
- **API** : REST API avec authentification et CORS
- **Devise** : FCFA (Franc CFA)

### Structure du projet
```
juliesoap-project/
├── juliesoap-backend/          # Backend Django
│   ├── juliesoap_backend/      # Configuration principale
│   ├── products/               # Gestion des produits
│   ├── orders/                 # Gestion des commandes
│   ├── reviews/                # Gestion des avis
│   ├── subscriptions/          # Gestion des abonnements
│   └── static/                 # Fichiers statiques (logo, images)
└── juliesoap-frontend/         # Frontend React
    ├── src/
    │   ├── components/         # Composants React
    │   ├── services/           # Services API
    │   └── assets/             # Assets (logo, images)
    └── dist/                   # Build de production
```



## Backend Django - API REST

### Configuration principale

Le backend Django est configuré avec les applications suivantes :
- `products` : Gestion des produits et catégories
- `orders` : Gestion des commandes et articles de commande
- `reviews` : Gestion des avis clients
- `subscriptions` : Gestion des abonnements newsletter/WhatsApp

### Modèles de données

#### Modèle Category
```python
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
```

#### Modèle Product
```python
class Product(models.Model):
    PRODUCT_TYPES = [
        ('cosmetic', 'Cosmétique'),
        ('laundry', 'Lessive'),
        ('oil', 'Huile'),
        ('balm', 'Baume'),
    ]
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPES)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    is_wholesale_only = models.BooleanField(default=False)
    pieces_per_carton = models.IntegerField(null=True, blank=True)
    carton_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    ingredients = models.TextField(blank=True)
    skin_types = models.CharField(max_length=200, blank=True)
    weight = models.CharField(max_length=50, blank=True)
    is_active = models.BooleanField(default=True)
    stock_quantity = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### Modèle Order
```python
class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('confirmed', 'Confirmée'),
        ('processing', 'En traitement'),
        ('shipped', 'Expédiée'),
        ('delivered', 'Livrée'),
        ('cancelled', 'Annulée'),
    ]
    
    customer_name = models.CharField(max_length=200)
    customer_phone = models.CharField(max_length=20)
    customer_email = models.EmailField()
    delivery_address = models.TextField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
```

#### Modèle OrderItem
```python
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
```

### API Endpoints

#### Produits
- `GET /api/products/` : Liste tous les produits avec filtres
- `GET /api/products/{id}/` : Détails d'un produit
- `GET /api/categories/` : Liste toutes les catégories

#### Commandes
- `POST /api/orders/create/` : Créer une nouvelle commande
- `GET /api/orders/` : Liste des commandes (admin)
- `GET /api/orders/{id}/` : Détails d'une commande

#### Avis
- `GET /api/reviews/` : Liste des avis avec filtres
- `POST /api/reviews/create/` : Créer un nouvel avis

#### Abonnements
- `POST /api/subscriptions/create/` : Créer un abonnement
- `GET /api/subscriptions/` : Liste des abonnements (admin)

### Interface d'administration Django

L'interface d'administration est accessible via `/admin/` avec les fonctionnalités suivantes :

#### Gestion des produits
- Ajout, modification, suppression de produits
- Gestion des catégories
- Upload d'images de produits
- Gestion des stocks
- Filtres par catégorie, type, prix, statut

#### Gestion des commandes
- Visualisation de toutes les commandes
- Changement de statut des commandes
- Détails des articles commandés
- Filtres par statut, date de création
- Informations clients complètes

#### Gestion des avis
- Modération des avis clients
- Approbation/rejet des avis
- Filtres par produit, note, date

#### Gestion des abonnements
- Liste des abonnés newsletter
- Abonnements WhatsApp
- Export des données pour marketing

### Authentification et sécurité
- Interface admin protégée par authentification Django
- CORS configuré pour le frontend React
- Validation des données côté serveur
- Protection CSRF activée


## Frontend React - Interface Utilisateur

### Technologies utilisées
- **React 18+** avec hooks modernes
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **Lucide React** pour les icônes

### Structure des composants

#### Composant Header
- Logo JulieSoap intégré
- Navigation principale (Accueil, Produits, À Propos, Témoignages, Contact)
- Indicateur de panier avec compteur d'articles
- Design responsive avec menu mobile

#### Composant Hero
- Section d'accueil avec branding fort
- Mise en avant des valeurs : 100% Naturel & Africain
- Statistiques de l'entreprise (2+ années, 5+ employés, 100% naturel)
- Boutons d'action vers les produits et l'histoire

#### Composant Products
- Affichage en grille des produits
- Filtres par catégorie et type de produit
- Barre de recherche
- Badges pour identifier les types (Cosmétique, Lessive, Huile, Baume)
- Badge "Gros uniquement" pour les savons de lessive
- Affichage des prix en FCFA
- Gestion des stocks avec indication de disponibilité
- Boutons d'ajout au panier

#### Composant About
- Histoire de JulieSoap et de Mme Françoise Kédagni
- Informations sur la localisation (Togo/Anié)
- Mise en avant de l'équipe et de l'expérience
- Mission et valeurs de l'entreprise

#### Composant Cart
- Modal de panier avec liste des articles
- Gestion des quantités
- Calcul automatique du total en FCFA
- Formulaire de commande avec validation
- Champs obligatoires : nom, téléphone, email, adresse
- Résumé de commande avant confirmation

### Branding et Design

#### Palette de couleurs
- **Couleurs principales** : Verts naturels, beiges, bruns terre
- **Couleurs d'accent** : Rose/violet pour le logo JulieSoap
- **Arrière-plan** : Tons neutres et naturels

#### Typographie
- Police moderne et lisible
- Hiérarchie claire des titres
- Texte optimisé pour la lecture

#### Logo et identité visuelle
- Logo JulieSoap intégré dans le header
- Design cohérent avec l'identité africaine
- Éléments visuels rappelant les produits naturels

### Fonctionnalités utilisateur

#### Navigation et découverte
- Navigation fluide entre les sections
- Recherche de produits par nom ou description
- Filtrage par catégorie et type
- Affichage responsive sur tous les appareils

#### Processus d'achat
1. **Sélection de produits** : Parcours du catalogue avec filtres
2. **Ajout au panier** : Gestion des quantités et types de produits
3. **Révision du panier** : Modification des quantités, suppression d'articles
4. **Saisie des informations** : Formulaire client avec validation
5. **Confirmation** : Résumé de commande et validation finale
6. **Enregistrement** : Sauvegarde automatique en base de données

#### Gestion des produits spéciaux
- **Savons de lessive** : Affichage du prix par carton (50 pièces)
- **Produits cosmétiques** : Information sur les types de peau
- **Huiles et baumes** : Mise en avant des ingrédients naturels

### Service API
Le frontend communique avec le backend via un service API centralisé :

```javascript
class ApiService {
  async getProducts(params = {}) { /* ... */ }
  async createOrder(orderData) { /* ... */ }
  async getCategories() { /* ... */ }
  async createReview(reviewData) { /* ... */ }
  async createSubscription(subscriptionData) { /* ... */ }
}
```

### Optimisations
- **Performance** : Lazy loading des composants
- **SEO** : Meta tags optimisés
- **Accessibilité** : Navigation au clavier, alt texts
- **Mobile** : Design responsive avec touch support
- **Chargement** : Indicateurs de chargement pour les API calls


## Installation et Configuration

### Prérequis
- Python 3.11+
- Node.js 20+
- npm ou yarn

### Installation du Backend Django

1. **Créer un environnement virtuel** :
```bash
python -m venv juliesoap_env
source juliesoap_env/bin/activate  # Linux/Mac
# ou
juliesoap_env\Scripts\activate     # Windows
```

2. **Installer les dépendances** :
```bash
cd juliesoap_backend
pip install django djangorestframework django-cors-headers django-filter pillow
```

3. **Configurer la base de données** :
```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Créer un superutilisateur** :
```bash
python manage.py createsuperuser
# Utiliser : admin / admin123 (ou vos propres identifiants)
```

5. **Ajouter des données de test** :
```bash
python manage.py shell
# Exécuter le script de création des catégories et produits
```

6. **Démarrer le serveur** :
```bash
python manage.py runserver 0.0.0.0:8000
```

### Installation du Frontend React

1. **Installer les dépendances** :
```bash
cd juliesoap-frontend
npm install
```

2. **Démarrer le serveur de développement** :
```bash
npm run dev
```

3. **Build de production** :
```bash
npm run build
```

### Configuration des URLs

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:8000/api/
- **Interface Admin** : http://localhost:8000/admin/

## Guide d'utilisation

### Pour l'administrateur (Mme Françoise Kédagni)

#### Accès à l'interface d'administration
1. Aller sur http://localhost:8000/admin/
2. Se connecter avec les identifiants admin
3. Accéder aux différentes sections de gestion

#### Gestion des produits
1. **Ajouter un produit** :
   - Cliquer sur "Products" > "Add"
   - Remplir les informations : nom, description, catégorie, prix
   - Pour les savons de lessive : cocher "Is wholesale only" et remplir "Pieces per carton" et "Carton price"
   - Ajouter une image si disponible
   - Spécifier les ingrédients et types de peau
   - Définir le stock initial

2. **Modifier un produit** :
   - Cliquer sur "Products" > "Change"
   - Sélectionner le produit à modifier
   - Mettre à jour les informations nécessaires
   - Sauvegarder

3. **Gérer les stocks** :
   - Modifier le champ "Stock quantity" pour chaque produit
   - Les produits avec stock = 0 apparaîtront comme "Rupture de stock"

#### Gestion des commandes
1. **Consulter les commandes** :
   - Cliquer sur "Orders" > "Orders"
   - Voir la liste de toutes les commandes
   - Utiliser les filtres par statut ou date

2. **Traiter une commande** :
   - Cliquer sur une commande pour voir les détails
   - Voir les informations client et les produits commandés
   - Changer le statut selon l'avancement :
     - "En attente" → "Confirmée" → "En traitement" → "Expédiée" → "Livrée"

3. **Contacter les clients** :
   - Les informations de contact sont disponibles dans chaque commande
   - Téléphone et email pour confirmer et suivre les commandes

#### Gestion des catégories
1. **Ajouter une catégorie** :
   - Cliquer sur "Products" > "Categories" > "Add"
   - Remplir le nom et la description
   - Activer la catégorie

### Pour les clients

#### Navigation sur le site
1. **Découvrir les produits** :
   - Parcourir la section "Nos Produits"
   - Utiliser les filtres par catégorie ou type
   - Rechercher un produit spécifique

2. **Passer une commande** :
   - Ajouter des produits au panier
   - Cliquer sur l'icône panier (avec le nombre d'articles)
   - Vérifier les articles et quantités
   - Cliquer sur "Passer commande"
   - Remplir le formulaire avec les informations personnelles
   - Confirmer la commande

3. **Informations importantes** :
   - Les prix sont affichés en FCFA
   - Les savons de lessive sont vendus par carton de 50 pièces
   - La livraison se fait sur Lomé et environs
   - Le paiement se fait à la livraison

## Fonctionnalités Spéciales

### Gestion des savons de lessive
- Vente uniquement en gros (cartons de 50 pièces)
- Prix spécial : 12 000 FCFA par carton
- Badge "Gros uniquement" affiché sur le site
- Calcul automatique du prix total

### Système de commandes
- Enregistrement automatique en base de données
- Pas de paiement en ligne (contact direct)
- Informations client complètes collectées
- Suivi des commandes via l'interface admin

### Responsive Design
- Optimisé pour mobile et desktop
- Navigation tactile sur smartphones
- Affichage adaptatif des produits
- Menu mobile pour la navigation

### Branding JulieSoap
- Logo intégré dans toute l'interface
- Couleurs naturelles et africaines
- Mise en avant de l'origine togolaise
- Histoire et valeurs de l'entreprise


## Maintenance et Évolutions

### Tâches de maintenance régulières

#### Gestion des stocks
- Mettre à jour les quantités en stock après chaque livraison
- Marquer les produits en rupture de stock
- Ajouter de nouveaux produits selon les créations

#### Suivi des commandes
- Traiter les nouvelles commandes quotidiennement
- Mettre à jour les statuts selon l'avancement
- Contacter les clients pour confirmation et livraison

#### Gestion du contenu
- Ajouter de nouvelles photos de produits
- Mettre à jour les descriptions si nécessaire
- Gérer les avis clients

### Évolutions possibles

#### Fonctionnalités avancées
- **Système de paiement en ligne** : Intégration Mobile Money (MTN, Moov)
- **Gestion des livraisons** : Zones de livraison et frais de transport
- **Programme de fidélité** : Points et réductions pour clients réguliers
- **Notifications** : SMS/Email automatiques pour les commandes
- **Multi-langues** : Support français/anglais/éwé

#### Améliorations techniques
- **Base de données** : Migration vers PostgreSQL pour la production
- **Hébergement** : Déploiement sur serveur cloud (AWS, DigitalOcean)
- **CDN** : Optimisation des images et performances
- **Analytics** : Suivi des ventes et comportement clients
- **Backup** : Sauvegarde automatique des données

## Déploiement en Production

### Option 1 : Hébergement Cloud

#### Backend Django
1. **Serveur** : VPS ou cloud (DigitalOcean, AWS, Heroku)
2. **Base de données** : PostgreSQL
3. **Serveur web** : Nginx + Gunicorn
4. **SSL** : Certificat Let's Encrypt
5. **Domaine** : juliesoap.tg ou juliesoap.com

#### Frontend React
1. **CDN** : Netlify, Vercel, ou AWS CloudFront
2. **Build optimisé** : Compression et minification
3. **PWA** : Application web progressive pour mobile

### Option 2 : Hébergement Local

#### Serveur local au Togo
1. **Matériel** : Serveur dédié ou VPS local
2. **Connexion** : Internet stable avec IP fixe
3. **Maintenance** : Support technique local
4. **Coût** : Plus économique à long terme

### Configuration de production

#### Variables d'environnement
```bash
# Backend Django
DEBUG=False
ALLOWED_HOSTS=juliesoap.tg,www.juliesoap.tg
DATABASE_URL=postgresql://user:pass@localhost/juliesoap
SECRET_KEY=your-secret-key

# Frontend React
VITE_API_URL=https://api.juliesoap.tg
```

#### Sécurité
- HTTPS obligatoire
- Firewall configuré
- Sauvegardes automatiques
- Monitoring des performances

## Support et Contact

### Contact technique
Pour toute question technique ou problème :
- **Documentation** : Ce fichier contient toutes les informations nécessaires
- **Interface admin** : http://localhost:8000/admin/ pour la gestion quotidienne
- **Logs** : Vérifier les logs Django en cas d'erreur

### Formation utilisateur
Une formation peut être organisée pour :
- Utilisation de l'interface d'administration
- Gestion des produits et commandes
- Traitement des commandes clients
- Maintenance de base du site

### Évolutions futures
Pour ajouter de nouvelles fonctionnalités :
1. Analyser les besoins métier
2. Estimer la complexité technique
3. Planifier le développement
4. Tester en environnement de développement
5. Déployer en production

## Conclusion

La plateforme e-commerce JulieSoap est maintenant opérationnelle et prête à accompagner le développement de l'entreprise de Mme Françoise Kédagni. Elle offre :

✅ **Une solution complète** : Frontend client + Backend admin
✅ **Une gestion autonome** : Interface d'administration intuitive
✅ **Un branding fort** : Identité visuelle JulieSoap intégrée
✅ **Une architecture évolutive** : Possibilité d'ajouter de nouvelles fonctionnalités
✅ **Une approche locale** : Adaptée au marché togolais et à la devise FCFA

La plateforme respecte les spécificités de JulieSoap (vente en gros pour les savons de lessive, produits naturels africains, localisation togolaise) tout en offrant une expérience utilisateur moderne et professionnelle.

**Prochaines étapes recommandées** :
1. Formation de l'équipe JulieSoap sur l'utilisation de l'interface admin
2. Ajout de photos professionnelles des produits
3. Test avec des clients pilotes
4. Planification du déploiement en production
5. Mise en place d'une stratégie marketing digital

---

*Documentation créée le 3 août 2025 pour JulieSoap - Produits Cosmétiques Naturels Africains*
*Fondatrice : Mme Françoise Kédagni - Togo/Anié*


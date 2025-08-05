# Guide de Démarrage Rapide - JulieSoap

## 🚀 Démarrage en 5 minutes

### 1. Démarrer le Backend Django
```bash
cd juliesoap_backend
python manage.py runserver 0.0.0.0:8000
```
➡️ Backend accessible sur : http://localhost:8000

### 2. Démarrer le Frontend React
```bash
cd juliesoap-frontend
npm run dev
```
➡️ Site web accessible sur : http://localhost:5173

### 3. Accéder à l'administration
- URL : http://localhost:8000/admin/
- Identifiants : `admin` / `admin123`

## 📋 Actions rapides

### Ajouter un produit
1. Aller sur http://localhost:8000/admin/
2. Cliquer sur "Products" > "Add"
3. Remplir les informations du produit
4. Sauvegarder

### Voir une commande
1. Aller sur http://localhost:8000/admin/
2. Cliquer sur "Orders" > "Orders"
3. Cliquer sur une commande pour voir les détails

### Tester une commande
1. Aller sur http://localhost:5173
2. Ajouter des produits au panier
3. Cliquer sur l'icône panier
4. Remplir le formulaire de commande
5. Confirmer

## 🎯 URLs importantes
- **Site web** : http://localhost:5173
- **API** : http://localhost:8000/api/
- **Administration** : http://localhost:8000/admin/

## 📞 Informations JulieSoap
- **Entreprise** : JulieSoap
- **Fondatrice** : Mme Françoise Kédagni
- **Localisation** : Togo/Anié
- **Spécialité** : Produits cosmétiques naturels africains
- **Particularité** : Savons de lessive en gros (12 000 FCFA/carton de 50 pièces)

## 🔧 En cas de problème
1. Vérifier que les deux serveurs sont démarrés
2. Consulter la documentation complète : `DOCUMENTATION_JULIESOAP.md`
3. Vérifier les logs dans les terminaux


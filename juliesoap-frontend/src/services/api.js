// Configuration de l'API JulieSoap
const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Produits
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = queryString ? `/products/?${queryString}` : '/products/';
    return this.request(endpoint);
  }

  async getProduct(id) {
    return this.request(`/products/${id}/`);
  }

  // Catégories
  async getCategories() {
    return this.request('/categories/');
  }

  // Commandes
  async createOrder(orderData) {
    return this.request('/orders/create/', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrders() {
    return this.request('/orders/');
  }

  async getOrder(id) {
    return this.request(`/orders/${id}/`);
  }

  // Avis
  async getReviews(productId = null) {
    const endpoint = productId ? `/reviews/?product=${productId}` : '/reviews/';
    return this.request(endpoint);
  }

  async createReview(reviewData) {
    return this.request('/reviews/create/', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Abonnements
  async createSubscription(subscriptionData) {
    return this.request('/subscriptions/create/', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async getSubscriptions() {
    return this.request('/subscriptions/');
  }

  // Statistiques (pour l'admin)
  async getProductStats() {
    return this.request('/stats/');
  }

  async getOrderStats() {
    return this.request('/stats/');
  }

  async getReviewStats() {
    return this.request('/stats/');
  }

  async getSubscriptionStats() {
    return this.request('/stats/');
  }
}

// Instance singleton
const apiService = new ApiService();

export default apiService;


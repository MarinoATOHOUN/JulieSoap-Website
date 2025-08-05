from django.urls import path
from . import views

urlpatterns = [
    path('subscriptions/', views.SubscriptionListView.as_view(), name='subscription-list'),
    path('subscriptions/create/', views.SubscriptionCreateView.as_view(), name='subscription-create'),
    path('stats/', views.subscription_stats, name='subscription-stats'),
]


from django.urls import path
from . import views

urlpatterns = [
    path('reviews/', views.ReviewListView.as_view(), name='review-list'),
    path('reviews/create/', views.ReviewCreateView.as_view(), name='review-create'),
    path('stats/', views.review_stats, name='review-stats'),
]


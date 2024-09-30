from django.urls import path
from .views import UserCreateView, UserUpdateView, UserProfileView, LoginView, UserDeleteView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='user-register'),
    path('login/', LoginView.as_view(), name='user-login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),  # Fetch authenticated user profile
    path('profile/update/', UserUpdateView.as_view(), name='user-update'),  # Update authenticated user profile
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),  # Refresh access token using refresh token
    path('delete/<int:pk>/', UserDeleteView.as_view(), name='user-delete'),
]

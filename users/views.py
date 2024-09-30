from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.response import Response
from .serializers import UserSerializer, UserProfileSerializer
from .models import UserProfile
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

# User creation view (registration)
class UserCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User update view
class UserUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user_profile = request.user.userprofile  # Fetch the user's profile
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Get user profile (for the authenticated user)
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = request.user.userprofile  # Fetch the user's profile
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

# Session-based login view
class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(username=username, password=password)
        if user is not None:
            # Create JWT tokens
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        # if username == 'jvishani':
        #     return Response({'this works'})
        # else:
        #     return Response({"nope"})

class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]  # Only allow authenticated users

    def delete(self, request, pk=None):
        try:
            # Fetch the user to be deleted
            user = User.objects.get(pk=pk)
            
            # Allow only admins to delete other users
            # if request.user != user and not request.user.is_staff:
            #     return Response({"error": "You do not have permission to delete this user."}, status=status.HTTP_403_FORBIDDEN)

            # Delete the user
            user.delete()
            return Response({"message": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
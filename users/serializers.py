from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user
    def update(self, instance, validated_data):
        # Handle updating the user fields
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        
        # Don't update the password unless explicitly provided
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'role']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile

    def update(self, instance, validated_data):
        # Extract the nested user data
        user_data = validated_data.pop('user', {})

        # Update the nested user instance using the UserSerializer
        user_serializer = UserSerializer(instance=instance.user, data=user_data, partial=True)
        if user_serializer.is_valid():
            user_serializer.save()

        # Update the UserProfile-specific fields (e.g., role)
        instance.role = validated_data.get('role', instance.role)
        instance.save()

        return instance
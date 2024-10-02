from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    
    # User fields for addresses
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f'{self.user.username} - {self.user.get_full_name()}'

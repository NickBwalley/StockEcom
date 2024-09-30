from django.contrib.auth.models import User
from django.db import models

class UserProfile(models.Model):
    USER_ROLES = [
        ('customer', 'Customer'),
        ('seller', 'Seller'),
        ('admin', 'Admin'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=USER_ROLES, default='customer')

    def __str__(self):
        return f'{self.user.username} - {self.get_role_display()}'

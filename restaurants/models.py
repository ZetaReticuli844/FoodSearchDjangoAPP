from django.db import models
from django.db.models import Q

class RestaurantManager(models.Manager):
    def search(self, query):
        lookups = Q(name__icontains=query)
        return self.filter(lookups).distinct()

class MenuItemManager(models.Manager):
    def search(self, query):
        lookups = Q(name__icontains=query) | Q(restaurant__name__icontains=query)
        return self.filter(lookups).distinct()

class Restaurant(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    latitude = models.FloatField()
    longitude = models.FloatField()
    full_details = models.JSONField()
    objects = RestaurantManager()

    def __str__(self):
        return self.name

class MenuItem(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='menu_items')
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    objects = MenuItemManager()

    def __str__(self):
        return f"{self.name} - {self.price}"
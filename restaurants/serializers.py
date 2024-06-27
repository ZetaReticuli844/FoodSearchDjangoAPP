from rest_framework import serializers
from .models import Restaurant, MenuItem

class NestedMenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = ['name', 'price']

class RestaurantSerializer(serializers.ModelSerializer):
    menu = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Restaurant
        fields = ['name', 'location', 'full_details', 'menu']

    def get_menu(self, obj):
        menu_items = MenuItem.objects.filter(restaurant=obj)
        return NestedMenuItemSerializer(menu_items, many=True).data

class MenuItemSerializer(serializers.ModelSerializer):
    restaurant_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = MenuItem
        fields = ['name', 'price', 'restaurant_name']

    def get_restaurant_name(self, obj):
        return obj.restaurant.name
from django.shortcuts import render
from django.db.models import Q
from rest_framework import generics
from restaurants.models import Restaurant, MenuItem
from restaurants.serializers import RestaurantSerializer, MenuItemSerializer
from rest_framework.response import Response

class SearchView(generics.ListAPIView):
    serializer_class = RestaurantSerializer

    def get_queryset(self):
        query = self.request.query_params.get('query', '')
        sort_by = self.request.query_params.get('sort', '')
        restaurant_results = Restaurant.objects.none()
        menuitem_results = MenuItem.objects.none()
        
        if query:
            restaurant_results = Restaurant.objects.search(query)
            menuitem_results = MenuItem.objects.search(query)
        
        if sort_by == 'price':
            menuitem_results = menuitem_results.order_by('price')

        # Combine restaurant results and menuitem results
        combined_results = list(restaurant_results) + list(menuitem_results)
        combined_results = list(set(combined_results))  # Remove duplicates
        
        return combined_results

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        restaurant_serializer = RestaurantSerializer(queryset, many=True)
        menuitem_serializer = MenuItemSerializer(queryset, many=True)
        
        restaurant_results = [item for item in queryset if isinstance(item, Restaurant)]
        menuitem_results = [item for item in queryset if isinstance(item, MenuItem)]
        
        serialized_restaurants = RestaurantSerializer(restaurant_results, many=True)
        serialized_menuitems = MenuItemSerializer(menuitem_results, many=True)
        
        return Response({
            'restaurants': serialized_restaurants.data,
            'menu_items': serialized_menuitems.data,
        })
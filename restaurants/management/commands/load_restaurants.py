import csv
import json
import os
from django.core.management.base import BaseCommand
from restaurants.models import Restaurant, MenuItem

class Command(BaseCommand):
    help = 'Load restaurants data from CSV file'

    def handle(self, *args, **kwargs):
        # Determine the path to the CSV file
        file_path = os.path.join(os.path.dirname(__file__), 'restaurants.csv')

        with open(file_path, newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                latitude, longitude = map(float, row['lat_long'].split(','))
                full_details = json.loads(row['full_details'])
                restaurant, created = Restaurant.objects.get_or_create(
                    id=row['id'],
                    defaults={
                        'name': row['name'],
                        'location': row['location'],
                        'latitude': latitude,
                        'longitude': longitude,
                        'full_details': full_details,
                    }
                )
                items = json.loads(row['items'])
                for item_name, item_price in items.items():
                    try:
                        # Clean the item_price to handle cases like '150.00 onwards'
                        price = float(item_price.split()[0])
                        MenuItem.objects.get_or_create(
                            restaurant=restaurant,
                            name=item_name,
                            defaults={'price': price}
                        )
                    except ValueError:
                        self.stdout.write(self.style.WARNING(f"Skipping item '{item_name}' with invalid price '{item_price}'"))

        self.stdout.write(self.style.SUCCESS('Successfully loaded data'))

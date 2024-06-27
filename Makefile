install:
	pip install -r requirements.txt && cd frontend/FoodSearch && npm install

run:
	( cd frontend/FoodSearch && npm run dev & )
	python manage.py runserver
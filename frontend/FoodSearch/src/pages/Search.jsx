import React, { useState } from 'react';
import ResultDishes from '../components/ResultDishes';
import ResultRestaurants from '../components/ResultRestaurants';
import axios from 'axios';
import Loading from '../components/Loading';
import Logo from '../assets/FoodLogo.png';

const Search = () => {
  const baseUrl = 'http://127.0.0.1:8000/api/search/';
  const [query, setQuery] = useState("");
  const [restaurantData, setRestaurantData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);
    axios.get(`${baseUrl}?query=${query}`)
      .then(response => {
        setMenuData(response.data.menu_items);
        setRestaurantData(response.data.restaurants);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setIsLoading(false);
      });
  };

  const [activeTab, setActiveTab] = useState('restaurants');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-center   items-center h-screen -mt-20 ">
      <div className="w-full max-w-xl">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="logo" className="h-16" />
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Dishes, Restaurants..."
              value={query}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {hasSearched && (
          <>
            {/* Tabs */}
            <div role="tablist" className="tabs tabs-boxed mt-5">
              <a
                role="tab"
                className={`tab ${activeTab === 'dishes' ? 'tab-active' : ''}`}
                onClick={() => handleTabClick('dishes')}
              >
                Dishes
              </a>
              <a
                role="tab"
                className={`tab ${activeTab === 'restaurants' ? 'tab-active' : ''}`}
                onClick={() => handleTabClick('restaurants')}
              >
                Restaurants
              </a>
            </div>

            {/* Results */}
            <div className="h-80 w-90 overflow-y-auto mt-5">
              {isLoading && <Loading />}
              {!isLoading && activeTab === 'dishes' && menuData.map(menu => (
                <div>
                <ResultDishes key={menu.id} menu={menu} />
                &nbsp; &nbsp;
</div>
              ))}
              {!isLoading && activeTab === 'restaurants' && restaurantData.map(restaurant => (
                <div>
                <ResultRestaurants key={restaurant.id} restaurant={restaurant} />
                &nbsp; &nbsp;
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
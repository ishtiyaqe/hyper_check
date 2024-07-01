import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (query) {
        fetchProductData();
      }
    }, 10000); // Execute every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [query]);

  const fetchProductData = async () => {
    setLoading(true);
    setError(null);
    setProductData(null);

    try {
      const response = await axios.get(`http://localhost:8000/search/?query=${query}`);
      if (response.data.products && response.data.products.length > 0) {
        setProductData(response.data.products[0]);
        setLoading(false);
        navigateToProductPage(response.data.products[0]);
      } else {
        throw new Error("No product data found");
      }
    } catch (error) {
      console.error("Failed to fetch product data:", error);
      setError("Analysing Product Data from Amazon...");``
    }
  };
  const handleSearch = async () => {
    fetchProductData();
  };

  const navigateToProductPage = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="">
      <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Headphones, Covers..."
            value={query}
        onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button
            onClick={handleSearch}
            class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={loading}
          >
            Search
          </button>
        </div>
     

      {loading && (
        <div className="relative pt-1 w-full">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: "100%" }}
              className="loading-bar shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center "
            ></div>
          </div>
          <p className="text-sm text-gray-300">Loading... Please wait</p>
        </div>
      )}

      {error && <p className="text-sm text-red-500">{error}</p>}

      {productData && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-white">Product Data:</h2>
          {/* Display product data here */}
          <pre className="text-sm text-gray-300">{JSON.stringify(productData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

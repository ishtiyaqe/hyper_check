import React, { useState, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import Clients from '../components/api/client'; // Import axios for HTTP requests
import Navbar from "../components/css/Navbar";

const ProductPage = () => {
    const { id } = useParams();
    const location = useLocation();

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage, setReviewsPerPage] = useState(20); // Default reviews per page
    const [product, setProduct] = useState(null);

    // Function to fetch product details
    const fetchProductDetails = async () => {
        try {
            const response = await Clients.get(`products/${id}`);
            setProduct(response.data); // Assuming response.data contains product details
        } catch (error) {
            console.error("Failed to fetch product details:", error);
        }
    };

    useEffect(() => {
        fetchProductDetails(); // Corrected to include parentheses for function call
    }, []);

    // Handle change in reviews per page
    const handleReviewsPerPageChange = (event) => {
        setReviewsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // Reset to first page when changing reviews per page
    };

    // Function to determine class based on classification result
    const getClassForReview = (result) => {
        return result === "CG" ? "bg-green-100" : "bg-red-100";
    };

    // Render logic for reviews
    let currentReviews = [];
    if (product && product.reviews) {
        const indexOfLastReview = currentPage * reviewsPerPage;
        const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
        currentReviews = product.reviews.slice(indexOfFirstReview, indexOfLastReview);
    }

    // Calculate totals of genuine and fake reviews
    const totalReviews = product ? product.reviews.length : 0;
    const genuineCount = product ? product.reviews.filter((review) => review.classification_result === "CG").length : 0;
    const fakeCount = product ? product.reviews.filter((review) => review.classification_result === "OR").length : 0;
    const grade = product ? product.grade : "Not Set";
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto py-16 px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mb-5">
                    <div>
                        {product && (
                            <img src={product.image} alt={product.name} className="w-80 h-80 object-cover flex justify-center mx-auto" />
                        )}
                    </div>
                    <div>
                        {product && (
                            <>
                                <h1 className="text-4xl font-bold mb-8">{product.name}</h1>
                                <p className="text-lg mb-4">Price:$ {product.price}</p>
                                <a
                                    href={product.link}
                                    className="text-blue-500 underline mb-4"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    View Product in Amazon
                                </a>
                            </>
                        )}
                    </div>
                </div>

                <h2 className="text-2xl font-semibold mt-8 mb-4">Reviews</h2>
                <div className="flex items-center space-x-4 mb-4">
                    <label className="text-sm font-medium">Reviews per page:</label>
                    <select
                        className="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={reviewsPerPage}
                        onChange={handleReviewsPerPageChange}
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>

                {/* Display total reviews and counts */}
                <div className="mb-10 text-center text-lg font-semibold">
                    <p>Total Reviews Posted By Amazon Users: {totalReviews}</p>
                    <p>Total Genuine Reviews: {genuineCount}</p>
                    <p>Total Fake Reviews: {fakeCount}</p>
                    <p>Product Grade Acording Reviews: {grade}</p>
                </div>

                {currentReviews.length > 0 ? (
                    <div className="space-y-4">
                        {currentReviews.map((review, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg ${getClassForReview(review.classification_result)}`}
                            >
                                <h3 className="text-xl font-bold">{review.review_title}</h3>
                                <p className="text-sm text-gray-600">By {review.buyer_name}</p>
                                <p className="mt-2">{review.review_text}</p>
                                <p className="mt-2 font-semibold">{review.review_rating}</p>
                                {review.verified_purchase && (
                                    <span className="text-green-500">Verified Purchase</span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No reviews available.</p>
                )}

                {/* Pagination */}
                {product && product.reviews.length > reviewsPerPage && (
                    <div className="flex justify-center mt-4">
                        {[...Array(Math.ceil(product.reviews.length / reviewsPerPage)).keys()].map(
                            (number) => (
                                <button
                                    key={number + 1}
                                    onClick={() => setCurrentPage(number + 1)}
                                    className={`px-3 py-1 mx-1 rounded-md ${currentPage === number + 1
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                                >
                                    {number + 1}
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductPage;

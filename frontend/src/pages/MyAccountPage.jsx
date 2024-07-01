import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import client from '../components/api/client'; // Adjust the path as needed
import SkeletonLoader from '../components/SkeletonLoader'; // Assuming you have a skeleton loader component
import Navbar from "../components/css/Navbar";

const MyAccountPage = () => {
    const [userData, setUserData] = useState({});
    const [searchQueries, setSearchQueries] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchAccountData = async () => {
        try {
            const userResponse = await client.get('/api/user/', {
                withCredentials: true,
            });
            const accountResponse = await client.get('/api/myaccount/', {
                withCredentials: true,
            });
            console.log(accountResponse.data.search_queries);
            setUserData(userResponse.data.user);
            setSearchQueries(accountResponse.data.search_queries);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching account data:', error);
            setLoading(false);
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchAccountData();
    }, []);

    if (loading) {
        return <SkeletonLoader />;
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">My Account</h1>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                    <p>Email: {userData.email}</p>
                    <p>Username: {userData.username}</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Searched Products</h2>
                    {searchQueries.length === 0 ? (
                        <p>No products found.</p>
                    ) : (
                        <ul>
                            {searchQueries.map((query) => (
                                <li key={query.product.product_no} className="p-4 rounded-md shadow-md m-4">
                                    <div className="inline-flex justify-between w-full font-semibold p-2 bg-purple-600 text-white rounded-md shadow-md mb-2">
                                        <p>Product Number: {query.product.product_no}</p>
                                    </div>
                                    <div className='grid lg:grid-cols-2 grid-cols-1 gap-2'>
                                        <div>
                                            <img src={query.product.images.length >= 3 ? query.product.images[2].image : ''} alt="" className="w-full h-80 object-cover flex justify-center mx-auto" />
                                        </div>
                                        <div className="text-sm p-4">
                                            <p className='text-2xl font-semibold'>Product Name: {query.product.name.trim()}</p>
                                            <h3 className="font-semibold mb-2 mt-4">Details:</h3>
                                            <p className='text-lg font-semibold'>Price: ${query.product.price}</p>
                                            <p className='bg-purple-800 text-white cursor-pointer p-2 rounded-lg w-fit mb-4 mt-6 text-center'><a href={query.product.link} target="_blank" rel="noopener noreferrer">See in Amazon</a></p>
                                            <Link
                                                className='bg-purple-800 text-white cursor-pointer p-2 rounded-lg w-full text-center'
                                                to={`/product/${query.product.id}`}>
                                                See All Reviews
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default MyAccountPage;

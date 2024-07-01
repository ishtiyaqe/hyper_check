import React from 'react'

const SkeletonLoader = () => (
    <div className="container mx-auto px-4 py-8 animate-pulse">
        <div className="flex justify-between items-center mb-4">
            <div className="h-8 bg-gray-300 rounded w-32"></div>
            <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
        <div className="mb-8">
            <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
            <ul>
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index} className="p-4 rounded-md shadow-md m-4 bg-white">
                        <div className="inline-flex justify-between w-full font-semibold p-2 bg-gray-200 rounded-md shadow-md mb-2">
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                            <div className="h-4 bg-gray-300 rounded w-24"></div>
                        </div>
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default SkeletonLoader
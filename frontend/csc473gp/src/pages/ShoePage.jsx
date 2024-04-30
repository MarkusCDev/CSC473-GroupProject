import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShoePage = () => {
    const { shoeId } = useParams(); // Accessing the shoeId from route params
    const [shoe, setShoe] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchShoeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/sneakers/info/${shoeId}`);
                if (response.data && response.data.sneaker_details) {
                    setShoe(response.data.sneaker_details);
                } else {
                    setError('No details available for this sneaker');
                }
            } catch (error) {
                console.error('Failed to fetch details', error);
                setError('Failed to fetch details');
            }
        };

        if (shoeId) {
            fetchShoeDetails();
        } else {
            setError('Invalid sneaker ID');
        }
    }, [shoeId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!shoe) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{shoe.brand} - {shoe.model}</h1>
            <p>Color: {shoe.color}</p>
            <p>Price: ${shoe.price}</p>
            <p>Release Date: {new Date(shoe.release_date).toDateString()}</p>
            <p>Sizes: {shoe.sizes.join(', ')}</p>
        </div>
    );
};

export default ShoePage;

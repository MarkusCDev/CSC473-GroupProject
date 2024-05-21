import React, { useState } from 'react';
import Navigator from '../components/Navigator';

function CreateBuying() {
    const [owner, setOwner] = useState('');
    const [shoes, setShoes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleAddShoe = (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        const newShoe = {
            name: '',
            originalPrice: '',
            discountedPrice: '',
            imageUrl: '',
        };

        setShoes([...shoes, newShoe]);
    };

    const handleShoeChange = (index, field, value) => {
        const newShoes = [...shoes];
        newShoes[index][field] = value;
        setShoes(newShoes);
    };

    const handleRemoveShoe = (index) => {
        const newShoes = shoes.filter((_, shoeIndex) => shoeIndex !== index);
        setShoes(newShoes);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!owner.trim()) {
            setErrorMessage('Owner name is required.');
            return;
        }

        if (shoes.length === 0 || shoes.some(shoe => !shoe.name.trim() || !shoe.originalPrice.trim() || !shoe.discountedPrice.trim() || !shoe.imageUrl.trim())) {
            setErrorMessage('All fields are required, and at least one shoe must be added.');
            return;
        }

        const promises = shoes.map(shoe => {
            const tradingShoesDocument = {
                collection: "Buying Shoes",
                owner: owner,
                selling: [shoe]
            };

            return fetch('http://127.0.0.1:5001/document_creation/create_document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tradingShoesDocument),
            });
        });

        try {
            const responses = await Promise.all(promises);

            const allResponsesOk = responses.every(response => response.ok);
            if (!allResponsesOk) {
                const errorMessages = await Promise.all(responses.map(response => response.json().catch(() => null)));
                const firstErrorMessage = errorMessages.find(result => result && result.error)?.error || 'There was a problem creating the Trading Shoes documents.';
                setErrorMessage(firstErrorMessage);
                return;
            }

            setOwner('');
            setShoes([]);
            setSuccessMessage('Shoes added successfully!');
        } catch (error) {
            setErrorMessage('There was a problem creating the documents.');
        }
    };

    return (
        <div>
            <Navigator />
            <div className="flex flex-col items-center p-12">
                <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-[#07074D] mb-4">Add Shoes for Sale</h2>
                        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <label htmlFor="owner" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Owner:
                                </label>
                                <input
                                    id="owner"
                                    name="owner"
                                    type="text"
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    required
                                />
                            </div>
                            {shoes.map((shoe, index) => (
                                <div key={index} className="mb-5 border-b pb-5">
                                    <h3 className="text-lg font-semibold text-[#07074D] mb-3">Shoe {index + 1}</h3>
                                    <div className="mb-3">
                                        <label htmlFor={`shoeName-${index}`} className="block text-base font-medium text-[#07074D]">
                                            Shoe Name:
                                        </label>
                                        <input
                                            id={`shoeName-${index}`}
                                            name="shoeName"
                                            type="text"
                                            value={shoe.name}
                                            onChange={(e) => handleShoeChange(index, 'name', e.target.value)}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`originalPrice-${index}`} className="block text-base font-medium text-[#07074D]">
                                            Original Price:
                                        </label>
                                        <input
                                            id={`originalPrice-${index}`}
                                            name="originalPrice"
                                            type="number"
                                            value={shoe.originalPrice}
                                            onChange={(e) => handleShoeChange(index, 'originalPrice', e.target.value)}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`discountedPrice-${index}`} className="block text-base font-medium text-[#07074D]">
                                            Discounted Price:
                                        </label>
                                        <input
                                            id={`discountedPrice-${index}`}
                                            name="discountedPrice"
                                            type="number"
                                            value={shoe.discountedPrice}
                                            onChange={(e) => handleShoeChange(index, 'discountedPrice', e.target.value)}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`imageUrl-${index}`} className="block text-base font-medium text-[#07074D]">
                                            Image URL:
                                        </label>
                                        <input
                                            id={`imageUrl-${index}`}
                                            name="imageUrl"
                                            type="text"
                                            value={shoe.imageUrl}
                                            onChange={(e) => handleShoeChange(index, 'imageUrl', e.target.value)}
                                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveShoe(index)}
                                        className="w-full rounded-md bg-red-500 py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form mb-5"
                                    >
                                        Remove Shoe
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddShoe}
                                className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form mb-5"
                            >
                                Add Shoe
                            </button>
                            <button
                                type="submit"
                                className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBuying;

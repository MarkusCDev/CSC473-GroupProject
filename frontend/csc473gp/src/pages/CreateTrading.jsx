import React, { useState } from 'react';
import Navigator from '../components/Navigator';

function CreateTrading() {
    const [owner, setOwner] = useState('');
    const [trading, setTrading] = useState([]);
    const [askedForTrade, setAskedForTrade] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleAddTradingShoe = (event) => {
        event.preventDefault();
        setSuccessMessage('');

        if (trading.length >= 2) {
            alert('You can add a maximum of 2 trading shoes.');
            return;
        }

        const newShoe = {
            name: '',
            price: '',
            imageUrl: '',
        };

        setTrading([...trading, newShoe]);
    };

    const handleAddAskedForTradeShoe = (event) => {
        event.preventDefault();
        setSuccessMessage('');

        if (askedForTrade.length >= 2) {
            alert('You can add a maximum of 2 asked-for-trade shoes.');
            return;
        }

        const newShoe = {
            name: '',
            price: '',
            imageUrl: '',
        };

        setAskedForTrade([...askedForTrade, newShoe]);
    };

    const handleShoeChange = (index, field, value, setShoes, shoes) => {
        const newShoes = [...shoes];
        newShoes[index][field] = value;
        setShoes(newShoes);
    };

    const handleDeleteShoe = (index, setShoes, shoes) => {
        const newShoes = [...shoes];
        newShoes.splice(index, 1);
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

        if (trading.length === 0 || trading.some(shoe => !shoe.name.trim() || !shoe.price.trim() || !shoe.imageUrl.trim())) {
            setErrorMessage('At least one trading shoe is required and all fields must be filled.');
            return;
        }

        if (askedForTrade.length === 0 || askedForTrade.some(shoe => !shoe.name.trim() || !shoe.price.trim() || !shoe.imageUrl.trim())) {
            setErrorMessage('At least one asked-for-trade shoe is required and all fields must be filled.');
            return;
        }

        const tradingShoesDocument = {
            collection: "Trading Shoes",
                owner: owner,
                trading: trading,
                askedForTrade: askedForTrade
        };

        try {
            const response = await fetch('/document_creation/create_document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tradingShoesDocument),
            });

            if (!response.ok) {
                const result = await response.json();
                setErrorMessage(result.error || 'There was a problem creating the Trading Shoes document.');
                return;
            }

            setOwner('');
            setTrading([]);
            setAskedForTrade([]);
            setSuccessMessage('Shoes added successfully!');
        } catch (error) {
            setErrorMessage('There was a problem creating the document.');
        }
    };

    return (
        <div>
            <Navigator />
            <div className="flex flex-col items-center p-12">
                <div className="w-full max-w-[800px] bg-white shadow-md rounded-lg">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold text-[#07074D] mb-4">Add Trading Shoes</h2>
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
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-[#07074D] mb-3">Trading Shoes</h3>
                                {trading.map((shoe, index) => (
                                    <div key={index} className="mb-5 border-b pb-5">
                                        <div className="mb-3">
                                            <label htmlFor={`tradingName-${index}`} className="block text-base font-medium text-[#07074D]">
                                                Shoe Name:
                                            </label>
                                            <input
                                                id={`tradingName-${index}`}
                                                name="tradingName"
                                                type="text"
                                                value={shoe.name}
                                                onChange={(e) => handleShoeChange(index, 'name', e.target.value, setTrading, trading)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor={`tradingPrice-${index}`} className="block text-base font-medium text-[#07074D]">
                                                Price:
                                            </label>
                                            <input
                                                id={`tradingPrice-${index}`}
                                                name="tradingPrice"
                                                type="number"
                                                value={shoe.price}
                                                onChange={(e) => handleShoeChange(index, 'price', e.target.value, setTrading, trading)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor={`tradingImageUrl-${index}`} className="block text-base font-medium text-[#07074D]">
                                                Image URL:
                                            </label>
                                            <input
                                                id={`tradingImageUrl-${index}`}
                                                name="tradingImageUrl"
                                                type="text"
                                                value={shoe.imageUrl}
                                                onChange={(e) => handleShoeChange(index, 'imageUrl', e.target.value, setTrading, trading)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteShoe(index, setTrading, trading)}
                                            className="w-full rounded-md bg-red-500 py-2 px-4 text-center text-base font-semibold text-white outline-none hover:shadow-form"
                                        >
                                            Delete Trading Shoe
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddTradingShoe}
                                    className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form mb-5"
                                >
                                    Add Trading Shoe
                                </button>
                            </div>
                            <div className="mb-5">
                                <h3 className="text-lg font-semibold text-[#07074D] mb-3">Asked For Trade Shoes</h3>
                                {askedForTrade.map((shoe, index) => (
                                    <div key={index} className="mb-5 border-b pb-5">
                                        <div className="mb-3">
                                            <label htmlFor={`askedForTradeName-${index}`} className="block text-base font-medium text-[#07074D]">
                                                Shoe Name:
                                            </label>
                                            <input
                                                id={`askedForTradeName-${index}`}
                                                name="askedForTradeName"
                                                type="text"
                                                value={shoe.name}
                                                onChange={(e) => handleShoeChange(index, 'name', e.target.value, setAskedForTrade, askedForTrade)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor={`askedForTradePrice-${index}`} className="block text-base font-medium text-[#07074D]">
                                                Price:
                                            </label>
                                            <input
                                                id={`askedForTradePrice-${index}`}
                                                name="askedForTradePrice"
                                                type="number"
                                                value={shoe.price}
                                                onChange={(e) => handleShoeChange(index, 'price', e.target.value, setAskedForTrade, askedForTrade)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor={`askedForTradeImageUrl-${index}`} className="block text-base font-medium text-[#07074D]">
                                                Image URL:
                                            </label>
                                            <input
                                                id={`askedForTradeImageUrl-${index}`}
                                                name="askedForTradeImageUrl"
                                                type="text"
                                                value={shoe.imageUrl}
                                                onChange={(e) => handleShoeChange(index, 'imageUrl', e.target.value, setAskedForTrade, askedForTrade)}
                                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteShoe(index, setAskedForTrade, askedForTrade)}
                                            className="w-full rounded-md bg-red-500 py-2 px-4 text-center text-base font-semibold text-white outline-none hover:shadow-form"
                                        >
                                            Delete Asked For Trade Shoe
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={handleAddAskedForTradeShoe}
                                    className="w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none hover:shadow-form mb-5"
                                >
                                    Add Asked For Trade Shoe
                                </button>
                            </div>
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

export default CreateTrading;

import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'aventura54',
    trading: [
      { id: 101, name: 'Air Jordan 1 Retro High OG', price: 1000, imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp' },
    ],
    askedForTrade: [
      { id: 201, name: 'Nike Air Max 90', price: 500, imageUrl: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg' },
      { id: 202, name: 'Adidas Yeezy Boost 350', price: 524, imageUrl: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg' },
    ],
  },
  {
    id: 2,
    name: 'aventura55',
    trading: [
      { id: 103, name: 'Puma RS-X', price: 100, imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg' },
    ],
    askedForTrade: [
      { id: 202, name: 'Converse Chuck Taylor', price: 120, imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
      { id: 203, name: 'Vans Old Skool', price: 140, imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
    ],
  },
  {
    id: 3,
    name: 'aventura56',
    trading: [
      { id: 104, name: 'New Balance 574', price: 200, imageUrl: 'https://i.ebayimg.com/images/g/1OUAAOSwgwxmHvB7/s-l1600.jpg' },
    ],
    askedForTrade: [
      { id: 204, name: 'Asics Gel Lyte III', price: 220, imageUrl: 'https://i.ebayimg.com/images/g/2OUAAOSwgwxmHvB7/s-l1600.jpg' },
      { id: 205, name: 'Reebok Classic', price: 240, imageUrl: 'https://i.ebayimg.com/images/g/3OUAAOSwgwxmHvB7/s-l1600.jpg' },
    ],
  },
  {
    id: 4,
    name: 'aventura57',
    trading: [
      { id: 105, name: 'Nike Dunk Low', price: 300, imageUrl: 'https://i.ebayimg.com/images/g/4OUAAOSwgwxmHvB7/s-l1600.jpg' },
    ],
    askedForTrade: [
      { id: 206, name: 'Adidas Superstar', price: 320, imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
      { id: 207, name: 'Jordan 4 Retro', price: 340, imageUrl: 'https://i.ebayimg.com/images/g/6OUAAOSwgwxmHvB7/s-l1600.jpg' },
    ],
  },
  // Add more products as needed
];

function TradeShoesCarousel() {
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      const cardElement = carouselRef.current.querySelector('.card');
      if (cardElement) {
        setCardWidth(cardElement.offsetWidth);
      }
    }
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
  };

  const calculateTotalPrice = (shoes) => {
    return shoes.reduce((total, shoe) => total + shoe.price, 0);
  };

  const renderShoesGrid = (shoes) => {
    const gridColumns = shoes.length === 1 ? 'grid-cols-1' : 'grid-cols-2';
    return (
      <div className={`grid ${gridColumns} gap-4`}>
        {shoes.map((shoe) => (
          <div key={shoe.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
            <img src={shoe.imageUrl} alt="" className="w-full h-40 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-center">{shoe.name}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4">
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 z-20 flex items-center">
          <button
            onClick={scrollLeft}
            className="bg-white text-gray-800 hover:text-gray-600 font-bold hover:shadow-lg rounded-full w-12 h-12 mx-2"
          >
            &#8592;
          </button>
        </div>
        <div
          ref={carouselRef}
          className="flex overflow-x-scroll scrollbar-hide gap-4 w-full"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="flex-none w-full md:w-1/2 px-2 mb-6 card">
              <div className="border border-gray-300 rounded-lg p-4">
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <div className="flex justify-between items-center mb-4">
                  <div className="w-1/2 pr-2">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are getting</h3>
                    {renderShoesGrid(product.trading)}
                  </div>
                  <div className="w-1/2 pl-2">
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Item(s) you are giving</h3>
                    {renderShoesGrid(product.askedForTrade)}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-1/2 pr-2 text-center">
                    <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(product.trading)}</h3>
                  </div>
                  <div className="w-1/2 pl-2 text-center">
                    <h3 className="text-xl font-semibold" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>Est. value (new): ${calculateTotalPrice(product.askedForTrade)}</h3>
                  </div>
                </div>
                <div className="text-center mt-4" style={{ color: 'rgb(68, 71, 78)', fontSize: '14px' }}>
                  <p>May 17 2024</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="absolute inset-y-0 right-0 z-20 flex items-center">
          <button
            onClick={scrollRight}
            className="bg-white text-gray-800 hover:text-gray-600 font-bold hover:shadow-lg rounded-full w-12 h-12 mx-2"
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
}

export default TradeShoesCarousel;

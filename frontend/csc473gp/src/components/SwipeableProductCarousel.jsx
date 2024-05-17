import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: '$10', imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp' },
  { id: 2, name: 'Product 2', price: '$20', imageUrl: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg' },
  { id: 3, name: 'Product 3', price: '$15', imageUrl: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg' },
  { id: 4, name: 'Product 4', price: '$25', imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg' },
  { id: 5, name: 'Product 5', price: '$30', imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg' },
  { id: 6, name: 'Product 6', price: '$35', imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg' },
  { id: 7, name: 'Product 7', price: '$40', imageUrl: 'https://s.yimg.com/ny/api/res/1.2/2wNOJ0NLfk6DStVKy4V6qQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkxMw--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/29fb7210-9834-11ee-bfff-9c23faf735c5' },
  { id: 8, name: 'Product 8', price: '$45', imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg' },
];

function SwipeableProductCarousel() {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <div className="">
      
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
          className="flex overflow-x-scroll scrollbar-hide gap-2 w-full"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product) => (
            <Link to={`/shoe/${product.id}`} key={product.id} className="flex-none w-1/5 snap-center">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg leading-6 font-bold text-gray-900">{product.name}</h3>
                  <p className="text-gray-600 mt-2 text-sm">Description here...</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-2xl font-extrabold text-gray-900">{product.price}</span>
                  </div>
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

export default SwipeableProductCarousel;

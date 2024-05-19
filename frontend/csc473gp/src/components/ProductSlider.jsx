import React from 'react';
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

function ProductSlider() {
  const itemsPerRow = 4;
  const totalRows = Math.ceil(products.length / itemsPerRow);

  return (
    <div className="">
        <div className="h-screen w-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, idx) => (
            <Link to={`/shoe/${product.id}`} key={idx} className={`max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105 ${idx >= totalRows * itemsPerRow ? 'hidden' : ''}`}>
              <article>
                <div>
                  <img className="object-cover h-64 w-full" src={product.imageUrl} alt={product.name} />
                </div>
                <div className="flex flex-col gap-1 mt-4 px-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-50">{product.name}</h2>
                  <span className="font-normal text-gray-600 dark:text-gray-300">High Top (Lemon Yellow)</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-50">{product.price}</span>
                </div>
                <div className="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
                  <button className="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50">
                    <span className="text-base">Add to Cart</span>
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </article>
            </Link>
          ))}
        </div>
        {products.length > totalRows * itemsPerRow && (
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md transform translate-x-1/2 translate-y-1/2" onClick={() => console.log('View more')}>
            &#10095;
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductSlider;

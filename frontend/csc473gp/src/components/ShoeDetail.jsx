import React from 'react';
import { useParams } from 'react-router-dom';

const products = [
  { id: 1, name: 'Product 1', price: '$10', imageUrl: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp', description: 'High Top (Lemon Yellow)' },
  { id: 2, name: 'Product 2', price: '$20', imageUrl: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg', description: 'High Top (Red)' },
  { id: 3, name: 'Product 3', price: '$15', imageUrl: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg', description: 'High Top (Blue)' },
  { id: 4, name: 'Product 4', price: '$25', imageUrl: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg', description: 'High Top (Green)' },
  { id: 5, name: 'Product 5', price: '$30', imageUrl: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg', description: 'High Top (Black)' },
  { id: 6, name: 'Product 6', price: '$35', imageUrl: 'https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg', description: 'High Top (White)' },
  { id: 7, name: 'Product 7', price: '$40', imageUrl: 'https://s.yimg.com/ny/api/res/1.2/2wNOJ0NLfk6DStVKy4V6qQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkxMw--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/29fb7210-9834-11ee-bfff-9c23faf735c5', description: 'High Top (Gray)' },
  { id: 8, name: 'Product 8', price: '$45', imageUrl: 'https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg', description: 'High Top (Pink)' },
];

function ShoeDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Shoe not found</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img className="w-full h-full object-cover" src={product.imageUrl} alt={product.name} />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Add to Wishlist</button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{product.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                <span className="text-gray-600 dark:text-gray-300">{product.price}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">Availability:</span>
                <span className="text-gray-600 dark:text-gray-300">In Stock</span>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Color:</span>
              <div className="flex items-center mt-2">
                <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">Select Size:</span>
              <div className="flex items-center mt-2">
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">S</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">M</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">L</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XL</button>
                <button className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600">XXL</button>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices placerat non eget velit. Integer ornare mi sed ipsum lacinia, non sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec tincidunt mi consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoeDetail;

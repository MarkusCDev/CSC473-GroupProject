import React from 'react';

const ProductCard = ({ image, title, price, oldPrice, gender }) => (
  <div className="w-full md:w-1/4 p-4">
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={image} alt={title} className="w-full h-auto" />
      <div className="mt-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-gray-600">{gender}</p>
        <div className="flex items-center">
          <p className="text-xl font-bold">{price}</p>
          {oldPrice && <p className="text-sm text-gray-500 line-through ml-2">{oldPrice}</p>}
        </div>
      </div>
    </div>
  </div>
);

const ProductList = () => {
  const products = [
    {
      image: 'https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp',
      title: 'Nike LeBron 19 Low',
      price: '€140',
      gender: 'Men',
    },
    {
      image: 'https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg', // Replace with actual image path
      title: 'Nike Jordan Why Not .5',
      price: '€120',
      gender: 'Men',
    },
    {
      image: 'https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg', // Replace with actual image path
      title: 'Nike Air Max 2021',
      price: '€120',
      oldPrice: '€180',
      gender: 'Men',
    },
    {
      image: 'https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg', // Replace with actual image path
      title: 'Nike Air Max 2021',
      price: '€160',
      gender: 'Men',
    },
    {
      image: 'https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg', // Replace with actual image path
      title: 'Nike Jordan Point Lane',
      price: '€110',
      oldPrice: '€140',
      gender: 'Men',
    },
  ];

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Filter</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Sort by</label>
            <select className="w-full p-2 mt-1 border rounded-md">
              <option>Default</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Gender</label>
            <div className="mt-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" defaultChecked />
                <span className="ml-2">Men</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Women</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Unisex</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Kids</label>
            <div className="mt-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Boys</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Girls</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <div className="mt-1">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2">Promotion</span>
              </label>
              <div className="mt-2 flex">
                <input type="number" className="w-full p-2 border rounded-md" placeholder="Min" />
                <span className="mx-2">-</span>
                <input type="number" className="w-full p-2 border rounded-md" placeholder="Max" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Colour</label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {['Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Pink', 'Purple', 'Orange', 'Brown', 'Lime'].map((color) => (
                <label key={color} className="flex items-center">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="ml-2">{color}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;

import React from 'react'

const products = [
  { name: "Product 1", price: "$10", imageUrl: "https://wallpapers.com/images/high/shoes-background-evoi6ni802pfz0ul.webp" },
  { name: "Product 2", price: "$20", imageUrl: "https://i.ebayimg.com/images/g/LA8AAOSwvWtmHuEQ/s-l1600.jpg" },
  { name: "Product 3", price: "$15", imageUrl: "https://i.ebayimg.com/images/g/-DwAAOSwkt9mHvC6/s-l1600.jpg" },
  { name: "Product 4", price: "$25", imageUrl: "https://i.ebayimg.com/images/g/GRUAAOSwPBlmHrbQ/s-l1600.jpg" },
  { name: "Product 5", price: "$30", imageUrl: "https://i.ebayimg.com/images/g/KKkAAOSwujBmHt-s/s-l1600.jpg" },
  { name: "Product 6", price: "$35", imageUrl: "https://i.ebayimg.com/images/g/5OUAAOSwgwxmHvB7/s-l1600.jpg" },
  { name: "Product 7", price: "$40", imageUrl: "https://s.yimg.com/ny/api/res/1.2/2wNOJ0NLfk6DStVKy4V6qQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTkxMw--/https://s.yimg.com/os/creatr-uploaded-images/2023-12/29fb7210-9834-11ee-bfff-9c23faf735c5" },
  { name: "Product 8", price: "$45", imageUrl: " https://i.pinimg.com/736x/09/10/87/091087a1fad6dec229eb2ebf8e41a431.jpg" },
];

function ProductSlider() {
  const itemsPerRow = 4
  const totalRows = Math.ceil(products.length / itemsPerRow)

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 relative">
        {products.map((product, idx) => (
          <div key={idx} className={`bg-white rounded-lg shadow-md p-4 ${idx >= totalRows * itemsPerRow ? 'hidden' : ''}`}>
            <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-lg" />
            <h2 className="text-lg font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700">Price: {product.price}</p>
          </div>
        ))}
        {products.length > totalRows * itemsPerRow && (
          <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md transform translate-x-1/2 translate-y-1/2" onClick={() => console.log('View more')}>
            &#10095;
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductSlider

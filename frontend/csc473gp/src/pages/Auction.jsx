import React, { useState } from 'react';
import axios from 'axios';
import Navigator from '../components/Navigator';

// TODO - When sellers add item it will appear in their store and normal search

function Auction() {
  const [formData, setFormData] = useState({
      title: '',
      description: '',
      shoe_size: '',
      condition: '',
      minimum_starting_bid: '',
      buy_now_price: '',
      photos: []
  });
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    if (type === 'file') {
        const fileList = Array.from(files);
        const filePreviews = fileList.map(file => URL.createObjectURL(file));
        
        setPreviews(prevPreviews => [...prevPreviews, ...filePreviews]);
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: [...prevFormData[name], ...fileList]
        }));
    } else {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: e.target.value
        }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
        if (key !== 'photos') {
            data.append(key, formData[key]);
        }
    });
    formData.photos.forEach(photo => {
        data.append('photos', photo);
    });

    try {
        const response = await axios.post('http://localhost:5000/auction/list_sneaker', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data && response.data.success) {
            alert(`Sneaker listed successfully! ${response.data.message}`);
        } else {
            alert(`Sneaker listing failed: ${response.data.message}`);
        }
        setFormData({
            title: '',
            description: '',
            shoe_size: '',
            condition: '',
            minimum_starting_bid: '',
            buy_now_price: '',
            photos: []
        });
        setPreviews([]);
    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.message;
        alert('Failed to list sneaker: ' + errorMessage);
    }
};


  return (
      <div className='flex flex-col min-h-screen bg-gradient-to-b from-stone-300 to-stone-500'>
          <div className='w-full'>
              <Navigator />
          </div>
          <div className='flex items-center justify-center px-4 mt-2 sm:px-6 lg:px-8'>
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl m-auto bg-white rounded-lg p-5">
                  <h1 className='text-center font-bold text-xl'>Auction</h1>
                  <form onSubmit={handleSubmit}>
                      <div>
                          <label className="block mb-2">Title</label>
                          <input
                              type="text"
                              name="title"
                              placeholder="Title"
                              value={formData.title}
                              onChange={handleChange}
                              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">Description</label>
                          <textarea
                              name="description"
                              placeholder="Description"
                              value={formData.description}
                              onChange={handleChange}
                              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">Shoe Size</label>
                          <input
                              type="number"
                              name="shoe_size"
                              placeholder="Shoe Size"
                              value={formData.shoe_size}
                              onChange={handleChange}
                              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">Condition</label>
                          <input
                              type="text"
                              name="condition"
                              placeholder="Condition"
                              value={formData.condition}
                              onChange={handleChange}
                              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">Minimum Starting Bid</label>
                          <input
                              type="number"
                              name="minimum_starting_bid"
                              placeholder="Minimum Starting Bid"
                              value={formData.minimum_starting_bid}
                              onChange={handleChange}
                              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">Buy Now Price</label>
                          <input
                              type="number"
                              name="buy_now_price"
                              placeholder="Buy Now Price"
                              value={formData.buy_now_price}
                              onChange={handleChange}
                              className="w-full p-2 mb-6 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                      </div>
                      <div>
                          <label className="block mb-2">Add Photos</label>
                          <input
                              type="file"
                              name="photos"
                              multiple
                              onChange={handleChange}
                              className="w-full p-2 mb-2 text-blue-700 border-b-2 border-blue-500 outline-none focus:bg-gray-300"
                          />
                          <div className="flex flex-wrap gap-2">
                          {formData.photos.map((file, index) => (
                              <div key={index} className="text-center">
                                  <img src={previews[index]} alt="Preview" className="w-20 h-20 object-cover" />
                                  <p>{file.name}</p>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          List Sneaker for Auction
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
}

export default Auction;

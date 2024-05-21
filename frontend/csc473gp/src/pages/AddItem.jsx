import React, { useState, useRef } from 'react'
import shillo from '../assets/account/shillo.jpg'
import edit from '../assets/account/edit.png'
import { useUserAuth } from '../components/UserAuthentication'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const AddItem = () => {
  const navigate = useNavigate()
  const storage = getStorage()
  const {user} = useUserAuth()
  const [email, setEmail] = useState(user.email)
  const [itemName, setItemName] = useState("")
  const [shoeCompany, setShoeCompany] = useState("")
  const [shoeColor, setShoeColor] = useState("")
  const [shoeReleaseYear, setShoeReleaseYear] = useState("")
  const [mainImage, setMainImage] = useState("")
  const [shoeGender, setShoeGender] = useState("")
  const [shoeSize, setShoeSize] = useState("")
  const [shoeDescription, setShoeDescription] = useState("")
  const [openAIDetails,setOpenAIDetails] = useState("")
  const [price,setPrice] = useState("")

  const [tradeAskPic,setTradeAskPic] = useState("")

  const [auctionStart,setAuctionStart] = useState("")
  const [auctionDuration,setAuctionDuration] = useState("")

  const [error, SetError] = useState("")
  const [owner, setOwner] = useState('');
  const [shoes, setShoes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  const [formType, setFormType] = useState("")

  const formatDateTime = (date) => {
    const d = new Date(date)
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = String(d.getFullYear()).slice(-2)
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    const seconds = String(d.getSeconds()).padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
  }
  
  const updateStore = async (listingData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_CLOUD_API_URL2}/profile/add_to_store`,
        {
          user_id: user.email, 
          new_item: listingData
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Store Updated:", response.data);
      setSuccessMessage('Shoe added successfully!');
      navigate("/")
    } catch (error) {
      console.error(error);
      setErrorMessage("Error adding item to store. Please try again.");
    }
  };

const openAI = async (name, year, color) => {
  
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_APP_CLOUD_API_URL2}/shoegpt/gendata`,
      {
        shoe_name: name,
        year: "",
        color: color,
      },
      {
        headers: {
          Authorization: `${email}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Assuming the response data contains the OpenAI details
    const openAIDetails = response.data;
    console.log("OpenAI:", openAIDetails);

    // Update state with the OpenAI details
    setOpenAIDetails(openAIDetails);
  } catch (error) {
    setError("Error creating profile. Please try again.");
    console.error(error);
  }
};

const handleSubmit = async (e, formType, additionalFields = {}) => {
  e.preventDefault();
  const currentDate = new Date().toISOString();
  const formattedDate = formatDateTime(currentDate);
  
  try {
    // Call OpenAI to get additional shoe details
    await openAI(itemName, "", shoeColor)

    if (openAIDetails === "") {return}
    const baseDocument = {
      seller_email: user.email,
      shoe_name: itemName,
      shoe_img: mainImage,
      shoe_color: shoeColor,
      shoe_year: shoeReleaseYear,
      shoe_company: shoeCompany,
      shoe_size: shoeSize,
      shoe_gender: shoeGender,
      shoe_price: price,
      shoe_description: shoeDescription,
      shoe_ai_description: openAIDetails, // Use the OpenAI details here
      creation_date: formattedDate,
      ...additionalFields,
    };

    const collectionType = {
      Sell: { collection: "Selling", type: "sell" },
      Auction: { collection: "Auctioning", type: "auction" },
      Trade: { collection: "Trading", type: "trade" },
    }[formType];

    const document = { ...baseDocument, ...collectionType };

    const response = await fetch('https://testingbaka-e2agf6geqq-ue.a.run.app/document_creation/create_document', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(document),
    });

    if (!response.ok) {
      const errorMessage = (await response.json()).error || `There was a problem creating the ${formType} Shoes document.`;
      setErrorMessage(errorMessage);
      return;
    }

    await updateStore(document);
    setSuccessMessage(`${formType} added successfully!`);
  } catch (error) {
    setErrorMessage('There was a problem creating the document.');
  }
};

const handleSellSubmit = (e) => handleSubmit(e, 'Sell');

const handleAuctionSubmit = (e) => {
  const additionalFields = {
    shoe_auction_start: auctionStart,
    shoe_auction_duration: auctionDuration,
  };
  handleSubmit(e, 'Auction', additionalFields);
};

const handleTradeSubmit = (e) => {
  const additionalFields = {
    shoe_trading_asking_img: tradeAskPic,
  };
  handleSubmit(e, 'Trade', additionalFields);
};

  
 const fileInputRef = useRef()
 const tradeFileInputRef = useRef()

  const openFileExplorer = () => {
    fileInputRef.current.click()
  }
  const openTradeFileExplorer = () => {
    tradeFileInputRef.current.click()
  }

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create a storage reference from our storage service
    const storageRef = ref(storage, `Listings/${file.name}`);
    const metadata = { contentType: file.type };
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        console.error(error);
        setError("Error uploading file: " + error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImage(downloadURL);  // setting the image URL (either main or second)
        })
      }
    )
  }

  return (
    <>  
      <h1 className="text-2xl font-bold mb-8 text-center">Add Listing</h1>
      <div className="flex justify-center mb-5">
        <button
          className={`mx-2 px-4 py-2 rounded-full ${formType === 'Sell' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFormType(formType === 'Sell' ? '' : 'Sell')}
        >
          Sell
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-full ${formType === 'Auction' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFormType(formType === 'Auction' ? '' : 'Auction')}
        >
          Auction
        </button>
        <button
          className={`mx-2 px-4 py-2 rounded-full ${formType === 'Trade' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setFormType(formType === 'Trade' ? '' : 'Trade')}
        >
          Trade
        </button>
      </div>

    {/* =-=-=-=-=-=-=-==-=-==-=-=--= Sell =-=-=-=-=-=-=-==-=-==-=-=--= */}

      {formType === 'Sell' && (
        <form onSubmit={handleSellSubmit}>

          {/* Line 1 */}
          <div className="flex flex-row space-x-4">
            {/* Item Name */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Name (Panda)" value={itemName} onChange={(e) => setItemName(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Shoe Company */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Company (Nike)" value={shoeCompany} onChange={(e) => setShoeCompany(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Color */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Color (B/W)" value={shoeColor} onChange={(e) => setShoeColor(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>

          {/* Line 2 - Image */}
          <div className='flex z-0 w-full mb-5 justify-center'>
            <img width="80px" className="rounded-full" src={mainImage || shillo} alt="Shoe Image" />
            <span onClick={openFileExplorer} className='ml-5 my-auto'><img width='30px' src={edit} alt="Edit" /></span>
            <input type="file" ref={fileInputRef} onChange={(event) => handleFileChange(event, setMainImage)} style={{ display: 'none' }} />
          </div>


          {/* Line 3 */}
          <div className="flex flex-row space-x-4">
            {/* Gender */}
            <fieldset className="relative z-0 w-full p-px mb-5">
              <div className="block pt-3 pb-2 space-x-4">
                <label>Gender:</label>
                <label><input type="radio" value="M" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setShoeGender(e.target.value)}}/>M</label>
                <label><input type="radio" value="F" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setShoeGender(e.target.value)}}/>F</label>
              </div>
            </fieldset>
            {/* Size */}
            <div className='z-0 w-full mb-5 flex'>
              <select value={shoeSize} onChange={(e) => setShoeSize(e.target.value)}  className="w-full">
                <option value="" disabled hidden>Choose the size</option>
                {Array.from({ length: 21 }, (_, i) => 5 + 0.5 * i).map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>      
          </div>

          {/* Line 4 */}
          <div className="flex flex-row space-x-4">
            {/* ReleaseDate */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Purchase Year" value={shoeReleaseYear} onChange={(e) => setShoeReleaseYear(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Selling Price */}
            <div className='z-0 w-full mb-5'>
                <input type="text" placeholder="Your Selling Price" value={price} onChange={(e) => setPrice(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>


          

          <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Description" value={shoeDescription} onChange={(e) => setShoeDescription(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          </div>


          {/* Submit Button */}
          <div className="w-full mt-4">
            <button className="h-auto hover:bg-green-700 lg:h-12 text-xs py-1 lg:py-2 px-2 lg-px-4 text-white font-light tracking-wider bg-gray-900 rounded-lg uppercase w-full focus:outline-none focus:shadow-outline" type="submit">Sell Item</button>
          </div>
        </form>
      )}

      {/* =-=-=-=-=-=-=-==-=-==-=-=--= Auction =-=-=-=-=-=-=-==-=-==-=-=--= */}

      {formType === 'Auction' && (
        <form onSubmit={handleAuctionSubmit}>
                    {/* Line 1 */}
                    <div className="flex flex-row space-x-4">
            {/* Item Name */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Name (Panda)" value={itemName} onChange={(e) => setItemName(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Shoe Company */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Company (Nike)" value={shoeCompany} onChange={(e) => setShoeCompany(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Color */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Color (B/W)" value={shoeColor} onChange={(e) => setShoeColor(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>

          {/* Line 2 - Image */}
          <div className='flex z-0 w-full mb-5 justify-center'>
            <img width="80px" className="rounded-full" src={mainImage || shillo} alt="Shoe Image" />
            <span onClick={openFileExplorer} className='ml-5 my-auto'><img width='30px' src={edit} alt="Edit" /></span>
            <input type="file" ref={fileInputRef} onChange={(event) => handleFileChange(event, setMainImage)} style={{ display: 'none' }} />
          </div>


          {/* Line 3 */}
          <div className="flex flex-row space-x-4">
            {/* Gender */}
            <fieldset className="relative z-0 w-full p-px mb-5">
              <div className="block pt-3 pb-2 space-x-4">
                <label>Gender:</label>
                <label><input type="radio" value="M" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setShoeGender(e.target.value)}}/>M</label>
                <label><input type="radio" value="F" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setShoeGender(e.target.value)}}/>F</label>
              </div>
            </fieldset>
            {/* Size */}
            <div className='z-0 w-full mb-5 flex'>
              <select value={shoeSize} onChange={(e) => setShoeSize(e.target.value)}  className="w-full">
                <option value="" disabled hidden>Choose the size</option>
                {Array.from({ length: 21 }, (_, i) => 5 + 0.5 * i).map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>      
          </div>

          {/* Line 4 */}
          <div className="flex flex-row space-x-4">
            {/* ReleaseDate */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Purchase Year" value={shoeReleaseYear} onChange={(e) => setShoeReleaseYear(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Duration Price** */}
            <div className='z-0 w-full mb-5'>
                <input type="text" placeholder="Auction Duration (Hours)" value={auctionDuration} onChange={(e) => setAuctionDuration(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>

          {/* Line 5 */}
          <div className="flex flex-row space-x-4">
            {/* Starting Bid** */}
            <div className='z-0 w-full mb-5'>
                <input type="text" placeholder="Starting Bid" value={auctionStart} onChange={(e) => setAuctionStart(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Buy Now Price */}
            <div className='z-0 w-full mb-5'>
                <input type="text" placeholder="Buy Now Price" value={price} onChange={(e) => setPrice(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>

          
          {/* Description */}
          <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Description" value={shoeDescription} onChange={(e) => setShoeDescription(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          </div>


          {/* Submit Button */}
          <div className="w-full mt-4">
            <button className="h-auto hover:bg-green-700 lg:h-12 text-xs py-1 lg:py-2 px-2 lg-px-4 text-white font-light tracking-wider bg-gray-900 rounded-lg uppercase w-full focus:outline-none focus:shadow-outline" type="submit">Auction Item</button>
          </div>
        </form>
      )}

      {/* =-=-=-=-=-=-=-==-=-==-=-=--= Trade =-=-=-=-=-=-=-==-=-==-=-=--= */}

      {formType === 'Trade' && (
        <form onSubmit={handleTradeSubmit}>
          {/* Line 1 */}
          <div className="flex flex-row space-x-4">
            {/* Item Name */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Name (Panda)" value={itemName} onChange={(e) => setItemName(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Shoe Company */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Company (Nike)" value={shoeCompany} onChange={(e) => setShoeCompany(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Color */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Color (B/W)" value={shoeColor} onChange={(e) => setShoeColor(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>

          {/* Line 2 - Image */}
          <div className="flex flex-row space-x-4">
            <div className='flex z-0 w-full mb-5 justify-center'>
              Trading
              <img width="80px" className="rounded-full" src={mainImage || shillo} alt="Shoe Image" />
              <span onClick={openFileExplorer} className='ml-5 my-auto'><img width='30px' src={edit} alt="Edit" /></span>
              <input type="file" ref={fileInputRef} onChange={(event) => handleFileChange(event, setMainImage)} style={{ display: 'none' }} />
            </div>

            <div className='flex z-0 w-full mb-5 justify-center'>
              Asking
              <img width="80px" className="rounded-full" src={tradeAskPic || shillo} alt="Shoe Image" />
              <span onClick={openTradeFileExplorer} className='ml-5 my-auto'><img width='30px' src={edit} alt="Edit" /></span>
              <input type="file" ref={tradeFileInputRef} onChange={(event) => handleFileChange(event, setTradeAskPic)} style={{ display: 'none' }} />
            </div>
          </div>


          {/* Line 3 */}
          <div className="flex flex-row space-x-4">
            {/* Gender */}
            <fieldset className="relative z-0 w-full p-px mb-5">
              <div className="block pt-3 pb-2 space-x-4">
                <label>Gender:</label>
                <label><input type="radio" value="M" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setShoeGender(e.target.value)}}/>M</label>
                <label><input type="radio" value="F" name="gender" className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black" onClick={(e)=> { setShoeGender(e.target.value)}}/>F</label>
              </div>
            </fieldset>
            {/* Size */}
            <div className='z-0 w-full mb-5 flex'>
              <select value={shoeSize} onChange={(e) => setShoeSize(e.target.value)}  className="w-full">
                <option value="" disabled hidden>Choose the size</option>
                {Array.from({ length: 21 }, (_, i) => 5 + 0.5 * i).map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>      
          </div>

          {/* Line 4 */}
          <div className="flex flex-row space-x-4">
            {/* ReleaseDate */}
            <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Purchase Year" value={shoeReleaseYear} onChange={(e) => setShoeReleaseYear(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
            {/* Selling Price */}
            <div className='z-0 w-full mb-5'>
                <input type="text" placeholder="Addiontal Asking Money" value={price} onChange={(e) => setPrice(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
            </div>
          </div>


          

          <div className='z-0 w-full mb-5'>
              <input type="text" placeholder="Description" value={shoeDescription} onChange={(e) => setShoeDescription(e.target.value)} className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"/>
          </div>


          {/* Submit Button */}
          <div className="w-full mt-4">
            <button className="h-auto hover:bg-green-700 lg:h-12 text-xs py-1 lg:py-2 px-2 lg-px-4 text-white font-light tracking-wider bg-gray-900 rounded-lg uppercase w-full focus:outline-none focus:shadow-outline" type="submit">Sell Item</button>
          </div>
        </form>
      )}
    </>
  )
}

export default AddItem

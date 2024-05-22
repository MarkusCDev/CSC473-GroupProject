import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUserAuth } from './UserAuthentication'

const ChatComponent = () => {
  const {user} = useUserAuth()
  const [email,setEmail] = useState(user?.email)
  const [isVisible, setIsVisible] = useState(false)
  const [inventory, setInventory] = useState("")
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Tony Stark', text: 'Hey! Need help finding something? 👋' },
  ])
  const [newMessage, setNewMessage] = useState('')

  const toggleChat = () => {
    setIsVisible(!isVisible)
  }

  const handleInputChange = (event) => {
    setNewMessage(event.target.value)
  }

  const sendMessage = async () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'User', text: newMessage }])
      setNewMessage('')
    }
  
    try {
      const response = await axios.post('https://shoesphere-e2agf6geqq-ue.a.run.app/shoegpt/genquery', {
        query: newMessage,
        inventory: JSON.stringify(inventory), // Ensure inventory is in the correct format
      }, {
        headers: {
          Authorization: user.email,
          'Content-Type': 'application/json',
        },
      });
  
      const aiResponse = response.data.query; // Use the correct key
      console.log("AI response", aiResponse)
      setMessages((prevMessages) => [...prevMessages, { id: prevMessages.length + 1, sender: 'Tony Stark', text: aiResponse }]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    }
  }
  

  const getInventory = async () => {
    try {
      const response = await axios.get('https://shoesphere-e2agf6geqq-ue.a.run.app/profile/get_shoe_names', {
        headers: {
          Authorization: user.email,
          'Content-Type': 'application/json',
        },
      })
      const inv = response.data;
      setInventory(inv);
    } catch (error) {
      console.error('Error getting inventory:', error)
      return []
    }
  }
  
  
  useEffect(() => {
    getInventory()
  }, [user])

  return (
    <div className="fixed bottom-0 right-0 mb-4 mr-4 max-w-md shadow-lg rounded-lg">
      <div className="animate-pulse p-4 opacity-85 bg-black text-white flex justify-between items-center rounded-t-lg">
        <button onClick={toggleChat}><h2 className="font-bold mr-2">AI Assistant</h2></button>
        <button onClick={toggleChat}>
          {isVisible ? <>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </> : '+'}
        </button>
      </div>
      {isVisible && (
        <div className="flex flex-col h-96 bg-white rounded-b-lg">
          <ul className="flex-grow overflow-auto p-4">
            {messages.map(message => (
              <li key={message.id} className={`p-3 rounded-lg my-1 ${message.sender === 'Tony Stark' ? 'bg-gray-200 float-left clear-both' : 'bg-blue-200 float-right clear-both'}`}>
                {message.text}
              </li>
            ))}
          </ul>
          <div className="p-4">
            <div className="flex">
              <input
                type="text"
                value={newMessage}
                onChange={handleInputChange}
                className="flex-grow rounded-l-lg p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
                placeholder="Type your message here!"
              />
              <button
                onClick={sendMessage}
                className="px-8 rounded-r-lg bg-blue-500 text-white font-bold p-4 uppercase border-blue-500 border-t border-b border-r"
              >Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatComponent
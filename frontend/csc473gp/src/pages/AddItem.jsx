import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// TODO - Users can add items to their shop

const AddItem = () => {
  const [itemTitle, setItemTitle] = useState("")
  const [itemDesc, setItemDesc] = useState("")
  const [itemImages, setItemImages] = useState([])
  const [itemCategroy, setItemCategory] = useState("")
  

  return (
    <div>AddItem</div>
  )
}

export default AddItem
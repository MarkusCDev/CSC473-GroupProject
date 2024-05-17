import React, { useState } from 'react'
import close from '../assets/close.png'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
        <div className='flex justify-end'>
          <button onClick={onClose}><img width='10px 'src={close}/></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
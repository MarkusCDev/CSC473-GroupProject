import React, { useState } from 'react'

const Section = ({ title, children, isOpen, onClick }) => (
  <div className="border p-4">
    <button
      className="w-full text-left text-lg font-bold py-2 px-4"
      onClick={() => onClick(title)}
    >
      {title}
    </button>
    {isOpen ? <div className="mt-4">{children}</div> : null}
  </div>
)

const Checkout = () => {
  const [openSection, setOpenSection] = useState('Items')

  const handleSectionClick = (section) => {
    setOpenSection(openSection === section ? '' : section)
  }

  return (
    <div className="space-y-4 max-w-4xl mx-auto p-8"> {/* Updated classes here */}
      <Section
        title="Items"
        isOpen={openSection === 'Items'}
        onClick={handleSectionClick}
      >
        {/* Content for items */}
        <p>List of items...</p>
      </Section>

      <Section
        title="Shipping"
        isOpen={openSection === 'Shipping'}
        onClick={handleSectionClick}
      >
        {/* Content for shipping */}
        <p>Shipping details...</p>
      </Section>

      <Section
        title="Checkout"
        isOpen={openSection === 'Checkout'}
        onClick={handleSectionClick}
      >
        {/* Content for checkout */}
        <p>Checkout form...</p>
      </Section>
    </div>
  )
}

export default Checkout


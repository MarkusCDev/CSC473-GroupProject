import React from 'react'
import Navigator from '../components/Navigator'
import Banner from '../components/Banner'
import Bannerimg from '../assets/auction.png'

const Auction = () => {
    return (
        <div className="bg-gray-100">
            <Navigator />
            <Banner img={Bannerimg} />
        </div>
    )
}

export default Auction
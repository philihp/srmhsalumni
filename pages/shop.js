import React from 'react'
import StaffCard from '../components/staff-card'


const Shop = () => (
  
  <div>
   <p>
	Need some SRMHS Alumni gear? Well click the link below and have a t-shirt or hoodie sent directly to you! 
  Show everyone your Bulldog Pride! #GoBulldogs #BULLDOGPRIDE
	 </p>
      <p>
      <Link href="https://teespring.com/srmhs-alumni-assoc-member-mer?pid=212&cid=5818&sid=back">
        <button
          type="button"
          className="h-12 px-6 m-2 text-lg text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
        >
          Shop SRMHS Alumni Association
        </button>
      </Link>
    </p>
  
<div className="flex flex-wrap">
      <StaffCard name="Hoodie" src="/Hoodie Image.jpg" />
      
<div className="flex flex-wrap">
      <StaffCard name="T-Shirt" src="/T-shirt image.jpg" />
  
  
  </div>
)

export default Shop

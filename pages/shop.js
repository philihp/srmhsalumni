import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Shop = () => (
  <>
    <Image scr="/Hoodie Image.jpg" atl="Hoodie" width={1396} height={786} />

    <div>
      <p>
        Need some SRMHS Alumni gear? Well click the link below and have a
        t-shirt or hoodie sent directly to you! Show everyone your Bulldog
        Pride! #GoBulldogs #BULLDOGPRIDE
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
    </div>
  </>
)

export default Shop

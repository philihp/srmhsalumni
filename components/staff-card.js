import React from 'react'

const StaffCard = ({ name, src, title }) => (
  <div className="w-full md:w-1/2 xl:w-1/3 p-6">
    <div className="bg-gradient-to-b from-blue-100 to-blue-100 border-b-4 border-blue-500 rounded-lg">
      <div className="flex flex-row items-center">
        <div className="flex-shrink pr-4">
          <img
            className="h-20 w-20 rounded-full object-cover border-2"
            src={src}
            alt={name}
          />
        </div>
        <div className="flex-1 text-right md:text-center">
          <div className="font-bold text-gray-600">{name}</div>
          <div className="text-gray-900">{title}</div>
        </div>
      </div>
    </div>
  </div>
)

export default StaffCard

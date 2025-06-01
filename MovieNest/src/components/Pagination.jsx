import React from 'react'

function Pagination({ handlePrevious, handleNext, pageNo, isNightMode }) {
  return (
    <div
      className={`mt-8 p-2 flex justify-center ${
        isNightMode ? 'bg-gray-700' : 'bg-gray-300'
      }`}
    >
      <div
        onClick={handlePrevious}
        className={`px-8 hover:cursor-pointer ${
          isNightMode ? 'text-white' : 'text-gray-600'
        }`}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>
      <div
        className={`font-bold ${
          isNightMode ? 'text-white' : 'text-gray-800'
        }`}
      >
        {pageNo}
      </div>
      <div
        onClick={handleNext}
        className={`px-8 ${
          isNightMode ? 'text-white' : 'text-gray-600'
        }`}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </div>
  )
}

export default Pagination

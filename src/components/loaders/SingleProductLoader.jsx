import React from 'react'

const SingleProductLoader = () => {
  return (
    <section>
      <div className="container p-10 flex gap-10">
        {/* Thumbnails */}
        <div className="w-1/2 flex justify-between items-stretch">
          <div className="thumbnails w-1/4 flex flex-col gap-3">
            {/* Loading skeleton for thumbnails */}
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 p-3 rounded-md animate-pulse"
                style={{ width: "100px", height: "100px" }}
              ></div>
            ))}
          </div>
          {/* Image */}
          <div className="imagewrapper w-3/4">
            {/* Loading skeleton for image */}
            <div
              className="h-full bg-gray-200 rounded-md animate-pulse"
              style={{ width: "100%", minHeight: "300px" }}
            ></div>
          </div>
        </div>
        {/* Product Details */}
        <div className="w-1/2">
          <div className="details">
            {/* Rating */}
            <div className="rating flex gap-3 items-center">
              {/* Loading skeleton for rating */}
              <div className="text-yellow-600 w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              {/* Loading skeleton for rating value */}
              <div className="w-10 h-5 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
            {/* Product Title */}
            <h3 className="text-2xl font-bold">
              {/* Loading skeleton for product title */}
              <div className="w-3/4 h-8 bg-gray-200 rounded-md animate-pulse"></div>
            </h3>
            {/* Meta */}
            <div className="meta my-5 flex text-xl font-bold gap-5 items-center">
              {/* Loading skeleton for meta items */}
              {[...Array(3)].map((_, index) => (
                <div key={index} className="item flex items-center gap-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="w-10 h-5 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              ))}
            </div>
            {/* Description */}
            {/* Loading skeleton for description */}
            <div className="w-full h-20 bg-gray-200 rounded-md animate-pulse"></div>
            {/* More Info */}
            {/* Loading skeleton for more info */}
            <div className="moreInfo w-24 h-6 bg-gray-200 rounded-md animate-pulse"></div>
            {/* Buttons */}
            <div className="buttons flex gap-3 items-center">
              {/* Loading skeleton for buttons */}
              <div className="w-20 h-10 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SingleProductLoader
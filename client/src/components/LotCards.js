import React, { useRef, useState } from 'react';
import { QUERY_LOT } from "../utils/queries";
import { useQuery } from "@apollo/client";
import ParkingLotSpots from './ParkingLotSpots'
import seventhstreetlot from "../Images/seventhstreetlot.png"

export default function Lotcards() {
  const { loading, data } = useQuery(QUERY_LOT);
  const [showParkingSpots, setShowParkingSpots] = useState(false)

  const handleButtonClick = (e) => {
    setShowParkingSpots(!showParkingSpots)
  }

  const lotList = data?.lot || [];
  console.log(lotList)
  return (
    <div className="bg-gray-900 min-h-full w-screen flex flex-wrap relative shadow-md sm:rounded-lg">
      {loading ? (
        <div>Loading...</div>
      ) : (
        lotList.map((lot) => {
          return (
            <div className="bg-gray-900  min-w-5- max-w-50 border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700" key={lot._id}>
              <a href="#">
                <img className="rounded-t-lg" src={seventhstreetlot} alt="" />
              </a>
              <div className="p-5">
                <a>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{lot.lotName}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{lot.address}</p>
                <p>${lot.parkingRate}</p>
                <button onClick={handleButtonClick} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Reserve
                  <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </button>
                {showParkingSpots ? (<ParkingLotSpots />) : null}
              </div>
            </div>
          )

        })
      )}
    </div>
  );
}




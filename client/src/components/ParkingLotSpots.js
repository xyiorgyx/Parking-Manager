import { React } from 'react';
import { QUERY_SPACE } from '../utils/queries';
import { useQuery } from "@apollo/client";

export default function ParkingLotSpots() {

    const { loading, data } = useQuery(QUERY_SPACE);

    const spaces = data?.spaces || [];


const handleChange(name)=(e) =>{
 
}
    console.log(spaces)

    return (
        <div className="mx-auto flex flex-col   lg:px-40 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Parking Lot
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Parking Space
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reservation
                        </th>
                    </tr>
                </thead>
                {loading ? (
        <div>Loading...</div>
      ) : (
        spaces.map((space) => {
          return (
                <tbody>
                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Parking Lot: {space.parkingLot}
                        </th>
                        <td className="px-6 py-4">
                            Parking Space: {space.spaceName}
                        </td>
                        <td className="px-6 py-4 ">
                            Occupied: {space.occupied}
                        </td>
                        <td className="px-6 py-4 text-green-500">
                            <button onClick = {handleChange(space.spaceName)}>Reserve</button>
                        </td>
                    </tr>
                </tbody>
             )
          }))}
            </table>

        </div>
    );
}

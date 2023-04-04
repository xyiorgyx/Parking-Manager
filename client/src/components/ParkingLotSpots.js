import { React,useState } from 'react';
import { QUERY_SPACE } from '../utils/queries';
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { OCCUPY_SPACE } from "../utils/mutations";

export default function ParkingLotSpots() {

    const { loading, data } = useQuery(QUERY_SPACE);

    const spaces = data?.spaces || [];

    const [spaceState, setSpaceState] = useState({occupied:false});


    const [occupySpace, { error, date }] = useMutation(OCCUPY_SPACE);

      const handleChange = (event) => {
        setSpaceState((current) => !current);
        //setOccupantState({occupant: Auth.getProfile().data.user.username})
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
          const { data } = await occupySpace({
            variables: {
              spaceState
            },
          });
        } catch (e) {
          console.error(e);
        }
    }
//const handleChange(spaceName)=(e) =>{
    console.log(spaces)

    return (
        <div className="mx-auto flex flex-col w-full h-full bg-gray-900  lg:px-40 overflow-x-auto shadow-md sm:rounded-lg">
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
                            Occupied: {space.occupied ? "Occupied":"Empty"}
                        </td>
                        <td className="px-6 py-4 text-green-500">
                            <button >Reserve</button>
                        </td>
                    </tr>
                </tbody>
             )
          }))}
            </table>

        </div>
    );
}

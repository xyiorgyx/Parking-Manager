import React from 'react';
import { QUERY_USERS } from "../utils/queries"
import { useQuery } from "@apollo/client"

export default function MembersList() {
    const { loading, data } = useQuery(QUERY_USERS);

    const userList = data?.users || [];

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Client Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Car Make/Model (Color)
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Phone Number
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Payment Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((user) => {
                           return( <tr key={user._id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.name}
                                </th>
                                <td class="px-6 py-4">
                                    {user.cars[0].make}{user.cars[0].model}{user.cars[0].color}
                                </td>
                                <td class="px-6 py-4">
                                    {user.phoneNumber}
                                </td>
                                <td class="px-6 py-4">
                                    {user.email}
                                </td>
                                {user.paid= true ?
                                ( <td class="px-6 py-4 text-green-500"> PAID </td>):(
                                <td class="px-6 py-4 text-orange-600">NOT PAID </td>) }
                            </tr>)
                        })}

                        <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Yiorgos Bosnakis
                            </th>
                            <td class="px-6 py-4">
                                Nissan Altima (Silver)
                            </td>
                            <td class="px-6 py-4">
                                555-657-1192
                            </td>
                            <td class="px-6 py-4 ">
                                YiorgyBear@aol.com
                            </td>
                            <td class="px-6 py-4 text-orange-700">
                                NOT PAID
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}

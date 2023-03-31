import React from 'react';

// This List component accepts props from App.js
// We pluck off the "users" property of the props object using destructuring assignment
// This prevents us from having to type `props.users` each time we want to refer to the users object
export default function List({ users }) {
  return (
   <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Alex Luborev
                </th>
                <td class="px-6 py-4">
                    Bugatti
                </td>
                <td class="px-6 py-4">
                   555-555-5555
                </td>
                <td class="px-6 py-4">
                    Alexdaddy555@hut.com
                </td>
                <td class="px-6 py-4 text-green-500">
                    PAID
                </td>
            </tr>
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
            </tr>
        </tbody>
    </table>
</div>
  );
}

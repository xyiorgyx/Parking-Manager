import { React, useState } from 'react';
import { QUERY_LOT } from "../utils/queries"
import { useQuery } from "@apollo/client"

export default function Lotcards() {
    const { loading, error, data } = useQuery(QUERY_LOT);
    const [hasError, setHasError] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const lotList = data?.lots || [];

    if (error) {
        setHasError(true);
    }

    const handleButtonClick = () => {
        setShowCards(true);
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Show Lots</button>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                {loading ? (
                    <div>Loading...</div>
                ) : hasError ? (
                    <div>Error: {error.message}</div>
                ) : showCards ? (
                    lotList.map((lot) => {
                        return (
                            <div className="max-w-sm rounded overflow-hidden shadow-lg" key={lot.id}>
                                <img className="w-full" src={lot.photo} alt={lot.lotName} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl mb-2">{lot.lotName}</div>
                                    <p className="text-gray-700 text-base">
                                        Located near the Center of Charlotte, NC. The 7th street station also offers a fantastic local market for food and refreshments. Amongst them, Denos Pizza is ranked 33 in the world for best pizzeria on Yelp.
                                    </p>
                                </div>
                                <div className="px-6 pt-4 pb-2">
                                    <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"> Reserve </button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <div>No lots to show</div>
                )}
            </div>
        </div>
    );
}
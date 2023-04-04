import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { OCCUPY_SPACE } from "../../utils/mutations";
import { QUERY_CAR} from "../../utils/queries";
import Auth from "../../utils/Auth";


const  OccupySpace = () => {
    const [spaceState, setSpaceState] = useState({occupied:false});
    const [occupantState, setOccupantState] = useState
    ({
    occupant:Auth.getProfile().data.user.cars.owner
    });

    const [occupySpace, { error, date }] = useMutation(OCCUPY_SPACE, {
        update(cache, { data: { occupySpace } }) {
          try {
            const { car } = cache.readQuery({
              query: QUERY_CAR,
            });
            console.log({ me });
            cache.writeQuery({
              query: QUERY_CAR,
              data: { car: { spaces: [...car.spaces, occupySpace] } },
            });
          } catch (e) {
            console.error(e);
          }
        },
      });

      const handleChange = (event) => {
        setSpaceState((current) => !current);
        setOccupantState({occupant: Auth.getProfile().data.user.cars.owner})
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        try {
          const { data } = await occupySpace({
            variables: {
              spaceState,
              occupantState
            },
          });
        } catch (e) {
          console.error(e);
        }
    }
}

export default OccupySpace;
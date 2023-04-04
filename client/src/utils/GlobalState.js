import React, { createContext, useContext } from 'react';
import { useAppReducer } from './reducers';


export const AppContext = createContext();
const { Provider } = AppContext;

export const useApp = () => useContext(AppContext);

export const AppUpdates = ({ value: [], ...props}) => {
  const [state, dispatch] = useAppReducer({
    cars: [],
    users:[]
  });
  return <Provider value={[state, dispatch]}{...props}/>
};
 const useAppContext = () => {
    return useContext(AppContext);
 };
 export {AppUpdates, useAppContext};

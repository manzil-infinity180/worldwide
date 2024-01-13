import { useState,useEffect, useContext } from "react";
import { createContext } from "react";
const BASE_URL = 'http://localhost:9000';
const CityContext = createContext();

function CityProvider ({children}){
  const [cities,setCities] = useState([]);
    const [isloading,setIsloading] = useState(false);
    useEffect(function(){
      async function fetchData(){
      try{
          setIsloading(true);
          const res = await fetch(`${BASE_URL}/cities`);
          const data = await  res.json();
          console.log("chutiya - "+ data)
          setCities(data);
      }catch(err){
        console.log(err);
      }finally{
        setIsloading(false);
      }
    } 
    fetchData();
    },[]);
    return (
      <CityContext.Provider value={{
        cities,
        isloading,

      }}>
        {children}
      </CityContext.Provider>
    )
}
function useCity(){
  const contextValue = useContext(CityContext);
  if(contextValue === undefined) throw new Error("CityContext is used outside the cityprovider");
  return contextValue;
}
export {useCity,CityProvider};
import { useState,useEffect, useContext } from "react";
import { createContext } from "react";
const BASE_URL = 'http://localhost:9000';
const CityContext = createContext();

function CityProvider ({children}){
  const [cities,setCities] = useState([]);
    const [isloading,setIsloading] = useState(false);
    const [currentCity,setCurrentCity] = useState({});

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
    async function cityData(id){
      try{
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        console.log(data);
        setCurrentCity(data);

      }catch(err){
        console.log(err);
      }finally{
        setIsloading(false);
      }
    }
    return (
      <CityContext.Provider value={{
        cities,
        isloading,
        currentCity,
        cityData,
        

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
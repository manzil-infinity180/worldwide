import { BrowserRouter,Routes,Route } from "react-router-dom"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import AppLayout from "./pages/AppLayout"
import { useEffect, useState } from "react"
import CityList from "./components/CityList"
import CountriesList from "./components/CountriesList"
import City from "./components/City"
import Form from "./components/Form"
const BASE_URL = 'http://localhost:9000';


function App() {
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
    
    
    <>
      <BrowserRouter>
      <Routes>
    
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path='login' element={<Login />} /> 
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} isloading={isloading}/>} />
          <Route path="cities" element={<CityList cities={cities} isloading={isloading} />} />
          <Route path='cities/:id' element={<City />} />
          <Route path="countries" element={<CountriesList cities={cities} isloading={isloading}/>} />
          <Route path="form" element={<Form />} />
        </Route> 
        <Route path="*" element={<PageNotFound />} />
      
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
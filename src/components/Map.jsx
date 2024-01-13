import { useSearchParams,useNavigate } from "react-router-dom";
import style from "./Map.module.css"
function Map(){
  const [searchParams , setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const navigate = useNavigate();

  return <div className={style.mapContainer} onClick={()=>navigate("form")}>
    Map:
    <h1>Position </h1>
    <h2>Lat:{lat} & Lng:{lng}</h2>
    <button onClick={()=>setSearchParams({lat:25,lng:-90})} >Change the queries</button> 
  </div>
}
export default Map;
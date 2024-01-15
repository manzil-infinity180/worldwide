import { useSearchParams,useNavigate } from "react-router-dom";
import style from "./Map.module.css"
import {MapContainer,TileLayer,Marker,Popup, useMapEvents} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../../context/CityContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "./Button";
import {useUrlPosition} from '../../hooks/useUrlPosition';
function Map(){
  const {cities} = useCity();
  const [mapPosition , setMapPosition ] = useState([26.765844,83.364944]);
  const {isLoading : isLoadingPosition , 
    position: geolocationPosition,
    getPosition } = useGeolocation();
  
  // const navigate = useNavigate();
const [lat,lng] = useUrlPosition();
  useEffect(function(){
    if(lat && lng ){
      setMapPosition([lat,lng]);
    }

  },[lat,lng])
  useEffect(function(){
    if(geolocationPosition){
      setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
    }
  },[geolocationPosition])
 
  
  return <div className={style.mapContainer} >
  {!geolocationPosition && (<Button type="position" onClick={getPosition} >
    {isLoadingPosition ? "Loading..." : "Use your position"}
  </Button>)}

      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={style.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />
      {cities.map((city)=>
      <Marker position={[city.position.lat,city.position.lng]}>
        <Popup>
          {city.emoji} <br /> {city.cityName}
        </Popup>
      </Marker>)

      }
      <DetectClick />
    </MapContainer>
    
    
  </div>
}
function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
export default Map;
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner"
import DatePick from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import styles from "./Form.module.css";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import {useCity} from "../../context/CityContext";
import {useNavigate } from "react-router-dom";


export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji,setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat,lng] = useUrlPosition();
  const [isgeolocationLoading,setIsGelocationLoading] = useState(false);
  const [georeveredata,setGeoreverseData] = useState([]);
  const [geoCodingError,setGeocodingError] = useState("");
  const URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'
  const navigate = useNavigate();
  useEffect(function(){
    
    async function fetchUrl(){
      try{
      setIsGelocationLoading(true);
      setGeocodingError("");
      const res = await fetch(`${URL}?latitude=${lat}&longitude=${lng}`);
      const data = await res.json();
      console.log(data);
      if(!data.countryCode) throw new Error("Its seems like their is no Country,click somewhere else");
      setGeoreverseData(data);
      setCityName(data.city || data.locality || "");
      setCountry(data.countryName|| "");
      setEmoji(convertToEmoji(data.countryCode));
      
      
    }
    catch(err){
      console.error(err.message);
      setGeocodingError(err.message); 
    }finally{
      setIsGelocationLoading(false);
    }
  }
  fetchUrl();
  },[lat,lng])
  const {addNewCity,isloading} = useCity();

   if(isgeolocationLoading) return <Spinner />
   if(!lat && !lng) return <Message message="Click on map somewhere " />
   if(geoCodingError) return <Message message={geoCodingError} />
   function handleSubmit(e){
    e.preventDefault();
    if(!cityName || !date) return ;
    const newcity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position:{lat,lng}
    }
    addNewCity(newcity);
    navigate("/app/cities");
  }
  return (
    <form className={`${styles.form} ${isloading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        { <span className={styles.flag}>{emoji}</span> }
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        < DatePick id="date" onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy"/>

      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" >Add</Button>
        <BackButton />

      </div>
    </form>
  );
}

export default Form;

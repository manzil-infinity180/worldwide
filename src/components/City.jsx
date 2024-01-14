import { useEffect, useState } from "react";
import { useCity } from "../../context/CityContext";
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton";
import CityItem from "./CityItem";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const {cities,currentCity, cityData} = useCity();
  const [citydata,setCitydata] = useState({});
  const {id} = useParams();
  console.log(id,cities[0].id);
  console.log(currentCity)
  // useEffect(function(){
  //   cityData(id);
    
  // },[id]);
  // console.log(cities);
  // const value = cities.map((city)=> (city.id === id)? city : undefined );
  // console.log(value);
 function getFetchData(id){
  console.log(id);
   cities.map(function (city){
      console.log(city.id == id);

   });
 }
 getFetchData(id);
   
  const index = cities.findIndex((city)=> city.id == id);

  const { cityName, emoji, date, notes } = cities[index];
 

  return (
   
        <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
      

    
  );
}

export default City;

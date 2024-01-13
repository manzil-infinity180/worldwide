import CountryItem from './CountryItem';
import styles from './CountryItem.module.css'
import Spinner from './Spinner';
import Message from './Message';
import { useCity } from '../../context/CityContext';
function CountriesList(){
  const {cities,isloading} = useCity();
  console.log(cities);
  if(isloading) return <Spinner />
  if(!cities.length) return <Message message="No data exist,add your first cities" />

  const countries = cities.reduce((arr,city)=>{
     if(!arr.map(el=>(el.country)).includes(city.country)){
      return [...arr,{country : city.country,emoji : city.emoji }]
     }else{
      return arr;
     }
  },[])
  return (<ul className={styles.countriesList}>
    {countries.map((el)=> <CountryItem country={el}/>)}
  </ul>)
}
export default CountriesList;
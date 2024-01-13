import CityItem from './CityItem';
import styles from './CityList.module.css'
import Spinner from './Spinner';
import Message from './Message';
import { useCity } from '../../context/CityContext';
function CityList(){
  const {cities,isloading} = useCity();
  console.log(cities);
  
  if(isloading) return <Spinner />
  if(!cities.length) return <Message message="No data exist,add your first cities" />

  
  return (<ul className={styles.cityList}>
    {cities.map((city)=> <CityItem city={city} key={city.id}/>)}
  </ul>)
}
export default CityList;
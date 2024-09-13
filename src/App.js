import { useEffect, useState } from 'react';
import './App.css';
import PrayerTime from './prayerTime/PrayerTime';
import axios from 'axios';
function App()
{
  const cities=[
    {name:"القاهرة" , Value:"Cairo"},
    {name:"الاسكندرية" , Value:"Alexandria"},
    {name:"الجيزة" , Value:"Giza"},
    {name:"المنصورة" , Value:"Mansoura"},
    {name:"أسوان" , Value:"Aswan"},
    {name:"الأقصر" , Value:"Luxor"} ,
    {name:"البحيرة " , Value:"Beheira"} ,
    {name:"كفر الشيخ " , Value:"Kafr El Sheikh"} ,
    {name:"الدقهلية " , Value:"Dakahlia"} ,
    {name:"دمياط " , Value:"Damietta"} ,
    {name:"الشرقية " , Value:"Sharqia"} ,
    {name:"شمال سيناء" , Value:"North Sinai"} 

  ]
  const[PrayerTimes , setPrayerTimes]=useState({});
  const[dateTime,setDateTime]=useState("");
  const [City , setCity]=useState("Cairo")
  const [hijri , setHijri]=useState()
  
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=${City}`);
        const data = response.data;
        setPrayerTimes(data.data.timings); 
        console.log(data);
        
         setDateTime(data.data.date.gregorian.date)
        setHijri(data.data.date.hijri.date)
         console.log(data.data.date.gregorian.date);


      } catch (error) {
        console.error(error);
      }
    };

    fetchPrayerTimes();
  }, [City]);


  const Time=(time)=>{
    if(!time){
      return(
       "00:00")
      }  
      let[hours   , minutes]= time.split(":").map(Number)
      const perd = hours>=12?"PM":"AM";
      hours=hours%12||12;
    return `${hours}:${minutes<10?"0" + minutes:minutes} ${perd}`
  }


  return (
    <div className="App">
      <header className="App-header">
  <section>
            <div className="container">
                <div className="top_sec">
                    <div className="city">
                        <h3>المدينة</h3>
                        <select name='' id=''onChange={(e)=>setCity(e.target.value)}>
                          {cities.map((city_obj)=>(
                            <option key={city_obj.Value} value={city_obj.Value}>{city_obj.name}</option>
                          ))}
                        </select>
                    </div>
                    <div className="date">
                        <h5>التاريخ الميلادى:{dateTime}</h5>
                        <h5>التاريخ الهجرى:{hijri}</h5>
                        
                    </div>
                </div>
                <PrayerTime name="الفجر" time={Time(PrayerTimes.Fajr)}  />
              <PrayerTime name="الظهر" time={Time(PrayerTimes.Dhuhr)}/>
              <PrayerTime name="العصر" time={Time(PrayerTimes.Asr)}/>
              <PrayerTime name="المغرب" time={Time(PrayerTimes.Maghrib)}/>
              <PrayerTime name="العشاء" time={Time(PrayerTimes.Isha)}/>
            </div>
        </section>
    </header>
    </div>
  );
}
export default App;
 
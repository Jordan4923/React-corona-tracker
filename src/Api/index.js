import axios from 'axios'

const url = 'https://covid19.mathdro.id/api'

 export const fetchData = async (country) =>{
     let changableUrl = url
     if(country){
         changableUrl =`${url}/countries/${country}`
     }
    console.log('fetchdatafunction')
    try{
        const {data : { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changableUrl)
        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate
        }
        return modifiedData
    }
    catch(error){
        console.log(error)
    }
}
export const fetchDailyData = async () =>{
    try{
        const { data } = await axios.get(`${url}/daily`)
       console.log('fetchdailydata')
       const modifiedData = data.map( (dailyData) => ({
           //RETURNING AS object
           confirmed: dailyData.confirmed.total,
           deaths: dailyData.deaths.total,
           date: dailyData.reportDate
       }))
       return modifiedData
    }
    catch(error){

    }
}

export const fetchCountries = async () => {
    try {
      const { data: { countries } } = await axios.get(`${url}/countries`);
  
      return countries.map((country) => country.name);
    } catch (error) {
      return error;
    }
  };
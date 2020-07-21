//React Hooks
 import React,{ useState , useEffect} from 'react'
 import { fetchDailyData } from '../../Api/index'
 import { Line, Bar } from 'react-chartjs-2'
 import styles from './Chart.module.css'

const Charts = ({ data: { confirmed, recovered, deaths }, country }) =>{
    //specifing state
    const [dailyData, setDailyData] = useState({})
    
    useEffect( () =>{
        const fetchAPI = async () =>{
            setDailyData(await fetchDailyData())
        }
        console.log('useEffect')
        fetchAPI()
    },[] )


    const lineChart = (
        dailyData[0] ? (
        <Line
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [{
              data: dailyData.map((data) => data.confirmed),
              label: 'Infected',
              borderColor: 'blueviolet',
              fill: true,
            }, {
              data: dailyData.map((data) => data.deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: '#ffdedd',
              fill: true,
            },
            ],
        }}>
        </Line> ) : null
    );

    const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['blueviolet', 'greenyellow', 'red'],
                  data: [confirmed.value, recovered.value, deaths.value],
                },
              ],
            }}
            options={{
              legend: { display: false },
              title: { display: true, text: `Current situation of COVID-19 in ${country}` },
            }}
          />
        ) : null
      );

    return(
        <div className={styles.container}>
            {country ? barChart : lineChart }
        </div>
    )
}

export default Charts
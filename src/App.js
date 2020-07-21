import React, {Component} from 'react'
import {Cards,Charts, CountryPicker } from './components'
import classes from './App.module.css'
//named Import
import { fetchData } from './Api/index'

class App extends Component{

state = {
  data: {},
  country: '',
}

async  componentDidMount(){
  console.log('componentDidMount')
    const fetchedData = await fetchData()
    console.log(fetchedData)
    this.setState({data: fetchedData })
  }

  handleCountryChange = async(country) => {
  
    const fetchedData = await fetchData(country)
    console.log(fetchedData)
    //set state
    this.setState({data: fetchedData, country: country})
  }
  render(){

    
  console.log('render')
    return(
      
      <div className={classes.container}>
        <h1 className={classes.head}>Covid-19 Tracker by <small>Jordan Nakib</small></h1>
        <Cards data={this.state.data}></Cards>
        <CountryPicker handleCountryChange={this.handleCountryChange}></CountryPicker>
        <Charts data={this.state.data} country={this.state.country}></Charts>
      </div>
    )
  }
}

export default App;

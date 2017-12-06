import React, { Component } from 'react'
import { makeNightSky } from '../../services/makeNightSky'
import { CreateFireworks } from '../../services/birthday'
import "./style.css";
import { Link } from 'react-router-dom'

class App extends Component {
  componentDidMount(){
    makeNightSky();

    let today = new Date();
    let month = today.getMonth()+1;
    let day = today.getDate();

    if(month === 12 && day === 9){
      (new CreateFireworks());
    }
  }
  render(){
    return (
      <div className="app">
        <h1>
          <Link to="/">Julekalender</Link>
        </h1>
        <canvas id="sky"></canvas>
        {this.props.children}
      </div>
    );
  }
}

export default App

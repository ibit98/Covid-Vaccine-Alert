import './App.css';
import React, {useState} from 'react';

function App() {
  const date = '26-05-2021';
  const pin = [
    '741101'
  ];
  return (
    <div className="App-header">
      <Location date={date} pin={pin[0]} age={18} />
    </div>
  );
}

function Location(props) {
  const [available, setAvailable] =  useState(false);
  setInterval(() => {
    fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${props.pin}&date=${props.date}`)
      .then((res) => res.json())
      .then((result) => {
        result = result.centers;
        result.forEach(center => {
          center.sessions.forEach(session => {
            if (session.min_age_limit >= props.age && session.available_capacity > 0) {
              setAvailable(true); 
              window.open("https://www.youtube.com/watch?v=E_bFDpA22YU", "_blank");
              var time = new Date().toLocaleString();
              console.log(time);
            } 
          });
        })
      });
  }, 30000);

  return (
    <div className="block">
      <span>{props.pin}</span>
      <span>{props.age}</span>
      <span>{props.date}</span>
      <button   
        style={ available ? {background: 'green'} : {background: 'red'}}
      >
        {available ? 'Available': 'Unavailable'}
      </button>
    </div>
    
  );
}

export default App;

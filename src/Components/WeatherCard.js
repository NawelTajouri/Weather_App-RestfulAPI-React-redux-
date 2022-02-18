import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import RainDay  from './rra.jpg';
import sun from './sunshine.jpg';
import cloudDay from './daycloud.jpg';
import nday from './cloudyday.jpg'


const UserCard = ({ arr, weatherSelector }) => {
  let details ="";
  if (weatherSelector) {
    const a = arr;
    var day = ""
    const hourArr = a.hour ;
    
    const text = a.day.condition.text
    for (let j = 0; j<hourArr.length; j++) {
      if (a.hour[j].is_day == "0") 
      {
           day = "0";
      } 
      else {
          day = "1";
      }
      console.log(a.hour[j].is_day);
    }
    console.log(day);
    


    details = (
      <div>
        
      <Card style={{ width: "20rem" }}>
        {/* <div className="header" style={{backgroundColor: (text.includes("rain") && day == "1")? "grey" : (text.includes("Sunny") && day == "1") ? "yellow" : (day == "1") ? "red" : (text.includes("rain") && day == "0") ? "black" : (text.includes("Clear") && day == "0") ? "blue" : "green"}}> */}
        <div
          className="header" 
          style={{backgroundImage: (text.includes("rain"))?  `url(${RainDay})` : (text.includes("Sunny")) ?  `url(${sun})` : (text.includes("cloudy"))?  `url(${cloudDay})` :   `url(${nday})` , backgroundRepeat: "no-repeat", backgroundSize: "cover"}}
        >
          <div className="head">
            <div className="head-info">
              <div className="info_temp">
                <p>{weatherSelector.location.name}</p>
                <p>{a.day.condition.text}</p>
              </div>
            </div>
          </div>

        </div>

        <Card.Body className="body_info">
            <div className="location_logo">
            <Card.Title>{weatherSelector.location.name} </Card.Title>
            <div className="info_log">
              <img src={a.day.condition.icon} />
            </div>
            <p>{a.date}</p>
            </div>
            <div className="Low_High">
            <p>L {a.day.mintemp_c}°</p>
            <p>H {a.day.maxtemp_c}°</p>
            </div>
            <div className="rise_set">
            <p>Sunrise {a.astro.sunrise}</p>
            <p>Sunset {a.astro.sunset}</p>
            </div>
          </Card.Body>
      </Card>
      </div>
    );

  }
 
  return (
    <div>
      {details}
    </div>
  );
};

export default UserCard;


import { Container } from "react-bootstrap";
import "./App.css";

import Getweather from "./Components/Getweather";
import video from './weath.mp4';
function App() {
  
  return (
    
      <div className="App">
       
        <video muted loop autoStart autoPlay >
      <source src={video} type="video/mp4"/>
</video>
        <Container>
        <Getweather/>
        </Container>
      </div>
   
  );
}

export default App;

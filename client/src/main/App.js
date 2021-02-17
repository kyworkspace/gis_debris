import React from 'react';
import LeftNav from '../component/Navbar/LeftNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import WindowSectionModal from '../component/Modal/WindowSection/WindowSectionModal';


function App() {

  
  return (
    <Router>
        <div>
          <Switch >
            <Route exact path="/" component={LeftNav}/>
            <Route exact path="/MarineZoneDetail/:marineZoneId" component={WindowSectionModal}/>
          </Switch>
        </div>
    </Router>
      
  );
}



export default App;

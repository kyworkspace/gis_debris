import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import LeftNav from  '../component/Navbar/LeftNav'


function App() {

  
  return (
    <Router>
        <div>
          <Switch >
            <Route exact path="/" component={LeftNav}/>
            {/* <Route exact path="/windowModal" component={WindowSectionModal}/> */}
          </Switch>
        </div>
    </Router>
      
  );
}

export default App;

import React from 'react';
import LeftNav from '../component/Navbar/LeftNav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';


function App() {


  return (
    <Router>
      <div>
        <Switch >
          <Route exact path="/" component={LeftNav} />
          {/* <Route exact path="/windowModal" component={WindowSectionModal}/> */}
        </Switch>
      </div>
    </Router>

  );
}



export default App;

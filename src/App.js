import React from 'react';
import {Route, Switch } from 'react-router-dom';
import LoginPage from "./Containers/Login"
import Mainpage from './Containers/Mainpage';


class App extends React.Component{

  render(){
    return(
      <div>
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/login' component={LoginPage}/>
        {<Route path='/mainpage' component={Mainpage}/>}
      </Switch>
      </div>
    )
  }
}

export default App;

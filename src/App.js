import { useEffect } from 'react'
import './App.css'
import Login from './Component/Login/Login'
import Home from './Component/Home/Home'
import Header from './Component/Header/Header'
import { getUserAuth } from './actions'
import { BrowserRouter as Router , Switch, Route} from 'react-router-dom'
import {connect} from 'react-redux'

function App(props) {

  useEffect(() => {
    props.getUserAuth();
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login/>
          </Route>
          <Route path = "/home">
            <Home/>
            <Header/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps = (state) =>{
  return{};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth())
});

export default connect( mapStateToProps, mapDispatchToProps )(App);

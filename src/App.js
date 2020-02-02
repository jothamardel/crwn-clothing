import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';

import Header from './components/header/header.component';

import SignAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import { auth } from './firebase/firebase.utils';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUSer: null
    }
  }

  unsubscribedFromAuth = null

  componentDidMount() {
    this.unsubscribedFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUSer: user })

      // console.log(user)
    })
  }

  componentWillUnmount(){
    this.unsubscribedFromAuth();
  }

  render () {

    return (
      <div>
        <Header currentUser = { this.state.currentUSer }/>
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route  path='/shop' component={ ShopPage }/>
          <Route path='/signin' component={ SignAndSignUpPage } />
        </Switch>
      </div>
    );
  }
}

export default App;

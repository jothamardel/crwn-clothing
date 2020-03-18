import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';

import Header from './components/header/header.component';

import SignAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUSer } from './redux/user/user.actions';



class App extends React.Component {


  unsubscribedFromAuth = null

  componentDidMount() {
    const { setCurrentUSer } = this.props;

    this.unsubscribedFromAuth = auth.onAuthStateChanged( async userAuth => {

      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUSer({
              id: snapShot.id,
              ...snapShot.data()
            })
        })

        

      }else{
        setCurrentUSer(userAuth)
      }

      // this.setState({ currentUSer: user })

      // console.log(user)
    })
  }

  componentWillUnmount(){
    this.unsubscribedFromAuth();
  }

  render () {

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route  path='/shop' component={ ShopPage }/>
          <Route path='/signin' component={ SignAndSignUpPage } />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setCurrentUSer: user => dispatch(setCurrentUSer(user))
})

export default connect(
  null, 
  mapDispatchToProps)(App);

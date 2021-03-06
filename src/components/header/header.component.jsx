import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectCartHidden } from '../../redux/cart/cart.selectors';

import { ReactComponent as Logo } from '../../assets/crown.svg';


import './header.styles.scss';

const Header = ({ currentUser, hidden }) => {
    
    return (
    <div className='header'>
        <Link className='logo-container' to="/">
            <Logo className='logo'/>
            <h3>MLM</h3>
        </Link>
        <div className='options'>
            {
                currentUser ? <div className='option welcome'>Welcome, {currentUser.displayName.toUpperCase()}</div> :null

            }
            <Link className='option' to="/shop"> 
                SHOP
            </Link>
            <Link className='option' to="/shop"> 
                CONTACT
            </Link>
            {
                
                currentUser ?
                <div className='option' onClick={ () => auth.signOut() }> SIGN OUT </div>
                : 
                <Link className='option' to='/signin'> SIGN IN </Link>
                
                
            }

            <CartIcon />
            {
                hidden ? null : <CartDropdown /> 
            }
        </div>
    </div>
)}

const mapStateToProps =   createStructuredSelector ({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);
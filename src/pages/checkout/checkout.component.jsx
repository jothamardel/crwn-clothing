import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckOutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';
// import PaystackCheckoutButton from '../../components/paystack/paystack.component';

import { 
    selectCartItems, 
    selectCartTotal 
} from '../../redux/cart/cart.selectors'

import { selectCurrentUser } from '../../redux/user/user.selectors'


import './checkout.styles.scss'

const CheckoutPage = ({ currentUser, cartItems, total }) => {
    // console.log('User details', currentUser)
    return (
    <div className='checkout-page'>

        <div className='checkout-header'>

            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>

        </div>


        {
            cartItems.map(cartItem => 
                <CheckOutItem key={ cartItem.id } cartItem={ cartItem }/>    
            )
        }

        <div className='total'>
            <span>TOTAL: &#8358;{`${ total }.00`}</span>
        </div>

        <div className='test-warning'>
            *Please use the following test credit card for payments* 
            <br/>
            4242 4242 4242 4242 - Exp: 01/22 - CVV: 123
        </div>

        <StripeCheckoutButton price={ total }/>
        {/* <PaystackCheckoutButton price={ total } /> */}
    </div>
)}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartItems: selectCartItems,
    total: selectCartTotal
})


export default connect(mapStateToProps)( CheckoutPage);
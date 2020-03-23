import React from 'react';

import StripCheckout from 'react-stripe-checkout';


const StripCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_2oXlQnEu0DVP3sINZxqAWmqd00i7M1X5Iq';

    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripCheckout 
            label= 'Pay Now'
            name='MLM Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is N${ price }`}
            amount={ priceForStripe }
            panelLabel='Pay Now'
            token={ onToken }
            stripeKey={ publishableKey }
        />
    )
}


export default StripCheckoutButton;
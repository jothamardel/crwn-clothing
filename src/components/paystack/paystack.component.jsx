import React from 'react';

import PaystackButton from 'react-paystack';



const PaystackCheckoutButton = ({ price, userEmail }) => {
    console.log(price, userEmail)
    const key = 'pk_live_25eca83d4dc2f02cfdc9a27c47884ac63f65ae84'
    const amount = price * 100

    const callback = (response) => {
        alert('Transaction Successful')
        console.log(response); // card charged successfully, get reference here
    }

    const getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        console.log(text)
        return text;
    }

    const close = () => {

        console.log("Payment closed");
        return 'successful'
    }


    return (
        <PaystackButton 
            text="Pay Now"
            className="payButton"
            callback={ callback }
            close={ close() }
            reference={ getReference() }
            email={ 'ardelmbiplang@gmail.com' }
            amount={ amount }
            paystackkey={ key }
            tag="button"
        />
    )

}

export default PaystackCheckoutButton;
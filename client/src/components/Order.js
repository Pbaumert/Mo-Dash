import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { PLACE_ORDER } from '../utils/mutations';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-stripe-public-key-here');

function Order({ packageId }) {
  const [order, setOrder] = useState(null);
  const [placeOrder] = useMutation(PLACE_ORDER);

  const handleOrder = async () => {
    const { data } = await placeOrder({ variables: { packageId } });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: data.createPaymentSession.id });
  };

  return (
    <div>
      <h2>Complete your order</h2>
      <button onClick={handleOrder}>Pay Now</button>
    </div>
  );
}

export default Order;

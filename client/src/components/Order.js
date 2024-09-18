import React from 'react';
import { useNavigate } from 'react-router-dom';

function Order() {
  const navigate = useNavigate();

  const handleOrder = () => {
    // Simulate a successful order
    console.log('Payment successful!');

    // Redirect to Thank You page
    navigate('/thank-you');
  };

  return (
    <div>
      <h2>Complete your order</h2>
      <button onClick={handleOrder}>Pay Now (Simulated)</button>
    </div>
  );
}

export default Order;


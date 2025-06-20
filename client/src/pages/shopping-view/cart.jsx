import React from 'react'
import { useNavigate } from 'react-router-dom';

function ShoppingCart({ isLoggedIn }) {

   const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      // Redirect to login if not logged in
      navigate('/login');
    } else {
      // Proceed to checkout
      navigate('/checkout');
    }
  };

  return (
     <div>
      {/* ...cart items... */}
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  )
}

export default ShoppingCart;
import React from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div className='m-5 w-100 text-center fs-3'>
        The Cart is Empty!
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
  
    // Map the cart data to include itemId, price, and quantity
    const orderData = data.map(item => ({
      itemId: item.id, // or item._id if that is the ID field in your cart data
      price: item.price, // price field
      quantity: item.qty, // quantity field
    }));
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/orderData", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_data: orderData, // Send the structured order data
          email: userEmail,
          order_date: new Date().toDateString(),
        })
      });
  
      const responseBody = await response.json();
      console.log("Response Body:", responseBody);
      console.log("Response Status:", response.status);
  
      if (response.status === 200) {
        dispatch({ type: "DROP" });
        console.log("Order completed and cart cleared.");
      } else {
        console.error("Failed to complete the order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
   

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md bg-white'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}

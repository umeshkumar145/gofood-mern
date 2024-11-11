import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useCallback } from 'react';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);
    const userEmail = localStorage.getItem('userEmail');

    const fetchMyOrder = useCallback(() => {
        try {
            const response =  fetch("http://localhost:5000/api/auth/myOrderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: userEmail })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }

            const data =  response.json();
            setOrderData(data.orderData || []);
        } catch (error) {
            console.error("Error fetching order data:", error);
            setOrderData([]); // Set to empty array to handle in render
        }
    },[]);

    useEffect(() => {
        fetchMyOrder();
    }, [fetchMyOrder]); // Include fetchMyOrder in the dependency array
    

    return (
        <div>
            <Navbar />
            <div className='container'>
                <div className='row'>
                    {orderData ? (
                        orderData.reverse().map((order) => (
                            <div key={order[order.length - 1]}>
                                {order[order.length - 1] ? (
                                    <div className='m-auto mt-5'>
                                        <h4>Order Date: {new Date(order[order.length - 1]).toLocaleDateString()}</h4>
                                        <hr />
                                        {order[0].map((item) => (
                                            <div key={item.id} className='col-12 col-md-6 col-lg-3'>
                                                <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                    <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{item.name}</h5>
                                                        <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                            <span className='m-1'>{item.qty}</span>
                                                            <span className='m-1'>{item.size}</span>
                                                            <span className='m-1'>₹{item.price}/-</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </div>
                        ))
                    ) : (
                        <div className='text-center mt-5'>Loading your orders...</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

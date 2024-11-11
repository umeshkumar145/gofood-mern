import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    const data = useCart();
    const navigate = useNavigate();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");
    const priceRef = useRef();
    const dispatch = useDispatchCart();
    
    // Set initial size on mount
    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);
    
    // Handle quantity change
    const handleQty = (e) => {
        setQty(e.target.value);
    };

    // Handle size selection change
    const handleOptions = (e) => {
        setSize(e.target.value);
    };

    // Redirect to login if not authenticated
    const handleClick = () => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    };

    // Add item to cart with proper checks
    const handleAddToCart = async () => {
        const foodItemInCart = data.find(item => item.id === props.item._id);
    
        if (foodItemInCart) {
            if (foodItemInCart.size === size) {
                await dispatch({ type: "UPDATE_ITEM", id: props.item._id, price: finalPrice, qty });
            } else {
                await dispatch({ type: "ADD_ITEM", id: props.item._id, name: props.foodName, price: finalPrice, qty, size, img: props.ImgSrc });
            }
        } else {
            await dispatch({ type: "ADD_ITEM", id: props.item._id, name: props.foodName, price: finalPrice, qty, size, img: props.ImgSrc });
        }
    };
    
    
    

    // Calculate final price based on quantity and selected size
    const finalPrice = qty * parseInt(props.options[size], 10) || 0; // Handle case where size may not be selected yet

    return (
        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
            <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
            <div className="card-body">
                <h5 className="card-title">{props.foodName}</h5>
                <div className='container w-100 p-0' style={{ height: "38px" }}>
                    <select className="m-2 h-100 w-20 bg-success text-black rounded" onClick={handleClick} onChange={handleQty}>
                        {Array.from({ length: 6 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                    </select>
                    <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onClick={handleClick} onChange={handleOptions}>
                        {Object.keys(props.options).map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                        ₹{finalPrice}/-
                    </div>
                </div>
                <hr />
                <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    );
}

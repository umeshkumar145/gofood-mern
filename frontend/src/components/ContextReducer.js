import React, { useReducer, useContext, createContext } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Define the initial state for the cart
const initialState = [];

// Define the reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            return [
                ...state, 
                { 
                    id: action.id, 
                    name: action.name, 
                    qty: action.qty, 
                    size: action.size, 
                    price: action.price, 
                    img: action.img 
                }
            ];
        }
        case "REMOVE_ITEM": {
            return state.filter((_, index) => index !== action.index);
        }
        case "CLEAR_CART": {
            return [];
        }
        case "DROP": {
            return [];
        }
        
        case "UPDATE_ITEM": {
            return state.map((item) => {
                if (item.id === action.id) {
                    return { 
                        ...item, 
                        qty: item.qty + action.qty, 
                        price: item.price + action.price 
                    };
                }
                return item;
            });
        }
        default: {
            console.error(`Unhandled action type: ${action.type}`);
            return state; // Return the current state if action type is unknown
        }
    }
};

// Create the CartProvider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

// Custom hooks for accessing the cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);

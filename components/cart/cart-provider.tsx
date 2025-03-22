"use client";

import { Product } from "@/db/schema";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

interface CartProviderProps {
    children: ReactNode
}

export interface CartProduct extends Product {
    quantity: number
}

type CartContextValue = {
    cartItems: CartProduct[] | [],
    cartQuantity: number,
    getItemQuantity: (itemId: string) => number,
    addToCart: (item: CartProduct) => void,
    removeFromCart: (itemId: string) => void,
    increaseQuantity: (itemId: string) => void,
    decreaseQuantity: (itemId: string) => void

}
const CartContext = createContext<CartContextValue>({
    cartItems: [],
    cartQuantity: 0,
    getItemQuantity: () => 0,
    addToCart: () => {},
    removeFromCart: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {},
});

export const useCart = () => {
    return useContext(CartContext);
}

const CartProvider: React.FC<CartProviderProps> = ({children}) => {

    const [cartItems, setCartItems] = useState<CartProduct[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Mark the component as mounted
        const cartString = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
        const parsedCart = cartString ? JSON.parse(cartString) : [];
        setCartItems(Array.isArray(parsedCart) ? parsedCart : []);
    }, []);

    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart", JSON.stringify(cartItems));
        }
    }, [cartItems, isMounted]);


    const cartQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((quantity, item) => quantity + item.quantity, 0)
    : 0;
      
    const getItemQuantity = (itemId: string) => {
        return Array.isArray(cartItems)
            ? cartItems.find(item => item.productId === itemId)?.quantity || 0
            : 0;
    };

    const addToCart = (item: Product) => {
        setCartItems((prevItems) => [...(prevItems || []), { ...item, quantity: 1 }]);
    }

    const removeFromCart = (itemId: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.productId !== itemId))
    }

    const increaseQuantity = (itemId: string) => {
        setCartItems((prevItems) => prevItems.map((item) => item.productId === itemId ? {...item, quantity: item.quantity + 1 } : item))
    }

    const decreaseQuantity = (itemId: string) => {
        setCartItems((prevItems) => prevItems.map((item) => item.productId === itemId ? {...item, quantity: item.quantity - 1} : item).filter((item) => item.quantity > 0))
    }

    return (
        <CartContext.Provider value={{cartItems, cartQuantity, getItemQuantity,  addToCart, removeFromCart, increaseQuantity, decreaseQuantity}}>
            {children}
        </CartContext.Provider>

    )

}

export default CartProvider
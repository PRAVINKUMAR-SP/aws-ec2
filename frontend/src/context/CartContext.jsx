import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    // Load initial cart from localStorage
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem('a2z_cart');
            if (savedCart) {
                const parsed = JSON.parse(savedCart);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (e) {
            console.error("Error parsing cart from localStorage", e);
        }
        return [];
    });

    // Save to localStorage on every change
    useEffect(() => {
        localStorage.setItem('a2z_cart', JSON.stringify(cart));
    }, [cart]);

    const [orders, setOrders] = useState(() => {
        try {
            const savedOrders = localStorage.getItem('a2z_orders');
            if (savedOrders) {
                const parsed = JSON.parse(savedOrders);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (e) {
            console.error("Error parsing orders from localStorage", e);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('a2z_orders', JSON.stringify(orders));
    }, [orders]);

    const [addresses, setAddresses] = useState(() => {
        try {
            const savedAddresses = localStorage.getItem('a2z_addresses');
            if (savedAddresses) {
                const parsed = JSON.parse(savedAddresses);
                return Array.isArray(parsed) ? parsed : [];
            }
        } catch (e) {
            console.error("Error parsing addresses from localStorage", e);
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('a2z_addresses', JSON.stringify(addresses));
    }, [addresses]);

    const addToCart = (product, quantity = 1) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === product.id);
            if (existingItem) {
                // If item exists, increase quantity
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If new item, add to cart
                return [...prevCart, { ...product, quantity }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCart(prevCart => prevCart.map(item =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    };

    const placeOrder = async (currentCart, totalAmount, orderId, address) => {
        const newOrder = {
            id: orderId,
            date: new Date().toISOString(),
            items: [...currentCart],
            totalAmount: totalAmount,
            address: address,
            status: "Processing"
        };
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        
        // Also save to backend
        try {
            const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';
            await axios.post('http://localhost:8080/api/orders', {
                userEmail: userEmail,
                totalAmount: totalAmount,
                itemsJson: JSON.stringify(currentCart),
                shippingAddress: `${address.fullName}, ${address.addressLine}, ${address.city}, ${address.pincode}`,
                status: "PENDING"
            });
        } catch (err) {
            console.error("Failed to save order to backend:", err);
        }
    };

    const addAddress = (addressData) => {
        const newAddress = {
            id: "ADDR-" + Math.floor(Math.random() * 100000000),
            ...addressData
        };
        setAddresses(prev => [...prev, newAddress]);
        return newAddress;
    };

    const updateAddress = (id, addressData) => {
        setAddresses(prev => prev.map(addr => addr.id === id ? { ...addr, ...addressData } : addr));
    };

    const deleteAddress = (id) => {
        setAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        orders,
        placeOrder,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

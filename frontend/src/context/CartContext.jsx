import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const userEmail = localStorage.getItem('userEmail') || 'guest@example.com';
    const cartKey = `a2z_cart_${userEmail}`;

    // Load initial cart from localStorage
    const [cart, setCart] = useState(() => {
        try {
            const savedCart = localStorage.getItem(cartKey);
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
        localStorage.setItem(cartKey, JSON.stringify(cart));
    }, [cart, cartKey]);

    const [orders, setOrders] = useState([]);
    const [addresses, setAddresses] = useState([]);

    // Fetch Orders & Addresses from backend when userEmail changes
    useEffect(() => {
        const fetchUserData = async () => {
            if (userEmail === 'guest@example.com') {
                setOrders([]);
                setAddresses([]);
                return;
            }
            try {
                const [ordersRes, addrRes] = await Promise.all([
                    axios.get(`/api/orders/user/${userEmail}`),
                    axios.get(`/api/addresses/user/${userEmail}`)
                ]);
                
                const parsedOrders = (ordersRes.data || []).map(order => ({
                    id: order.id,
                    date: order.orderDate,
                    totalAmount: order.totalAmount,
                    address: order.shippingAddress,
                    status: order.status,
                    items: order.itemsJson ? JSON.parse(order.itemsJson) : []
                }));
                setOrders(parsedOrders);
                setAddresses(addrRes.data || []);
            } catch (error) {
                console.error("Error fetching user data from backend:", error);
            }
        };
        fetchUserData();
    }, [userEmail]);

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
        try {
            const response = await axios.post(`/api/orders`, {
                userEmail: userEmail,
                totalAmount: totalAmount,
                itemsJson: JSON.stringify(currentCart),
                shippingAddress: `${address.fullName}, ${address.addressLine}, ${address.city}, ${address.pincode}`,
                status: "PENDING"
            });
            
            // Format for frontend state
            const newOrder = {
                id: response.data.id,
                date: response.data.orderDate,
                items: currentCart,
                totalAmount: totalAmount,
                address: address,
                status: response.data.status
            };
            setOrders(prevOrders => [newOrder, ...prevOrders]);
        } catch (err) {
            console.error("Failed to save order to backend:", err);
            throw err; // throw so frontend can show error
        }
    };

    const addAddress = async (addressData) => {
        try {
            const response = await axios.post(`/api/addresses`, {
                ...addressData,
                userEmail: userEmail
            });
            setAddresses(prev => [...prev, response.data]);
            return response.data;
        } catch (error) {
            console.error("Error adding address:", error);
            throw error;
        }
    };

    const updateAddress = async (id, addressData) => {
        try {
            const response = await axios.put(`/api/addresses/${id}`, addressData);
            setAddresses(prev => prev.map(addr => addr.id === id ? response.data : addr));
        } catch (error) {
            console.error("Error updating address:", error);
        }
    };

    const deleteAddress = async (id) => {
        try {
            await axios.delete(`/api/addresses/${id}`);
            setAddresses(prev => prev.filter(addr => addr.id !== id));
        } catch (error) {
            console.error("Error deleting address:", error);
        }
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

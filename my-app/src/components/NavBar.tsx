import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';

const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector(state => state.auth.token !== null);
    const userEmail = useAppSelector(state => state.auth.user?.email);

    const handleLogout = () => {
        // Dispatch logout actions
        dispatch(logout());
        dispatch(clearCart());
    };

    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
            <Link to="/" style={{ marginRight: '2rem', fontWeight: 'bold', textDecoration: 'none' }}>
                Bookstore
            </Link>
            {isAuthenticated ? (
                <>
                    <Link to="/cart" style={{ marginRight: '1rem', textDecoration: 'none' }}>
                        My Cart
                    </Link>
                    <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
                        Logout {userEmail ? `(${userEmail})` : ''}
                    </button>
                </>
            ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    Login
                </Link>
            )}
        </nav>
    );
};

export default NavBar;

import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../hooks';
import { loginWithGoogle } from '../slices/authSlice';

const LoginWithGoogle = () => {
    const dispatch = useAppDispatch();

    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential || '';
                dispatch(loginWithGoogle({ token }));
            }}
            onError={() => {
                console.log('Błąd logowania przez Google');
            }}
        />
    );
};

export default LoginWithGoogle;

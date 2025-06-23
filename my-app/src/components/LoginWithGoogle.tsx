import React from 'react';

const LoginWithGoogle = () => {
    const handleLogin = () => {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    };

    return (
        <button onClick={handleLogin}>
            Zaloguj przez Google
        </button>
    );
};

export default LoginWithGoogle;

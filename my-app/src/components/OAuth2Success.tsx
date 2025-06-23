import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { setTokenAndUserFromJwt } from '../slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import { UserResponse, UserRole } from '../types';

interface JwtPayload {
    sub: string;
    email: string;
    username: string;
    role: UserRole;
    exp: number;
}

const OAuth2Success = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get('token');

        if (token) {
            try {
                const decoded: JwtPayload = jwtDecode(token);

                const user: UserResponse = {
                    id: parseInt(decoded.sub, 10),
                    email: decoded.email,
                    username: decoded.username,
                    role: decoded.role,
                };

                dispatch(setTokenAndUserFromJwt({ token, user }));

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                navigate('/');
            } catch (err) {
                console.error('Błąd dekodowania tokena:', err);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [dispatch, navigate]);

    return <div>Logowanie przez Google... Trwa przekierowanie...</div>;
};

export default OAuth2Success;

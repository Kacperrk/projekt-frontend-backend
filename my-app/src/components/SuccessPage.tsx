import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from '../hooks';
import { clearCart } from '../slices/cartSlice';

const SuccessPage = () => {
    const { search, state } = useLocation();
    const sessionId = new URLSearchParams(search).get('session_id');
    const dispatch = useAppDispatch();

    useEffect(() => {
        // Jeśli mamy sessionId (Stripe), potwierdzamy płatność przez API
        if (sessionId) {
            fetch(`/api/orders/confirm/${sessionId}`)
                .then(() => {
                    dispatch(clearCart());
                    toast.success('Płatność zakończona sukcesem');
                })
                .catch(() => {
                    toast.error('Błąd potwierdzania zamówienia');
                });
        } else if (state?.paymentMethod === 'cash_on_pickup' && state.orderId) {
            // Jeśli płatność przy odbiorze, potwierdzamy inaczej, np. endpointem dla płatności przy odbiorze
            fetch(`/api/orders/confirm-cash/${state.orderId}`, { method: 'POST' })
                .then(() => {
                    dispatch(clearCart());
                    toast.success('Zamówienie przy odbiorze zostało potwierdzone');
                })
                .catch(() => {
                    toast.error('Błąd potwierdzania zamówienia przy odbiorze');
                });
        }
    }, [sessionId, state, dispatch]);

    return <div>Płatność zakończona sukcesem</div>;
};

export default SuccessPage;

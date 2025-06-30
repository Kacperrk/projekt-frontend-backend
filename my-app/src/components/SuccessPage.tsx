import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from '../hooks';
import { clearCart } from '../slices/cartSlice';

const SuccessPage = () => {
    const { search } = useLocation();
    const sessionId = new URLSearchParams(search).get('session_id');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!sessionId) return;

        fetch(`/api/orders/confirm/${sessionId}`)
            .then(() => {
                dispatch(clearCart());
                toast.success('Płatność zakończona sukcesem');
            })
            .catch(() => {
                toast.error('Błąd potwierdzania zamówienia');
            });
    }, [sessionId, dispatch]);

    return <div>Płatność zakończona sukcesem</div>;
};

export default SuccessPage;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SuccessPage = () => {
    const { search } = useLocation();
    const sessionId = new URLSearchParams(search).get('session_id');

    useEffect(() => {
        fetch(`/api/orders/confirm/${sessionId}`);
        toast.success('Płatność zakończona sukcesem');
    }, [sessionId]);

    return <div>Płatność zakończona sukcesem</div>;
};

export default SuccessPage;

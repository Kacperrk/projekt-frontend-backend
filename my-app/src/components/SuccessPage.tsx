import {useLocation} from "react-router-dom";
import {useEffect} from "react";
import {toast} from "react-toastify";
import CancelPage from "./CancelPage";

function Congratulations() {
    return null;
}

const SuccessPage = () => {
    const { search } = useLocation();
    const sessionId = new URLSearchParams(search).get('session_id');
    useEffect(() => {
        fetch(`/api/orders/confirm/${sessionId}`);  // opcjonalne dociągnięcie statusu
        toast.success('Płatność zakończona sukcesem!');
    }, []);
    return <Congratulations />;
};

export default SuccessPage;

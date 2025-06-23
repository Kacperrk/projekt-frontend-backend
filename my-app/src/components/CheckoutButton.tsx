import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RcxJSQQV82LYFT7nvYtCpbFBYGjLd5zY8gLP1Co9ZP4uMbiXlcJqAqvyg85tqoyHqdGUskPldAe8vjFqCNC7FnL00mfYuobqd');

function CheckoutButton() {
    const handleClick = async () => {
        const res = await fetch("http://localhost:8080/stripe/create-checkout-session", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        });

        const {sessionId} = await res.json();

        const stripe = await stripePromise;

        if (!stripe) {
            console.error("Stripe nie został załadowany");
            return;
        }

        await stripe.redirectToCheckout({sessionId});
    };

    return <button onClick={handleClick}>Zapłać za plan</button>;
}

export default CheckoutButton;

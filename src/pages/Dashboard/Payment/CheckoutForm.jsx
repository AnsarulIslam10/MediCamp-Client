import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { toast } from "react-toastify";

const CheckoutForm = () => {
    const stripe = useStripe()
    const elements = useElements()
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
        return
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
        return
    }

    const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card
    })
    if (error) {
        console.log('payment error', error)
        toast.error(error.message)
    }
    else{
        console.log('payment method', paymentMethod)
    }

  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },                
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="text-center">
        <button className="btn btn-wide bg-primary hover:bg-primary-hover mt-6" type="submit" disabled={!stripe}>
          Pay
        </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const CheckoutForm = () => {
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const navigate = useNavigate()
  const campName = location.state?.campName;
  const campFees = location.state?.campFees;
  const registeredCampId = location.state?.registeredCampId;
  const campId = location.state?.campId;
  const confirmationStatus = location.state?.confirmationStatus;

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", {
        campFees: campFees,
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, campFees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    //confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        // save the payment in the database
        const payment = {
          campName: campName,
          email: user?.email,
          campFee: campFees,
          transactionId: paymentIntent.id,
          date: new Date(),
          registeredCampId: registeredCampId,
          campId: campId,
          status: "paid",
          confirmationStatus: confirmationStatus,
        };
        const res = await axiosSecure.post("/payments", payment);
        console.log("payment saved", res);
        if (res.data?.insertedId) {
          toast.success("Payment Successful");
          navigate('/dashboard/payment-history')
        }
      }
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
        {transactionId && (
          <p className="font-semibold">
            Transaction ID:{" "}
            <span className="text-green-600">{transactionId}</span>
          </p>
        )}
        <p className="text-red-500">{error}</p>
        <div className="text-center">
          <button
            className="btn btn-wide bg-primary hover:bg-primary-hover mt-6"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;

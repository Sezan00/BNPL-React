import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useState } from 'react';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#111827', // gray-900
      '::placeholder': { color: '#9ca3af' }, // gray-400
      letterSpacing: '0.025em',
    },
    invalid: { color: '#ef4444' } // red-500
  }
};

const AddCard = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const res = await axios.get("http://localhost:8000/api/card/setup-intent", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      const clientSecret = res.data.client_secret;

      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        alert(result.error.message);
      } else {
        await axios.post(
          "http://localhost:8000/api/card/store",
          {
            payment_method: result.setupIntent.payment_method,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(result.setupIntent.payment_method);

        alert("Card successfully saved!");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Card</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Card Number */}
        <div>
          <label className="block text-gray-700 mb-1">Card Number</label>
          <div className="p-3 border rounded-md bg-gray-50">
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Expiry */}
        <div>
          <label className="block text-gray-700 mb-1">Expiry</label>
          <div className="p-3 border rounded-md bg-gray-50">
            <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* CVC */}
        <div>
          <label className="block text-gray-700 mb-1">CVC</label>
          <div className="p-3 border rounded-md bg-gray-50">
            <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition 
                      ${!stripe || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {loading ? 'Saving...' : 'Save Card'}
        </button>
      </form>
    </div>
  );
};

export default AddCard;

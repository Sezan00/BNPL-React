import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'

const stripePromise = loadStripe("pk_test_51Ss1vrGaJDPU0HoK2vSowpu8aneHkxvHElzcMN4n3Rq1ymLGlrGcuL1eaiN1gOoX4nTcl4o8MurKZNk6QeCdBGF600I7KgdqXM")

export default function StripeProvider({ children }) {
  return <Elements stripe={stripePromise}>{children}</Elements>;
}


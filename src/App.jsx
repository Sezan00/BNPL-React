import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserDashboard from './User/Dashboard'
import SignUpMerchant from './Merchant/SignUpMerchant'
import LoginMerchant from './Merchant/LoginMerchant'
import SignUpUser from './User/SignUpUser'
import LoginUser from './User/LoginUser'
import Home from './Home/Home'
import PaymentService from './Payment/PaymentService'
import MerchantDirectory from './Payment/MerchantDirectory'
import ProtectedRoute from './routes/ProtectedRoute'
import MerchantDashboard  from './Merchant/MerchantDashboard'
//stripe provider
import StripeProvider from './Stripe/StripeProvider'
import AddCard from './Card/AddCard'

function App() {
  return (
  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/merchant-signup" element={<SignUpMerchant />} />
    <Route path="/merchant-login" element={<LoginMerchant />} />
    <Route
      path="/merchant-dashboard"
      element={
        <ProtectedRoute>
          <MerchantDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/user-signup" element={<SignUpUser />} />
    <Route path="/user-login" element={<LoginUser />} />
    <Route
      path="/user-dashboard"
      element={
        <ProtectedRoute>
          <UserDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="/merchantlist" element={<MerchantDirectory />} />
    <Route path="/paymentService" element={<PaymentService />} />

    <Route
      path="/add-card"
      element={
        <StripeProvider>
          <AddCard />
        </StripeProvider>
      }
    />
  </Routes>

     
  )
}

export default App

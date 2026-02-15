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
// pay now 
import PayNow from './Payment/PayNow'
//payment summery 
import PaymentSummary from './Payment/PaymentSummary'
import Installment from './Payment/Installment'

//single installment paid
import SingleInstallmentPaid from './Payment/SingleInstallmentPaid'

//pay all installment 
import PayAllInstallment from './Payment/PayAllInstallment'
//
import PayNowOrLater from './PayNowAndLater/PayNowOrLater'
//merchant data
import MerchantData from './PayNowAndLater/MerchantData'
import Amount  from './PayNowAndLater/Amount'
import InstallmentData from './PayNowAndLater/InstallmentData'
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
    <Route path='/pay' element={<PayNowOrLater/>}/>
    <Route path='/amount' element={<Amount/>}/>
    <Route path='/pay-now' element={<PayNow/>}/>
    <Route path='/installment-data' element={<InstallmentData/>}/>
    <Route path='/merchant-data' element={<MerchantData/>}/>
    <Route path='/payment-summary' element={<PaymentSummary/>}/>
    <Route path='/installment' element={<Installment/>}/>
    <Route path='/single-installment/:schedule_id' element={<SingleInstallmentPaid/>}/>
    <Route path='/pay-all-installment/:scheduleId' element={<PayAllInstallment/>}/>
  </Routes>

     
  )
}

export default App

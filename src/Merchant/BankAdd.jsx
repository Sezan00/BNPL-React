import axios from 'axios';
import React, { useState } from 'react';

export const BankAdd = () => {
    const [formData, setFormData] = useState({
        account_holder_name: '',
        bank_name: '',
        bank_account_number: '',
        bank_adress: '',
        bank_branch: '',
        ifsc_swift_code: '',
        payout_method: 'bank',
        currency: 'USD',
        status: 'active',
        notes: ''
    });

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/api/merchant/settlement-accounts",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(res.data.message);
            console.log(res.data);

        } catch (error) {
            console.error(error.response?.data);
            alert("Something went wrong");
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-3xl mx-auto">

                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Add Bank Details</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Please enter your banking information for payouts.
                    </p>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">

                        {/* Section 1: Account Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                Account Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Account Holder Name */}
                                <div className="col-span-1 md:col-span-2">
                                    <label htmlFor="account_holder_name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Account Holder Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="account_holder_name"
                                        required
                                        value={formData.account_holder_name}
                                        onChange={handleChange}
                                        placeholder="e.g. John Doe / Company LLC"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Account Number */}
                                <div className="col-span-1 md:col-span-2">
                                    <label htmlFor="bank_account_number" className="block text-sm font-medium text-gray-700 mb-1">
                                        Account Number / IBAN <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="bank_account_number"
                                        required
                                        value={formData.bank_account_number}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono"
                                        placeholder="0000 0000 0000 0000"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Bank Details */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                Bank Details
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Bank Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bank Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="bank_name"
                                        required
                                        value={formData.bank_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Chase, HSBC"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                {/* IFSC / SWIFT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        IFSC / SWIFT Code
                                    </label>
                                    <input
                                        type="text"
                                        name="ifsc_swift_code"
                                        value={formData.ifsc_swift_code}
                                        onChange={handleChange}
                                        placeholder="ABCDUS33"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all uppercase"
                                    />
                                </div>

                                {/* Branch */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Branch Name <span className="text-gray-400 text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="bank_branch"
                                        value={formData.bank_branch}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Bank Address <span className="text-gray-400 text-xs">(Optional)</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="bank_adress" // Kept schema spelling
                                        value={formData.bank_adress}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Configuration & Notes */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Settings
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                {/* Payout Method */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payout Method</label>
                                    <select
                                        name="payout_method"
                                        value={formData.payout_method}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                    >
                                        <option value="bank">Bank Transfer</option>
                                        <option value="wallet">Wallet</option>
                                        <option value="stripe">Stripe</option>
                                    </select>
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                    >
                                        <option value="USD">USD - US Dollar</option>
                                        <option value="EUR">EUR - Euro</option>
                                        <option value="GBP">GBP - British Pound</option>
                                        <option value="BDT">BDT - Taka</option>
                                    </select>
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>

                                {/* Notes (Full Width) */}
                                <div className="col-span-1 md:col-span-3">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Internal Notes
                                    </label>
                                    <textarea
                                        name="notes"
                                        rows="3"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                        placeholder="Any additional details..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all"
                            >
                                Save Bank Details
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default BankAdd;
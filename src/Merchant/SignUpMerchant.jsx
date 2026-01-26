import React from 'react'

const SignUpMerchant = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Merchant Signup
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Create your merchant account to start accepting payments
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">

                        {/* Business Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Business Name
                            </label>
                            <input
                                type="text"
                                placeholder="Your business name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Owner Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Owner Name
                            </label>
                            <input
                                type="text"
                                placeholder="Full name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="merchant@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                placeholder="+880 1XXXXXXXXX"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Terms */}
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <p>
                                I agree to the{" "}
                                <span className="text-indigo-600 font-medium cursor-pointer">
                                    Terms & Conditions
                                </span>
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="button"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Create Merchant Account
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <span className="text-indigo-600 font-medium cursor-pointer">
                            Login
                        </span>
                    </p>
                </div>
            </div>

        </>
    )
}

export default SignUpMerchant
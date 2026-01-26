import React from 'react'

export const LoginMerchant = () => {
    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Merchant Login
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Sign in to your merchant dashboard
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5">

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

                        {/* Remember + Forgot */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                Remember me
                            </label>

                            <span className="text-indigo-600 font-medium cursor-pointer">
                                Forgot password?
                            </span>
                        </div>

                        {/* Submit */}
                        <button
                            type="button"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Login
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don’t have a merchant account?{" "}
                        <span className="text-indigo-600 font-medium cursor-pointer">
                            Sign up
                        </span>
                    </p>
                </div>
            </div>
        </>
    )
}

export default LoginMerchant;

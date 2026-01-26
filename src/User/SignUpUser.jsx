import axios from 'axios';
import React, { useState } from 'react'
import { registerUser } from "../Api/RegisterApi";
import { useNavigate } from 'react-router-dom';


export const SignUpUser = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",

    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(formData);
            navigate('/user-dashboard')
            console.log(data.message);
        } catch (error) {
            console.log(error.response?.data);
            alert("Regitration failed")
        }
    }



    return (
        <>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Create Account
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Sign up to start using Buy Now, Pay Later
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Full Name
                            </label>
                            <input
                                name='name'
                                onChange={handleChange}
                                type="text"
                                placeholder="Your full name"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                name='email'
                                onChange={handleChange}
                                type="email"
                                placeholder="user@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                name='phone'
                                onChange={handleChange}
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
                                name='password'
                                onChange={handleChange}
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* Confirm Password */}
                        {/* <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div> */}

                        {/* Terms */}
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                            <input
                                type="checkbox"
                                className="mt-1 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <p>
                                I agree to the{" "}
                                <span className="text-indigo-600 font-medium cursor-pointer">
                                    Terms & Privacy Policy
                                </span>
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                        >
                            Create Account
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

export default SignUpUser;
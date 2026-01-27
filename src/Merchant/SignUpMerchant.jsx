import axios from 'axios'
import React, { useEffect, useState } from 'react'

const SignUpMerchant = () => {
 
    // const [document, setDocument] = useState([]);

    // console.log('doc',document);

//    useEffect(() => {
//     const fetchDocument = async () => {
//         try{
//             const res = await axios.get("http://localhost:8000/api/document");
//              setDocument(res.data.document);
//         } catch(err){
//             console.log('Error fetch', err);
//         }
//     }
//      fetchDocument();
//    }, [])
    const [formData, setFormData] = useState({
        merchant_name: "",
        email:"",
        password: "",
        business_name: "",
        phone:""
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const data = await axios.post(`http://localhost:8000/api/register/merchant`, formData)
            console.log(data.data.message);
        } catch (err) {
  if (err.response) {
    console.log(err.response.data.errors);
  } else {
    console.log(err);
  }
}
    }

    

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
                    <form className="space-y-5" onSubmit={handleSubmit}>

                        {/* Business Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Business Name
                            </label>
                            <input
                                name='business_name'
                                onChange={handleChange}
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
                                name='merchant_name'
                                onChange={handleChange}
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
                                name='email'
                                onChange={handleChange}
                                type="email"
                                placeholder="merchant@example.com"
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        {/* <select className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"'>
                                <option value="">Document</option>
                            {document.map((doc)=> (
                                <option key={doc.id} value={doc.id}> {doc.name} </option>
                            ))}
                        </select> */}

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
                            type="submit"
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
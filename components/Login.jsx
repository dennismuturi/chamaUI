"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import axios from "axios";
import OTPVerification from "./OTPVerification";

export default function Login() {
  const [memberId, setMemberId] = useState(null);
  const [isMember, setIsMember] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    phonenumber: '',
    password: ''
  });

  const handleSubmit = () => {
    if (formData.phonenumber === '' || formData.password === '') {
      setError("Phone Number and Password are required!");
      return;
    }

   // const apiUrl = 'http://localhost:3030/api/members/login'; // Replace with your API endpoint URL
    const apiUrl = "https://chama-backend.onrender.com/api/members/login";
    axios
      .post(apiUrl, formData)
      .then((response) => {
        console.log('Response:', response.data);
        if (response.data) {
          setMemberId(response.data.memberId);
          setIsMember(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Your useEffect logic here
  }, [isMember, memberId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
        {!isMember ? (
          <div>
            <h2 className="text-2xl text-center font-semibold">Sign In</h2>
            <p className="text-center text-gray-600">
              Enter your Phone Number and Password to login
            </p>
            {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
            <div className="mt-4">
              <Label htmlFor="phonenumber">Phone Number</Label>
              <Input
                id="phonenumber"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phonenumber}
                onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
                required
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div className="mt-6">
              <Button onClick={handleSubmit} className="w-full">
                Login
              </Button>
              <p className="mt-2 text-center text-gray-700">
                Don't have an account?{" "}
                <span className="text-blue-600 hover:underline">Sign up</span>
              </p>
            </div>
          </div>
        ) : (
          <OTPVerification memberId={memberId} isMember={isMember} />
        )}
      </div>
    </div>
  );
}

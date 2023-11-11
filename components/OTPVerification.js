import React, { useState, useEffect, useRef } from 'react';
import OTPCountdown from './OTPCountdown';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import {useSelector, useDispatch} from "react-redux";
import { signIn,signOut } from '@/app/redux/features/auth/authSlice';

export default function OTPVerification({ memberId, isMember }) {


  //const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();


  const [isRouting, setIsRouting] = useState(false); // Add isRouting state

  const router = useRouter();
  const [loading, setLoading] = useState(false); // Introduce a loading state
  const [error, setError] = useState('');
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const handleVerificationSuccess = () => {
    // Called when OTP verification is successful
       setIsRouting(true); // Set isRouting to true when routing
  };


  const handleInputChange = (index, value) => {
    if (value.match(/^[0-9]$/)) {
      setOTP((prevOTP) => {
        const updatedOTP = [...prevOTP];
        updatedOTP[index] = value;
        return updatedOTP;
      });

      // Move focus to the next input field if available
      if (index < otp.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      // Clear the input if a non-numeric character is entered
      setOTP((prevOTP) => {
        const updatedOTP = [...prevOTP];
        updatedOTP[index] = '';
        return updatedOTP;
      });
    }
  };

  const apiUrl = 'http://localhost:3030/api/members/verify';

  const handleSubmit = () => {
    // Check if all OTP values are not empty and have a fixed length (1 in this case)
    const isValid = otp.every((value) => value !== '' && value.length === 1);

    if (isValid) {
      // All OTP values are valid, you can proceed with verification
      setLoading(true); // Set loading to true during form submission

      // Example: Sending an HTTP request to verify the member
      axios
        .post(apiUrl, {
          otp: parseInt(otp.join('')),
          memberId: memberId,
        })
        .then((response) => {
          // Handle a successful response here
          console.log(response.data);
          console.log('Member verification successful');

          if(response.data){
            setIsRouting(true)
          }

          if (response?.data?.role === 'member') {
           
            dispatch(signIn(response.data))
            router.push('/profile/member');
          } else if (response?.data?.role === 'chairman') {
            dispatch(signIn(response.data))
            router.push('/profile/chairman');
          }
        })
        .catch((error) => {
          // Handle any errors or invalid OTP here
          console.error('Member verification failed:', error);
          setError('Member verification failed. Please try again.');
        })
        .finally(() => {
          setLoading(false); // Set loading to false when the request is completed
        });
    } else {
      // Some OTP values are missing or incorrect, handle the error
      alert('Please enter a valid OTP.');
      setError('Please enter a valid OTP');
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Member Verification</p>
            </div>

            {isMember ? (
        <OTPCountdown
          onVerificationSuccess={handleVerificationSuccess}
          isRouting={isRouting} // Pass the isRouting prop
        />
      ) : null}

            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email </p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {otp.map((value, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name={`otp${index}`}
                        value={value}
                        ref={inputRefs[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black border-none text-white text-sm shadow-sm"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {loading ? 'Verifying...' : 'Verify Account'}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didnt receive code</p>
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

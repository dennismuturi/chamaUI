"use client"
import React, { useState, useEffect } from 'react';

function OTPCountdown({ onVerificationSuccess, isRouting }) {
 

  const initialMinutes = 5;
  const initialSeconds = 0;
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    let timer;
    if (minutes === 0 && seconds === 0) {
      // Timer has reached 0, enable the "Resend OTP" button
      setIsResendEnabled(true);
      if (onVerificationSuccess) {

        onVerificationSuccess(); // Call the function to handle successful verification
      }
      return;
    }


    if (isRouting) {
      setMinutes(0)
      setSeconds(0)
      clearTimeout(timer); // Stop the countdown if routing is initiated
      return;
    }

    if (seconds === 0) {
      timer = setTimeout(() => {
        setMinutes(minutes - 1);
        setSeconds(59);
      }, 1000);
    } else {
      timer = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [minutes, seconds, isRouting,onVerificationSuccess]);

  const handleResendOTP = () => {
    // Resend OTP logic here
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsResendEnabled(false);
  };

  return (
    <div>
      <p>Time left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
      {isResendEnabled && (
        <button onClick={handleResendOTP}>Resend OTP</button>
      )}
    </div>
  );
}

export default OTPCountdown;

"use client"
import {useSelector, useDispatch } from "react-redux"
import { signOut } from "@/app/redux/features/auth/authSlice"
import Contribution from "@/components/Contribution"
const MemberPage = () => {



   const user = useSelector((state) => state.auth.user)
   const dispatch = useDispatch()
    console.log(user)


    const handleSubmit = () => {
    //const url = "http://localhost:3030/api/members/weekly";
    const url = "https://chama-backend.onrender.com/api/members/weekly";
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": ` Bearer ${user?.accessToken}`, // Replace with your actual access token
      "refreshToken": `${user.refreshToken}`
});

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `${user?.accessToken}`, // Replace with your actual access token
    "refreshToken": `${user?.refreshToken}`
  },
  body: JSON.stringify(user?.memberId)
})
  .then(response => {
    // Check if the request was successful (status code 200)
    if (response.ok) {
      // Assuming the response is in JSON format
      return response.json();
    } else {
      throw new Error(`Error: `);
    }
  })
  .then(data => {
    console.log("Fetched data:", data);
  })
  .catch(error => {
    console.error("Request error:", error.message);
  });

    }

  
    return (
      <>
        <div>
        Member Page
        </div>
 
         <div>
          <h1>Full Names:
             <b>{user?.firstname}</b>
          <b>{user?.lastname}
          </b>
        </h1> 
        <h2>Member ID : <b>{user?.memberId}</b></h2>
        <h2>Email : <b>{user?.email}</b></h2>
        <h2>Phone Number : <b>{user?.phonenumber}</b></h2>
        
         </div>
        <button
        aria-label="Sign Out"
          onClick={() => dispatch(signOut())}>Sign Out</button> 
     
       <button style={{background:"blue"}} onClick={handleSubmit}>Get Weekly Contributions</button>
     </>    

    )
}

export default MemberPage;
         
 // If the member is verified successfully, you can set a cookie
 if (response?.data?.role === 'member') {
    Cookies.set('refreshToken',  response?.data?.refreshToken); // Set a cookie with the access token
    
    router.push('/profile/member');
  } else if (response?.data?.role === 'chairman') {
    Cookies.set('accessToken', 'your_access_token_here')
    router.push('/profile/chairman');
  }
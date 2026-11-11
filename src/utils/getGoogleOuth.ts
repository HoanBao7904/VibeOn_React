export const getGoogleOuth = () => {
  const url = 'https://accounts.google.com/o/oauth2/auth'
  const query = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    ), //chuyen mang thanh string boi dau canh
    access_type: 'offline',
    prompt: 'consent' //
  }

  const queryString = new URLSearchParams(query).toString()

  // return `${url}?${queryString}`
  window.location.href = `${url}?${queryString}`
}

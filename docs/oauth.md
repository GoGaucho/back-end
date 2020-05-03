# OAuth

Google OAuth 2.0

## Link

Link: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile%20openid&response_type=code&prompt=consent&client_id=244305690784-kh1bv40adk1v7nb81vmdses9stguj2ov.apps.googleusercontent.com&hd=ucsb.edu&redirect_uri=https://gogaucho.app/auth.html
 
## Code to Token

POST https://oauth2.googleapis.com/token
{
  "code":"",
  "client_id":"",
  "client_secret":"",
  "redirect_uri":"https://gogaucho.app/auth.html",
  "grant_type":"authorization_code"
}

## Refresh

POST https://oauth2.googleapis.com/token
{
  "refresh_token":"",
  "client_id":"",
  "client_secret":"",
  "redirect_uri":"https://gogaucho.app/auth.html",
  "grant_type":"refresh_token"
}
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const clientId: string | undefined = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const BACKEND_URL: string | undefined = import.meta.env.VITE_BACKEND_URL;

function GoogleAuth() {
  const navigate = useNavigate();

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      console.error("No credential received");
      return;
    }
    
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/google`, {
        token: response.credential,
      });
      alert(`Welcome ${res.data.name}`);
      navigate("/database");
    } catch (error) {
      console.error("Google Sign-In Failed", error);
    }
  };

  const handleError = () => {
    console.log("Google Sign-In Failed");
  };

  return (
    <GoogleOAuthProvider clientId={clientId || ""}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;

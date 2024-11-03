import { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const { token } = useParams();
   const navigate = useNavigate();
  const [status, setStatus] = useState('Verifying...');
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true); // Start loading
      try {
        
        const response = await axios.get(`http://localhost:5005/api/auth/verify-email?token=${token}`);
        setStatus('Verification successful! Redirecting...');
        console.log(response);
        
       // Redirect after successful verification
       setTimeout(() => {
        navigate('/login'); // Redirect to login
      }, 2000); // Short 2-second timeout for the message to be displayed
      } catch (error) {
        let errorMessage = 'Verification failed. Please try again.';
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = 'Verification link is invalid or expired.';
          } else if (error.response.status === 500) {
            errorMessage = 'Server error. Please try again later.';
          } else {
            errorMessage = error.response.data.message || errorMessage; // Use server message if available
          }
          console.error('Verification failed:', error.response.data);
        } else {
          console.error('Verification failed:', error.message);
        }
        setStatus(errorMessage);
      } finally {
        setLoading(false); // End loading
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1> // Loading indication
      ) : (
        <h1>{status}</h1>
      )}
    </div>
  );
};

export default VerifyEmail;
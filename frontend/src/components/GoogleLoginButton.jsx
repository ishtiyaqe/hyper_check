import api from './api/google_client'; // the axios instance created above
import { loginSuccess, fetchUser } from '../actions/auth'; // Redux actions
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';


export const googleLogin = async (accessToken) => {
    
    try {
        const response = await api.post('/api/auth/google/', {
            access_token: accessToken,
        });
        const data = response.data;
        if (data.key) {
            // Store the token in localStorage
            localStorage.setItem('authToken', data.key);
            return data.key;
        } else {
            throw new Error('Login failed: No authentication token received');
        }
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const authToken = await googleLogin(tokenResponse.access_token);
                console.log(authToken)
                dispatch(loginSuccess(authToken));
                dispatch(fetchUser(authToken)); // Fetch and store user data
                navigate('/myaccount')
            } catch (error) {
                console.error('Google login failed:', error);
            }
        },
    });

    return (
        <button className='bg-purple-600 text-white p-4 rounded-full font-semibold text-center shadow-md' onClick={() => login()}>
            Login with Google
        </button>
    );
};

export default GoogleLoginButton;

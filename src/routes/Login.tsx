'use client';
import Alert from '../components/Alert';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../firebase/firebase'

const Login = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true); // Track email validity

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    if (name === 'email') {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailValid(emailRegex.test(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { email, password } = userInfo;

    // Perform validation before submission
    if (!isEmailValid) {
      console.log('email error')
      setError('Invalid email format');
      setIsLoading(false);
      return;
    }

    try {
      // Send the email and password to firebase
      const userCredential = await signInUser(email, password)

      if (userCredential) {
        setIsLoading(false);
        navigate('/formulaOne')
      }
    } catch (error:any) {
      setIsLoading(false);
      console.log('User Sign In Failed', error.message);
      setError('Invalid Email or Password')
      setUserInfo({...userInfo, email: '', password: ''});
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="bg-gray-300 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        {error ? (
          <div className="mb-4">
            <Alert value={error} />
          </div>
        ) : null}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !isEmailValid ? 'border-red-500' : ''
            }`}
            id="email"
            type="email"
            placeholder="email@example.com"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col gap-4 items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              isLoading || !isEmailValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isLoading || !isEmailValid}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
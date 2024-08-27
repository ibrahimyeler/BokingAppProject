import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api-client';

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme yapacağız

  const mutation = useMutation(apiClient.signIn, {
    onSuccess: (data) => {
      console.log('API Response:', data); // API yanıtını kontrol edin
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('lastName', data.lastName);
      localStorage.setItem('isLoggedIn', 'true');

      // Kullanıcı adını ayarla
      const fullName = `${data.firstName} ${data.lastName}`.trim();
      setUserName(fullName);

      setIsSubmitted(true);
      setErrorMessage(null);

      // 2 saniye sonra ana sayfaya yönlendir
      setTimeout(() => {
        navigate('/');
      }, 2000);
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(errorMsg);
      setIsSubmitted(false);
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center">
      {isSubmitted ? (
        <div className="flex flex-col gap-5 text-center">
          <h2 className="text-3xl font-bold text-green-500">Welcome back, {userName}!</h2>
          <p className="text-sm text-gray-600 mt-2">
            You will be redirected to the <a href="/" className="text-blue-500 hover:underline">Home Page</a> in a moment.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold">Sign In</h2>
          <div className="flex flex-col gap-5">
            <label className="text-gray-700 text-sm font-bold">
              Email
              <input
                type="email"
                {...register('email', { required: 'Please fill this field' })}
                className="border rounded w-full py-2 px-4 font-normal transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </label>
            <label className="text-gray-700 text-sm font-bold">
              Password
              <input
                type="password"
                {...register('password', { required: 'Please fill this field' })}
                className="border rounded w-full py-2 px-4 font-normal transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </label>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 px-4 font-bold hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;



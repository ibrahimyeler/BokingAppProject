

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import apiClient from '../api-client';

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: (data) => {
      localStorage.setItem('firstName', data.firstName);
      localStorage.setItem('lastName', data.lastName);
      localStorage.setItem('isLoggedIn', 'true');
      setIsSubmitted(true);
      setErrorMessage(null);
    },
    onError: (error: any) => {
      const errorMsg = error?.response?.data?.message || 'An error occurred. Please try again.';
      setErrorMessage(errorMsg);
      setIsSubmitted(false);
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col items-center">
      {isSubmitted ? (
        <div className="flex flex-col gap-5 text-center">
          <h2 className="text-3xl font-bold text-green-500">Successfully Registered!</h2>
          <p className="text-sm text-gray-600 mt-2">
            You can now <a href="/signin" className="text-blue-500 hover:underline">Sign In</a>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <div className="flex flex-col gap-5">
            <label className="text-gray-700 text-sm font-bold">
              First Name
              <input
                type="text"
                {...register('firstName', { required: 'Please fill this field' })}
                className="border rounded w-full py-2 px-4 font-normal transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
            </label>
            <label className="text-gray-700 text-sm font-bold">
              Last Name
              <input
                type="text"
                {...register('lastName', { required: 'Please fill this field' })}
                className="border rounded w-full py-2 px-4 font-normal transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
            </label>
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
            <label className="text-gray-700 text-sm font-bold">
              Confirm Password
              <input
                type="password"
                {...register('confirmPassword', { required: 'Please fill this field' })}
                className="border rounded w-full py-2 px-4 font-normal transition-all duration-300 ease-in-out transform hover:scale-105 focus:scale-105 focus:ring-2 focus:ring-blue-500"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
            </label>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded py-2 px-4 font-bold hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;

import React, { useState } from 'react'
import CommonForm from '../../components/common/form';
import { Link, useNavigate } from 'react-router-dom';
import { registerFormControl } from '@/components/config';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../store/auth-slice/index';
import { toast } from "sonner";


function AuthRegister() {

  const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: ''
  }
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

   const onSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData))
      .then((response) => {
        if(response?.payload?.success){
          toast("🎉 Registration successful!", {
            description: "You can now log in with your new account.",
            duration: 3000
          });
          navigate('/auth/login');
        }
        console.log("Registration successful:", response);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        if(error){
          toast("🚨 Error", {
            description: "Email already exists,Please try with different email",
            duration: 3000,
            variant: "destructive",
          });
        }
      });
    console.log("Form submitted with data:", formData);
  }
  return (
    <div className='mx-auto w-full max-w-md p-4 space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create an account</h1>
        <p className='text-sm text-gray-600'>Already have an account? <Link to="/auth/login" className="text-blue-600 hover:underline">Login</Link></p>
      </div>
      <CommonForm 
        formControls={registerFormControl}
        buttonText={("Register").toUpperCase()}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister;
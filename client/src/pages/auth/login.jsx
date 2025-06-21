import React, { useState } from 'react'
import CommonForm from '../../components/common/form';
import { loginFormControl } from '@/components/config';
import { Link } from 'react-router-dom';
import { loginUser } from '../../../store/auth-slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";


function AuthLogin() {
  const initialState = {
    email: '',
    password: '',
    rememberMe: true
  }
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();
   const onSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData))
      .then((response) => {
        if(response?.payload?.success){
          toast("🎉 Login successful!", {
            description: "Welcome back!",
            duration: 3000
          });
          console.log("Redux user after login:", response?.payload?.checkUser?.role);
          if(response?.payload?.checkUser?.role === 'admin'){
            navigate('/admin/dashboard');
          } else {
            navigate('/shop/home');
          }
        }
        console.log("Login successful:", response);
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast("🚨 Error", {
          description: "Login Failed: Invalid email or password. Please try again.",
          duration: 3000,
          variant: "destructive",
        });
      });
    console.log("Form submitted with data:", formData);
  }
  return (
    <div className='mx-auto w-full max-w-md p-4 space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Login to your account</h1>
        <p className='text-sm text-gray-600'>Already have an account? <Link to="/auth/register" className="text-blue-600 hover:underline">Register</Link></p>
      </div>
      <CommonForm 
        formControls={loginFormControl}
        buttonText={("Login").toUpperCase()}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin;
import React from 'react'
import CommonForm from '../../components/common/form';
import { loginFormControl } from '@/components/config';
import { Link } from 'react-router-dom';


function AuthLogin() {
  const initialState = {
    email: '',
    password: '',
    rememberMe: true
  }
  const [formData, setFormData] = React.useState(initialState)

   const onSubmit = (e) => {
    e.preventDefault();
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
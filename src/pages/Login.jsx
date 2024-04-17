import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Login = () => {

  const [email,setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password,setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  
  const handlerLogin = async () => {
    try {
         const payload = {
            email: email,
            password: password
        }
       
         const res = await axios.post(config.urlApi + '/users/login', payload)
  
        if (res.data.message === 'success') {
            Swal.fire({
                title: 'Sign In',
                icon: 'success',
                text: 'เข้าสู่ระบบเรียบร้อยแล้ว',
                timer: 1500,
                timerProgressBar: true
            })
            localStorage.setItem(config.token_name, res.data.token);
            navigate('/');
        } else if (res.data.message === 'User not found'){
            Swal.fire({
                title: 'Sign In',
                icon: 'warning',
                text: 'ไม่พบข้อมูลในระบบ',
                timer: 2000,
                timerProgressBar: true
            })
        } 
    } catch (e) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: e.message
        })
    }
  }
  
  const validateEmail = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };
  
  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };
  return (
    <>
    <Navbar/>
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ background: 'linear-gradient(90deg, rgba(31,31,37,1) 0%, rgba(61,62,80,1) 50%, rgba(103,117,134,1) 100%)' }}>
      <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: '400px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">เข้าสู่ระบบ NetZero CMU</h3>
            <div className="mb-3">
              <label >Username</label>
              <input
                type='email'
                className='form-control p-2 shadow-sm'
                placeholder='email@email.com'
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={validateEmail}
              />
                {emailError && <p className='text-danger'>{emailError}</p>}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type='password'
                required
                className='form-control p-2 shadow-sm'
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                onBlur={validatePassword} 
              />
               {passwordError && <p className='text-danger'>{passwordError}</p>}
            </div>
            {email && password !== ''? <button className='btn btn-secondary shadow-sm' onClick={handlerLogin}>
              <i className='fa-solid fa-right-to-bracket'></i> เข้าสู่ระบบ
              </button>
                : <button className='btn btn-secondary shadow-sm' disabled>
                <i className="fa-solid fa-lock"></i> เข้าสู่ระบบ
              </button> }
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Login;

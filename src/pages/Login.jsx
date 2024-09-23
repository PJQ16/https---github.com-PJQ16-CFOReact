import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';
import config from '../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer'
import NavbarUnlock from '../components/NavbarUnlock';

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
            icon: 'warning',
            title: 'Warning',
            text: 'ชื่อผู้ใช้งาน หรือ รหัสผ่านไม่ถูกต้อง ',
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

const CLIENT_ID = 'tgQqy7DsCzRejd8CT3AAVXpjXhAF91dyE8AKdMUg'; 
const REDIRECT_URI = 'https://netzero.erdi.cmu.ac.th/netzero-cmu-ghglandscape/callback';
  const handleLoginOauth = () => {
    const authUrl = `https://oauth.cmu.ac.th/v1/Authorize.aspx?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=cmuitaccount.basicinfo cmuitaccount.personal_id&state=xyz`;
    window.location.href = authUrl;
  };
  return (
    <>
    <div className="d-flex justify-content-evenly align-items-center img js-fullheight bg_login vh-100" style={{ backgroundImage: 'url("img/bg_login.jpg")',backgroundSize: 'cover' }}
>
<section className="ftco-section">
                <div className="container">
                    <div className="row justify-content-center ">
         <div className='' >
        <div className="card-body ">
        <h3 className="mb-4 text-center">GHG Platform Landscape</h3>
            <div className="mb-3 login-wrap p-0 signin-form">
              <label className=''>Username</label>
              <input
                type='email'
                className='form-control p-3 shadow-sm'
                placeholder='email@email.com'
                
                onChange={(e)=>setEmail(e.target.value)}
                onBlur={validateEmail}
              />
                {emailError && <p className='text-danger'>{emailError}</p>}
            </div>
            <div className="mb-3">
              <label className=''>Password</label>
              <input
                type='password'
                required
                className='form-control p-3 shadow-sm'
                placeholder='Password'
                onChange={(e)=>setPassword(e.target.value)}
                onBlur={validatePassword} 
              />
               {passwordError && <p className='text-danger'>{passwordError}</p>}
            </div>
            {email && password !== ''? <button className='form-control btn text-white  submit px-3' style={{background:'#4b419b'}}  onClick={handlerLogin}>
               เข้าสู่ระบบ
              </button>
                : <button className='btn form-control btn text-white  submit px-3' style={{background:'#4b419b'}}  disabled>
                เข้าสู่ระบบ
              </button> }
             {/*  <button className='btn text-white mx-2 shadow-sm' onClick={handleLoginOauth} style={{backgroundColor:'#86629F'}}>
                <i className="fa-solid fa-lock"></i> เข้าสู่ระบบด้วย CMU Account
              </button>  */}
              
             {/*  <Link to='/forgot-password'><button className='btn btn-secondary  shadow-sm'>
                <i className="fa-solid fa-lock"></i> ลืมรหัสผ่าน
              </button> 
              </Link> */}
        </div>
        </div>         
      </div>
    </div>
    </section>
    </div>

    <div className="footerWrap">
            <div className="footer">
              <div className="footerContent">
                <p>Copyright © CMU 2024</p>
              </div>     
            </div>
        </div>
    </>
  );
}

export default Login;

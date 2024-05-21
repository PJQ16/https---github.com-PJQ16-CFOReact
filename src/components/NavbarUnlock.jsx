import React, { useContext, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';
import { UserContext } from './MyContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';

function NavbarUnlock() {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { fac_id, years } = useParams();


  const handleGoBack = () => {
    Swal.fire({
      title: 'ย้อนกลับ',
      text: 'คุณต้องการย้อนกลับหรือไม่?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/activitydata');
      }
    });
  };
  

  const isActivityDetailPage = fac_id && years;

  return (
    <div>
      <nav className="navbar" style={{ background: 'linear-gradient(90deg, rgba(31,31,37,1) 0%, rgba(61,62,80,1) 50%, rgba(103,117,134,1) 100%)' }}>
        <div className="container-fluid ">
          <Link to='#' className="navbar-brand mx-2">
            <span className='p-5 mt-2'><img src='img/logo.png' width={220} height={70}/></span>
          </Link>

          <div className="d-flex justify-content-end">
  {isActivityDetailPage && (
    <button onClick={handleGoBack} className="btn btn-secondary">
      <span className='h6'><ExitToAppIcon /> ย้อนกลับ</span>
    </button>
  )}
</div>

        </div>
      </nav>
    </div>
  );
}


export default NavbarUnlock;

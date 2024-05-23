import React, { useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config';
import { UserContext } from './MyContext';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';

function Navbar({ imagePath }) {
  const location = useLocation();
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { fac_id, years } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(config.urlApi + '/users/showUserApi', config.headers());

      if (response.data.message === 'success') {
        setUserData({
          firstname: response.data.result.fname,
          surname: response.data.result.sname,
          roleName: response.data.result.role.role_name,
          facultyName: response.data.result.faculty.fac_name,
          campusName: response.data.result.faculty.campus.campus_name,
          facultyID: response.data.result.faculty.id,
          campusID: response.data.result.faculty.campus_id,
          latitude: response.data.result.faculty.latitude,
          longitude: response.data.result.faculty.campus_id,
          logo: response.data.result.faculty.logo

        });
      }
    } catch (error) {
      navigate('/login');
    }
  };

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
  
  const enterFullScreen = () => {
    document.documentElement.requestFullscreen();
  };

  const exitFullScreen = () => {
    document.exitFullscreen();
  };

  const handleButtonClick = () => {
    if (document.fullscreenElement) {
      fetchData();
      exitFullScreen();
    } else {
      enterFullScreen();
      fetchData();
    }
  };

  const isActivityDetailPage = fac_id && years;

  const isActivityDetailPageImage = location.pathname.includes('/activityDetail');

  // กำหนดตำแหน่งของรูปภาพโลโก้
  let LOGO_IMAGE_PATH;
  if (isActivityDetailPageImage) {
    LOGO_IMAGE_PATH = '../../../img/logo.png';
  } else {
    LOGO_IMAGE_PATH = 'img/logo.png';
  }
  return (
    <div>
      <nav className="navbar" style={{ background: '#FFFFFF' }}>
        <div className="container-fluid ">
          <Link to='#' className="navbar-brand mx-2">
            <span className='p-5 mt-2'><img src={LOGO_IMAGE_PATH} width={220} height={70}/></span>
          </Link>

          <div className="d-flex justify-content-end">
  {isActivityDetailPage && (
    <button onClick={handleGoBack} className="btn btn-secondary">
      <span className='h6'><ExitToAppIcon /> ย้อนกลับ</span>
    </button>
  )}

  <button className='btn btn-primary ms-3' onClick={handleButtonClick}>
    {document.fullscreenElement ? <TransitEnterexitIcon/> : <AspectRatioIcon/>}
  </button>
</div>

        </div>
      </nav>
    </div>
  );
}


export default Navbar;

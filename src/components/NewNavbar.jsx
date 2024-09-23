import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import config from "../config";
import axios from 'axios';
import { UserContext } from './MyContext';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import TransitEnterexitIcon from '@mui/icons-material/TransitEnterexit';

export default function NewNavbar() {
    const location = useLocation();
    const { userData, setUserData } = useContext(UserContext);
    const [activeLink, setActiveLink] = useState("The current button");
    const navigate = useNavigate();
    const { fac_id, years } = useParams();
    const handleLinkClick = (linkText) => {
      setActiveLink(linkText);
    };
    
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
    

    const handlerSignOut = (event) => {
        try {
          event.preventDefault();
          
          Swal.fire({
            icon: 'question',
            title: 'ออกจากระบบ',
            text: 'ต้องการออกจากระบบหรือไม่?',
            showConfirmButton: true,
            showCancelButton: true
          }).then(res => {
            if (res.isConfirmed) {
              Swal.fire({
                icon: 'success',
                title: 'ออกจากระบบ',
                text: 'ออกจากระบบเรียบร้อย',
                showConfirmButton: false,
                showCancelButton: false,
                timer: 2000,
                timerProgressBar: true,
              })
              localStorage.removeItem(config.token_name);
              navigate('/login');
            }
          })
        } catch (e) {
          console.log(e.message);
        }
      }

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
  const isMeasureDetailPageImage = location.pathname.includes('/measureDetail');

  // กำหนดตำแหน่งของรูปภาพโลโก้
  let LOGO_IMAGE_PATH;
  if (isActivityDetailPageImage || isMeasureDetailPageImage ) {
    LOGO_IMAGE_PATH = '../../../../img/brand/logo.png';
  } else {
    LOGO_IMAGE_PATH = 'img/brand/logo.png';
  }
  
  return (
    <nav className="navbar navbar-expand-lg main-navbar">
    <Link className="header-brand" to="/">
        <img src={LOGO_IMAGE_PATH} className="header-brand-img" alt="  Asta-Admin  logo"/>
    </Link>
    <form className="form-inline mr-auto">
        <ul className="navbar-nav">
            <li><a href="#" data-toggle="sidebar" className="nav-link nav-link-lg"><i className="fa fa-navicon"></i></a></li>
        </ul>
        
    </form>
    <ul className="navbar-nav navbar-right">
        <li className="dropdown"><a href="#" data-toggle="dropdown" className="nav-link dropdown-toggle nav-link-lg">
            <img src={`${config.urlApi}/logos/${userData.logo}`}  alt="profile-user" className="rounded-circle w-32"/>
            <div className="d-sm-none d-lg-inline-block"> {userData.campusName} {userData.facultyName}</div></a>
            <div className="dropdown-menu dropdown-menu-right">
                <Link to="#" className="dropdown-item has-icon" onClick={handleButtonClick}>
                {document.fullscreenElement 
  ? <><TransitEnterexitIcon style={{ marginRight: '8px' }} />   Contract</>
  : <><AspectRatioIcon style={{ marginRight: '8px' }} />   Expand</>}
                </Link>

                <Link to="#"  onClick={handlerSignOut} className="dropdown-item has-icon">
                    <i className="ion-ios-redo"></i> Logout
                </Link>
            </div>
        </li>
    </ul>
</nav>
  )
}
